import index from "./index.html";

const server = Bun.serve({
  routes: {
    "/": index,
  },
  async fetch(req) {
    const url = new URL(req.url);

    // 1. 尝试匹配 routes 定义的路由
    // (注意：Bun.serve 的 routes 属性处理优先级最高，但为了严谨我们在 fetch 里也可以手动处理逻辑)
    
    // 2. 静态文件服务：如果路径以 /assets/ 开头，或者是在 public 目录下能找到的文件
    // 我们尝试直接从 filesystem 读取
    const publicFile = Bun.file(`public${url.pathname}`);
    if (await publicFile.exists()) {
      return new Response(publicFile);
    }

    // 3. 默认返回 index.html (SPA 路由回退)
    // 如果请求的不是静态资源（比如图片视频），而是页面路由，则返回 index.html
    if (!url.pathname.includes('.')) {
      return new Response(index, {
        headers: { "Content-Type": "text/html" },
      });
    }

    return new Response("Not Found", { status: 404 });
  },
  development: {
    hmr: true,
  },
  port: 3000, 
});

console.log(`🚀 Phantom Math running at ${server.url}`);
