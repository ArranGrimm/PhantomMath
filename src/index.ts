import index from "./index.html";

const server = Bun.serve({
  routes: {
    "/": index,
  },
  development: {
    hmr: true,
  },
  port: 3000, 
});

console.log(`🚀 Phantom Math running at ${server.url}`);
