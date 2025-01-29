---
layout: ../../layouts/PostLayout.astro
title: "How to Seamlessly Embed a Remix SPA into Your Go Backend"
pubDate: 2025-01-28
description: "Embedding a Remix SPA in a Go Backend: A true Full-Stack Solution"
author: "Oussama Bernou"
image:
  url: "https://docs.astro.build/assets/full-logo-light.png"
  alt: "The full Astro logo."
tags: ["Go", "Remix", "learning in public", "SPA", "full-stack"]
---
# How to Seamlessly Embed a Remix SPA into Your Go Backend

I needed to create an internal web app to be deployed on an internal server. I decided it should ideally be a single Docker image to better isolate it from other services hosted on the same server. This approach also makes it easy to deploy and maintain. I will discuss the deployment part in a later article.

## Why This Approach?

* **Single binary deployment** - No need for separate frontend hosting
    
* **Improved performance** - Direct serving of static assets
    
* **Simplified architecture** - Reduced infrastructure complexity
    
* **Full-stack Go** - Leverage Go's excellent HTTP capabilities
    

## TLDR

Here's the key code that makes it all work:

```go
import (
	"embed"
	"io/fs"
)

//go:embed all:build/client
var distDir embed.FS

var dirPath = "build/client" // path of the front-end build

// DistDirFS contains the embedded dist directory files (without the "dist" prefix)
var DistDirFS, _ = fs.Sub(distDir, dirPath)
```

In this tutorial, we will focus on embedding a Remix Single Page Application (SPA) into a Go backend server binary.

Let's start a demo project for this tutorial.

### 1. Project Structure

Let's start by setting up our project structure:

```plaintext
my-app/
├── ui/
│   ├── app/
│   ├── embed.go
│   └── build/
│       └── client/
├── main.go
└── go.mod
```

### 2. Project Setup

First, create your project directory:

```bash
mkdir myapp
cd myapp
# or use this helpful shortcut
take myapp # see tip below
```

> 💡 Tip: Add this useful function to your `.zshrc` or `.bashrc`:
> 
> ```bash
> # function that create a directory and cd to it
> take() {
> mkdir $1 && cd  $1
> }
> ```

Initialize your Go module:

```bash
go mod init myapp
```

### 3. Create the Remix SPA

Set up the Remix SPA using the official template:

```bash
npx create-remix@latest --install --no-git-init --template remix-run/remix/templates/spa ui -y
```

### 4. Implement the Embedding

Create `ui/embed.go` to handle the frontend embedding:


```go
// Package ui handles the frontend embedding.
package ui

import (
	"embed"
	"io/fs"
)

//go:embed all:build/client
var distDir embed.FS

// DistDirFS contains the embedded dist directory files (without the "dist" prefix)
var DistDirFS, _ = fs.Sub(distDir, "build/client")
```

### 5. Create the Server

Implement your main server in `main.go`:

```go
package main

import (
	"log"
	"myapp/ui"
	"net/http"
)

func main() {
	// API endpoint
	http.HandleFunc("/api/hello", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"message": "Hello from Go!"}`))
	})

	// Serve static files
	fs := http.FileServer(http.FS(ui.DistDirFS))

	// Catch-all route for client-side routing
	http.Handle("/", http.StripPrefix("/", fs))

	log.Println("Server running on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
```

### 6. Frontend Implementation

Create a simple frontend page in `ui/app/routes/_index.tsx`:

```javascript
export default function Index() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("/api/hello") // api in same origin
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1>Welcome to Remix (SPA) + Go!</h1>
          <p>Message from Go backend: {data}</p>
        </header>
      </div>
    </div>
  );
}
```

### 7. Build and Run

Build the frontend:

```bash
cd ui
npm install
npm run build
cd ..
```

Start the server:

```go
go run main.go
```

Visit `http://localhost:8080/` to see your application in action!

Congrats, now your Go backend server is serving an embedded React SPA, from a single, deployable binary that serves both your frontend and backend.

![api response](https://cdn.hashnode.com/res/hashnode/image/upload/v1738113972526/ac67e8bf-8583-4f99-b2c9-0df2606e684c.png)
