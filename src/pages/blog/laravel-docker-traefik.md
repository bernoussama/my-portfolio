---
layout: ../../layouts/PostLayout.astro
title: "Deploying Laravel with FrankenPHP, Octane, Docker, and Traefik"
pubDate: 2026-04-04
description: "A clean, single-server Laravel deployment setup with fast multi-stage Docker builds, persistent workers, and one-command deploys."
author: "Oussama Bernou"
tags: ["Laravel", "Docker", "FrankenPHP", "Octane", "Traefik", "deployment"]
---

I wanted a Laravel deployment setup that stays simple without feeling fragile. No Kubernetes, no overly complex platform layer, just a fast and production-friendly single-server setup that is easy to understand and easy to redeploy.

In this post, I'll walk through how I deploy a Laravel app using FrankenPHP, Octane, Docker, and Traefik. The goal is to get good performance, persistent storage, and straightforward deployments with as little operational complexity as possible.

This approach is a great fit for side projects, internal tools, MVPs, and small production apps.

## Project structure

```text
├── Dockerfile.frankenphp        # Multi-stage production image
├── compose.frankenphp.yaml      # App service definition
├── deploy                       # One-command deployment script
├── .dockerignore                # Exclude dev files from build context
├── .env.production              # Production environment template
```

## Dockerfile

The key to secure, small containers is using multi-stage builds. In this setup, the image is built in three stages.

### Step 1: Install Composer dependencies

```dockerfile
FROM composer:2.8 AS composer-builder

WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction \
    --no-progress --prefer-dist --no-scripts
COPY . .
```

This stage installs production-only PHP dependencies from the committed lock file. `laravel/octane` should already be part of your application dependencies, not something the image adds during the build.

That keeps builds reproducible and avoids having the container silently mutate `composer.json` or `composer.lock` while it is being built.

The `--no-scripts` flag is important here because it prevents Artisan commands from running before the full application is available inside the container.

### Step 2: Build frontend assets

```dockerfile
FROM node:22-bookworm-slim AS assets-builder

WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
COPY --from=composer-builder /app/vendor /app/vendor

RUN pnpm run build
```

I'm using Inertia.js with React and Vite, so Node.js is needed to build the frontend assets.

This step comes after Composer dependencies are installed because the frontend build may depend on PHP packages being present. For example, tools like Laravel Wayfinder can be involved during the build process.

### Step 3: Build the production image

```dockerfile
FROM dunglas/frankenphp:1.11.2 AS production

RUN install-php-extensions \
    pcntl pdo_sqlite intl zip bcmath gd exif

WORKDIR /app

COPY --chown=www-data:www-data . /app
COPY --from=assets-builder --chown=www-data:www-data /app/public/build /app/public/build
COPY --from=composer-builder --chown=www-data:www-data /app/vendor /app/vendor

RUN mkdir -p /app/storage/logs \
    /app/storage/framework/cache \
    /app/storage/framework/sessions \
    /app/storage/framework/views \
    /app/storage/app/public \
    /app/database \
    && touch /app/database/database.sqlite \
    && chown -R www-data:www-data /app/storage /app/database /app/bootstrap/cache

RUN php artisan storage:link
RUN php artisan config:clear \
    && php artisan route:cache \
    && php artisan view:cache

EXPOSE 8080
ENTRYPOINT ["php", "artisan", "octane:frankenphp", "--host=0.0.0.0", "--port=8080"]
```

A few deliberate decisions here:

* **Pinned FrankenPHP version**: I'm using `dunglas/frankenphp:1.11.2` instead of `latest` for reproducible builds.
* **Pinned build images**: the Composer, Node, and FrankenPHP stages all use explicit base images instead of relying on `latest`.
* **Only required PHP extensions**: no dev tooling, no Xdebug, only what the app actually needs.
* **Build-time Laravel caching**: `route:cache` and `view:cache` reduce startup and runtime overhead.
* **Octane entrypoint**: the container starts directly with `octane:frankenphp`, so PHP stays alive in memory and serves requests through persistent workers.
* **Port 8080**: FrankenPHP runs as a non-root user, so using a higher port is the practical choice.

## Compose file

```yaml
services:
    app:
        build:
            context: .
            dockerfile: Dockerfile.frankenphp
            target: production
        container_name: laravel-app
        restart: unless-stopped
        expose:
            - '8080'
        volumes:
            - example-storage:/app/storage
            - example-database:/app/database
        env_file:
            - .env
        environment:
            - APP_ENV=production
            - APP_DEBUG=false
            - OCTANE_SERVER=frankenphp
            - DB_DATABASE=/app/database/database.sqlite
        entrypoint:
            [
                'sh', '-c',
                'php artisan migrate --force && php artisan octane:frankenphp --host=0.0.0.0 --port=8080',
            ]
        networks:
            - traefik-public
        labels:
            - 'traefik.enable=true'
            - 'traefik.http.routers.example.rule=Host(`example.com`) || HostRegexp(`{subdomain:[a-zA-Z0-9-]+}.example.com`)'
            - 'traefik.http.routers.example.entrypoints=websecure'
            - 'traefik.http.routers.example.tls=true'
            - 'traefik.http.services.example.loadbalancer.server.port=8080'
            - 'traefik.http.services.example.loadbalancer.healthcheck.path=/up'
            - 'traefik.http.services.example.loadbalancer.healthcheck.interval=10s'
        healthcheck:
            test: ['CMD', 'curl', '-f', 'http://localhost:8080/up']
            interval: 10s
            timeout: 5s
            retries: 3

networks:
    traefik-public:
        external: true

volumes:
    example-storage:
    example-database:
```

A few important details here:

### Persistent storage

The `storage` and `database` directories are mounted as named volumes:

```yaml
volumes:
    - example-storage:/app/storage
    - example-database:/app/database
```

That means uploaded files and the SQLite database survive container rebuilds and restarts.

### Runtime configuration

Environment variables are injected at runtime through `env_file` and `environment`, not baked into the image. That keeps secrets and environment-specific settings out of the build artifact.

I also use `expose` instead of publishing a host port in production. That keeps the app reachable through the Docker network for Traefik, while avoiding a second direct path to the container that could bypass the proxy.

### Migrations on startup

You'll notice the Compose file overrides the image entrypoint:

```yaml
entrypoint:
  [
    'sh', '-c',
    'php artisan migrate --force && php artisan octane:frankenphp --host=0.0.0.0 --port=8080',
  ]
```

This is intentional. The image itself is ready to run Octane directly, but in deployment I want migrations to run automatically before the server starts. That way every deploy ensures the schema is up to date.

### Health checks

Both Docker and Traefik check the `/up` endpoint. This gives two layers of health monitoring:

* Docker can mark the container unhealthy
* Traefik can stop routing traffic to it if needed

### TLS and origin access

In this example, Traefik serves the app through the `websecure` entrypoint instead of plain HTTP. If Cloudflare sits in front of the server, I still treat the origin as private infrastructure: use end-to-end TLS where possible, keep Cloudflare in Full (strict) mode, and lock the origin down so traffic reaches Traefik through Cloudflare rather than through a directly exposed app port.

## Deploy script

```bash
#!/bin/bash
set -e

echo "Building image..."
docker-compose -f compose.frankenphp.yaml build

echo "Deploying..."
docker-compose -f compose.frankenphp.yaml down
docker-compose -f compose.frankenphp.yaml up -d

echo "Waiting for health check..."
sleep 5
docker-compose -f compose.frankenphp.yaml ps

echo "Deployment complete!"
```

This script keeps deployment simple:

1. Build the image
2. Stop the old container
3. Start the new one
4. Verify its status

Because data lives in named volumes, the application state is preserved across redeployments.

That said, this is **not** a zero-downtime deployment flow. Since the old container is stopped before the new one starts, there will be a short interruption during deploys. For a single-server setup, that tradeoff is often acceptable because it keeps the operational model very simple.

## The `.dockerignore`

A good `.dockerignore` keeps the build context smaller, faster, and safer.

```text
.git
node_modules
vendor
.env
.env.*
!.env.example
tests
storage/app/*
public/build
database/*.sqlite
```

A few important exclusions here:

* `vendor/` and `node_modules/` are rebuilt inside Docker
* `tests/` are not needed in the production image
* local `.env` files should never be baked into the image
* SQLite database files should live in volumes, not in the build context

## Architecture overview

```text
                    ┌──────────────┐
                    │  Cloudflare  │
                    │  (DNS + SSL) │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │   Traefik    │
                    │ (Edge Proxy) │
                    └──┬───────┬───┘
                       │       │
              ┌────────▼ ┐  ┌───▼────────┐
              │  App     │  │  Webhook   │
              │ (Octane +│  │ (auto-     │
              │FrankenPHP)│ │  deploy)   │
              └────┬─────┘  └────────────┘
                   │
         ┌─────────▼─────────┐
         │  Named Volumes    │
         │  storage/ database│
         └───────────────────┘
```

In this setup:

* **Cloudflare** handles DNS and can proxy HTTPS traffic to the origin
* **Traefik** routes traffic to the correct container
* **FrankenPHP + Octane** run Laravel with persistent workers
* **Named volumes** preserve uploaded files and the SQLite database

It is a small stack, but each piece has a clear job.

## Production tips

### 1. Pin base images

Use a specific FrankenPHP version instead of `latest`. Reproducibility matters, especially when debugging deployment issues.

### 2. Keep persistent data outside the container filesystem

If you use SQLite or store uploaded files locally, mount them as named volumes. Otherwise a rebuild can wipe your data.

### 3. Cache Laravel artifacts during build

Running `route:cache` and `view:cache` during the image build helps reduce work at container startup.

### 4. Keep the deployment flow boring

For a single server, simple is often better than clever. A short, readable deploy script is easier to trust and easier to debug.

### 5. Use health checks in more than one place

Checking `/up` from both Docker and Traefik gives better visibility and safer routing behavior.

## Tradeoffs

This setup is practical, but it is not magic. A few tradeoffs are worth calling out explicitly.

### SQLite is simple, but limited

SQLite is great for lightweight apps and low operational overhead, but it is not the right choice for high write concurrency or more demanding workloads.

### Persistent workers need discipline

Octane keeps the app alive in memory, which is excellent for performance, but it also means you need to be careful about stateful behavior, memory leaks, and anything that assumes a fresh PHP process per request.

### Single-server means single-server

This setup is intentionally simple. It does not give you high availability, automatic failover, or horizontal scaling out of the box.

### Deployments involve brief downtime

Because the deployment process uses `down` then `up`, there is a short interruption during rollout. That may be totally fine for small apps, but it is still a tradeoff.

## Conclusion

This setup gives you a clean and effective way to deploy Laravel with:

* fast multi-stage Docker builds
* good performance through FrankenPHP and Octane
* simple routing through Traefik
* persistent data through named volumes
* straightforward one-command deployments

I would not choose this approach for a large, highly available, horizontally scaled system. But for solo projects, MVPs, internal tools, and small production apps, it gives a very good simplicity-to-performance ratio.

The whole deployment can be kicked off with one command:

```bash
./deploy
```
