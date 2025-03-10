---
layout: ../../layouts/PostLayout.astro
title: "Rewriting a C HTTP Server in Rust from scratch - part 1"
pubDate: 2025-03-09
description: "Building a Rust HTTP Server from a C Foundation"
author: "Oussama Bernou"
image:
  url: "https://docs.astro.build/assets/full-logo-light.png"
  alt: "The full Astro logo."
tags: ["Rust"]
---

<!--toc:start-->
- [Part 1: The First Steps in Rust](#part-1-the-first-steps-in-rust)
  - [Binding to a Port](#binding-to-a-port)
  - [HTTP Message Basics](#http-message-basics)
  - [Parsing HTTP Requests](#parsing-http-requests)
  - [Crafting Responses](#crafting-responses)
<!--toc:end-->

I recently rewrote my basic C HTTP server in Rust, and in this blog series, I’ll show you how I did it. The C version came from working on the Codecrafters HTTP server challenge, which got me started. I only wanted a working prototype that passed their tests, not something pretty. Trust me, that C code wasn’t readable. You wouldn’t want to look at it, and honestly, no one should. I didn’t even finish it, compression never got implemented, and when I made the server multithreaded, it started leaking memory. I went down a long rabbit hole trying to debug it, and after spending way too much time on that, I decided to stop working on it.

When writing this post it got too long, so I’m splitting it into parts. This is Part 1, where we’ll set up the basics: binding to a port, parsing HTTP requests, and crafting responses. Let’s get going.

## Part 1: The First Steps in Rust

### Binding to a Port

First, a server needs to bind to a port and listen for connections. Rust’s standard library has a `TcpListener` that makes this easy. Here’s the code:

```rust
use std::net::TcpListener;

fn main() {
    // Bind to port
    let listener = TcpListener::bind("127.0.0.1:4221").unwrap();

    // Listen for incoming connections
    for stream in listener.incoming() {
        match stream {
            Ok(_stream) => {
                println!("accepted new connection");
            }
            Err(e) => {
                println!("error: {}", e);
            }
        }
    }
}
```

The `TcpListener::bind` line connects the server to `127.0.0.1:4221`. Behind the scenes, Rust uses the `recv` syscall to check for connections, returning either a `TcpStream` if it works or an error if it doesn’t. The `incoming()` method loops over these connections, and for now, I’m just printing what happens. It’s simple, but it’s a foundation.

Now that we’ve got TCP working, let’s move to HTTP. Before adding features, we need to handle requests and responses, the core of an HTTP server. We’ll start with parsing requests.

### HTTP Message Basics

If HTTP is new to you, requests and responses are both “HTTP messages” and look pretty similar. The main difference is the first line: requests have a `request-line`, responses have a `status-line` (not “response-line,” which might surprise you). Here’s the format:

```
start-line CRLF
*( field-line CRLF )
CRLF
[ message-body ]
```

The `*( field-line CRLF )` part means zero or more headers, each ending with a carriage return and line feed (`CRLF`). Here’s an example HTTP request:

```
GET / HTTP/1.1
Host: localhost:4221
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:135.0) Gecko/20100101 Firefox/135.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Connection: keep-alive
```

This `GET` request has no body, most don’t. The [HTTP RFC (9112)](https://datatracker.ietf.org/doc/html/rfc9112#name-message-parsing) suggests parsing like this: read the `start-line` into a structure, store headers in a hash table until an empty line, then check for a body using headers like `Content-Length`. That’s what we’ll do.

### Parsing HTTP Requests

Let’s set up the data structures. The `request-line` (like `GET / HTTP/1.1`) has three pieces:

```rust
pub struct RequestLine {
    pub method: String,
    pub target: String,
    pub version: String,
}
```

The full request includes headers and an optional body:

```rust
use std::collections::HashMap;

pub struct Request {
    pub request_line: RequestLine,
    pub headers: HashMap<String, Vec<String>>,
    pub body: Vec<u8>,
}
```

The `Vec<String>` for headers is because a header can have multiple values (split by commas), which I didn’t know at first. For the body, I used `Vec<u8>` instead of `Option<Vec<u8>>`. An empty vector works when there’s no body, though `Option` might be better for a proper library, something for later.

Now, the parsing code. The `Request` constructor takes a `TcpStream` and returns a `Result`:

```rust
use std::io::{BufRead, BufReader};
use std::net::TcpStream;
use anyhow::{bail, Result};

impl Request {
    pub fn new(stream: &TcpStream) -> Result<Self> {
        let mut buf_reader = BufReader::new(stream);

        // Parse request-line
        let mut start_line = String::new();
        buf_reader.read_line(&mut start_line)?;
        let start_line = start_line.trim();
        let parts: Vec<&str> = start_line.split_whitespace().collect();
        if parts.len() != 3 {
            bail!("Invalid request line");
        }
        let request_line = RequestLine {
            method: parts[0].to_string(),
            target: parts[1].to_string(),
            version: parts[2].to_string(),
        };

        let mut request = Request {
            request_line,
            headers: HashMap::new(),
            body: Vec::new(),
        };

        // Parse headers
        let mut line = String::new();
        loop {
            line.clear();
            buf_reader.read_line(&mut line)?;
            let line = line.trim();
            if line.is_empty() {
                break;
            }
            let header = line.split_once(":").unwrap();
            let (key, values) = (header.0.trim(), header.1.trim());
            request
                .headers
                .entry(key.to_string())
                .or_insert(
                    values
                        .split(",")
                        .map(|v| v.trim().to_string())
                        .collect(),
                );
        }

        // Parse body if present
        if let Some(content_length) = request.headers.get("Content-Length") {
            if let Ok(length) = content_length[0].parse::<usize>() {
                let mut buffer = vec![0; length];
                buf_reader.read_exact(&mut buffer)?;
                request.body = buffer;
            }
        }

        Ok(request)
    }
}
```

This matches the RFC’s steps: parse the `request-line`, load headers into a `HashMap`, and read the body if `Content-Length` exists. The `anyhow` crate helps with errors. It’s not flawless, error handling could be better, but it’s good enough for now.

### Crafting Responses

Next, we need a `Response` struct:

```rust
use std::collections::HashMap;

pub struct Response {
    pub status_line: StatusLine,
    pub headers: HashMap<String, Vec<String>>,
    pub body: Vec<u8>,
}

pub struct StatusLine {
    pub version: String,
    pub status_code: u16,
    pub reason_phrase: Option<String>,
}
```

To send it, we convert to bytes. Here’s the `StatusLine` part:

```rust
impl StatusLine {
    pub fn to_bytes(&self) -> Vec<u8> {
        let reason = self.reason_phrase.clone().unwrap_or_default();
        format!("{} {} {}", self.version, self.status_code, reason)
            .as_bytes()
            .to_vec()
    }
}
```

I picked `Vec<u8>` over `[u8]` because we’ll move this buffer around, and heap allocation makes sense.

Now, a simple constructor:

```rust
impl Response {
    pub fn new() -> Self {
        let mut headers = HashMap::new();
        headers.insert("Content-Type".to_string(), vec!["text/plain".to_string()]);
        Response {
            status_line: StatusLine {
                version: "HTTP/1.1".to_string(),
                status_code: 200,
                reason_phrase: Some("OK".to_string()),
            },
            headers,
            body: Vec::new(),
        }
    }
}
```

This gives us a basic 200 OK response.

All that’s left is a method to convert the response to bytes:

```rust
pub fn to_bytes(&mut self) -> Vec<u8> {
    // Update Content-Length header
    self.headers.insert(
        "Content-Length".to_string(),
        vec![self.body.len().to_string()],
    );

    // Construct headers string
    let mut response = Vec::new();

    // Add status line
    response.extend(self.status_line.to_bytes());
    response.extend(b"\r\n");

    // Add headers
    for (name, values) in &self.headers {
        response.extend(format!("{}: ", name).as_bytes());
        if values.len() > 1 {
            response.extend(values.join(", ").as_bytes());
        } else {
            response.extend(values[0].as_bytes());
        }
        response.extend(b"\r\n");
    }

    // Add blank line between headers and body
    response.extend(b"\r\n");

    // Add body
    response.extend(&self.body);

    response
}
```

We’ll build on it in Part 2. Stay tuned.
