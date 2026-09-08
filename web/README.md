# LookMe · AI 形象美学分析（前端演示版）

上传照片 → 模拟 AI 拆解脸型 / 身形 → 展示分析报告并推荐抖音、小红书教学与健身博主内容。

当前为**纯前端演示**：分析结果为内置演示数据，照片不会离开浏览器，也未接入任何后端服务。

## 运行

```bash
pnpm install
pnpm dev
```

生产构建：

```bash
pnpm build
```

## 项目结构

```text
web/
├─ src/
│  ├─ components/      # 页面与交互组件
│  ├─ data/profiles.ts # 脸型 / 体型演示档案与内容生成
│  ├─ lib/report.ts    # 演示报告生成
│  ├─ types.ts         # 共享类型
│  ├─ App.tsx          # 页面流程状态机
│  └─ index.css        # Tailwind 主题
└─ index.html
```

## 待接入（正式版）

- 真实照片上传服务与 AI 脸型 / 体型分析
- 抖音 / 小红书内容库或授权检索
- 用户账号、历史报告与分享
- 隐私合规（照片即用即焚、用户授权）

## AI 形象预览接入（正式版）

发型 / 穿搭建议旁的“AI 预览”已支持真实图像生成服务，无需改动前端组件。

1. 复制 `.env.example` 为 `.env`，填写正式图像服务地址：

   ```bash
   VITE_AI_IMAGE_ENDPOINT=https://your-api.example.com/generate-preview
   ```

2. 服务端按以下约定实现一个 `POST multipart/form-data` 接口：

   | 字段 | 说明 |
   | --- | --- |
   | `photo` | 用户原图文件 |
   | `title` | 建议标题，如「法式慵懒卷」 |
   | `note` | 建议说明文案 |
   | `category` | 类别，如「发型预览 / 穿搭预览」 |
   | `variant` | “换一版”序号，用于同建议输出变体 |
   | `tags` | 风格标签（可重复提交多个） |

3. 接口可返回图片二进制，或 `{ "url": ... }` / `{ "imageUrl": ... }` / `{ "previewUrl": ... }` JSON。

接口不可用时，前端会自动回退到浏览器本地演示预览，不影响审核与演示。
