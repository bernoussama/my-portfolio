const root = import.meta.dir;

Bun.serve({
  port: 3333,
  async fetch(req) {
    const url = new URL(req.url);
    let pathname = url.pathname;
    if (pathname === "/") pathname = "/index.html";
    const file = Bun.file(`${root}${pathname}`);
    if (await file.exists()) return new Response(file);
    return new Response("Not Found", { status: 404 });
  },
});

console.log("Serving at http://localhost:3333/");
