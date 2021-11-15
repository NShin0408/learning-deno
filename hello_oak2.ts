import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use(async (ctx, next) => {
   await next();
   const rt = ctx.response.headers.get("X-Responce-Time");
   console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

app.use(async (ctx, next) => {
   const start = Date.now();
   await next();
   const ms = Date.now() - start;
   ctx.response.headers.set("X-Responce-Time", `${ms}ms`);
});

app.use((ctx) => {
   ctx.response.body = "hello world";
});

await app.listen({ port: 8080});