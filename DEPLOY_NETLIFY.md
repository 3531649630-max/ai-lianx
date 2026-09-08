# Netlify 部署说明（国内访问更友好）

当 Vercel 的 `vercel.app` 域名在你的网络下无法访问时，改用 Netlify：

- 前端：`web/dist`
- 后端接口：`netlify/functions/`
- 配置：`netlify.toml`

## 部署步骤

1. 打开 [app.netlify.com/start](https://app.netlify.com/start) 并用 GitHub 登录。
2. 点击 **Import an existing project from GitHub**。
3. 选择 `3531649630-max/ai-lianx` 仓库并点 Import。
4. Netlify 会自动读取 `netlify.toml`，Build Command 会显示 `pnpm --filter web build`。
5. 点击 **Deploy site**，等待完成。
6. 站点会得到类似 `https://ai-lianx.netlify.app` 的地址。

## 环境变量（以后接真实 AI 时）

在 Netlify Site Settings → Environment variables 中添加：

- `AI_IMAGE_ENDPOINT`：真实 AI 图像服务地址

当前演示版无需任何环境变量。

## 本地验证

```bash
pnpm build
pnpm start
```
