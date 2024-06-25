import { Hono } from "hono";
import { shiftjis } from "./index";
import { jsxRenderer } from "hono/jsx-renderer";

const app = new Hono();

app.get(
  "*",
  jsxRenderer(({ children }) => {
    return (
      <html lang="ja">
        <head>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>a</title>
        </head>
        <body>{children}</body>
      </html>
    );
  }),
);

app.use(shiftjis);

app.get("/", async (c) => {
  c.header("Content-Type", "text/html; charset=shift_jis");
  return c.render(<div>こんにちは、世界</div>);
});

Bun.serve({ fetch: app.fetch, port: 8000 });
