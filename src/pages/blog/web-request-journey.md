---
title: "The journey of an HTTP request"
description: "What happens when you type https://www.google.com and press enter?"
layout: "../../layouts/PostLayout.astro"
---
## DNS request

The first step is to find google's server IP address, so it sends a DNS request to get the IP address associated with the subdomain 'www' part of [google.com](http://google.com) domain.

## TCP/IP

when it gets the IP address your browser establishes a TCP connection over the IP protocol with the server

## Firewall

<!-- If you're accessing Google from behind a firewall (e.g., a corporate network), the request will first pass through the firewall, which enforces security rules to protect your network from unauthorized access. -->
Before the request reaches the web server, the firewall will check it against rules set by Google security teams. Only if the request passes the firewall's rules will it be allowed to reach the web server.

## HTTPS/SSL

since you sent an HTTPS request visiting [https://www.google.com](https://www.google.com), your connection is secured using HTTPS and SSL/TLS. This encrypts the data exchanged between your browser and Google's servers, protecting your privacy and preventing eavesdropping

## Load-balancer

Google's infrastructure is designed to handle an immense amount of traffic. So your request will likely hit a load balancer server first, which distributes incoming traffic across multiple servers to ensure optimal performance and availability.

## Web server

Your request is then routed to one of Google's web servers, which are responsible for serving the HTML, CSS, and JavaScript files that make up the Google search page.

## Application Server

While the web server handles the static files, Google's application servers dynamically generate content based on your request. For example, if you search for something, the application servers will process your query and fetch relevant results.

## Database

To retrieve search results, the application servers query Google's massive databases, which store and index a substantial portion of the Internet's content. Once all the necessary data has been assembled, it's sent back through the same chain (application server, web server, load balancer, etc.) to your browser, where the Google search page is finally rendered for you to use.

  

This entire process happens in a split second, thanks to the incredible engineering and infrastructure behind Google's services. The next time you visit [google.com](http://google.com), appreciate the complexity and coordination required to make it all work seamlessly.
