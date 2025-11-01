# 快速部署指南 - 5分钟搞定！

> 🚀 **最简部署流程，适用于已有 GitHub 账户的用户**

## 前置条件
- ✅ GitHub 账户
- ✅ OpenAI API Key（可选，用于模型对话功能）

## 一键部署步骤

### 1. Fork 项目
访问 GitHub 项目页面，点击右上角 **"Fork"** 按钮

### 2. 导入到 Vercel
1. 打开 [Vercel](https://vercel.com/dashboard)
2. 点击 **"New Project"**
3. 选择 **"Import Git Repository"**
4. 选择你刚 Fork 的仓库
5. 配置以下设置：
   ```
   Framework Preset: Next.js
   Root Directory: web
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```
6. 点击 **"Deploy"**

### 3. 设置环境变量
部署完成后，进入项目设置：

1. 点击 **"Settings"** → **"Environment Variables"**
2. 添加以下变量：

| 名称 | 值 | 说明 |
|------|-----|------|
| `OPENAI_API_KEY` | `sk-xxxxxxxxxx` | 你的 OpenAI API Key（可选） |
| `OPENAI_API_URL` | `https://zenmux.ai/api/v1` | API 服务地址 |
| `OPENAI_MODEL` | `openai/gpt-5` | AI 模型名称 |
| `NEXT_PUBLIC_TWITTER_HANDLE` | `你的用户名` | Twitter 账号（可选） |

3. 点击 **"Save"**
4. 进入 **"Deployments"** → **"Redeploy"**

### 4. 完成！ 🎉

等待 2-3 分钟，部署完成后你将得到类似：
`https://Monnaire AI Arena-yourusername.vercel.app` 的访问链接

---

## 常见问题

**Q: 页面空白或加载失败？**
A: 检查环境变量是否正确设置，特别是 `NEXT_PUBLIC_NOF1_API_BASE_URL`

**Q: 图表不显示？**
A: 这是正常现象，因为使用的是真实交易数据，需要等待数据加载

**Q: 如何自定义样式？**
A: 编辑 `web/src/app/globals.css` 文件，然后重新部署

---

详细说明请查看：[完整部署指南](./VERCEL_DEPLOYMENT_GUIDE.md)
