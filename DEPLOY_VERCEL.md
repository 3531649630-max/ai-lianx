# Vercel 部署说明

本项目已配置为 Vercel 部署结构：

- 前端：`web/`，构建产物输出到 `web/dist`
- 后端接口：`api/health.js`、`api/ai-preview.js`（Vercel Functions）
- 自动安装 / 构建：`pnpm install` → `pnpm build`（见 `vercel.json`）

## 步骤

1. 把整个项目推送到 GitHub（需要先创建仓库）：

   ```bash
   git init
   git add .
   git commit -m "init lookme"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/<仓库名>.git
   git push -u origin main
   ```

2. 打开 [vercel.com](https://vercel.com) → Add New → Project，导入刚才的 GitHub 仓库。

3. Vercel 会自动读取 `vercel.json`，无需手动改框架设置，直接 Deploy。

4. 部署完成后，在 Vercel 项目 Settings → Environment Variables 中添加：

   - `AI_IMAGE_ENDPOINT`：真实 AI 图像服务地址（没有可先留空，使用演示预览）
   - `VITE_AI_IMAGE_ENDPOINT=/api/ai-preview`：让前端 AI 预览走本项目后端转发

5. 添加环境变量后，在 Vercel 中 Redeploy 一次即可生效。

## 本地验证

```bash
pnpm build
pnpm start
```

然后打开 http://127.0.0.1:4173/。

## 注意

- Vercel Functions 有请求体大小限制，正式版若要上传超大照片做 AI 分析，建议把照片先传到对象存储，再把存储地址发给 AI 服务。
- 国内访问 Vercel 速度一般，正式面向国内用户运营时建议迁移到国内云服务器。
