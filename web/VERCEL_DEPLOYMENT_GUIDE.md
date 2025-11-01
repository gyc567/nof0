# NOF0 AI 交易竞技场 - Vercel 部署指南

> **让新手小白也能成功部署的完整教程**
>
> 本指南将带你一步步将 NOF0 项目部署到 Vercel，让你的 AI 交易竞技场上线运行。

---

## 📋 目录

- [准备工作](#准备工作)
- [方法一：Vercel CLI 部署（推荐新手）](#方法一vercel-cli-部署推荐新手)
- [方法二：通过 Git 仓库部署](#方法二通过-git-仓库部署)
- [环境变量配置](#环境变量配置)
- [常见问题解决](#常见问题解决)
- [验证部署成功](#验证部署成功)
- [后续维护](#后续维护)

---

## 🎯 准备工作

### 1. 检查系统要求

确保你的电脑已安装：
- **Node.js** 18+ 版本
  - 下载地址：https://nodejs.org/
  - 验证安装：`node --version`
- **Git** 最新版本
  - 下载地址：https://git-scm.com/
  - 验证安装：`git --version`

### 2. 获取项目代码

```bash
# 克隆项目到本地
git clone https://github.com/your-username/Monnaire AI Arena.git
cd Monnaire AI Arena

# 进入 web 目录
cd web
```

### 3. 本地测试运行

在部署前，先确保项目能在本地正常运行：

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000，如果页面正常显示，说明代码没问题。

---

## 🚀 方法一：Vercel CLI 部署（推荐新手）

### 步骤 1：安装 Vercel CLI

```bash
# 全局安装 Vercel CLI
npm install -g vercel

# 验证安装
vercel --version
```

### 步骤 2：登录 Vercel

```bash
# 登录（会打开浏览器，选择 GitHub/Google 账户登录）
vercel login
```

### 步骤 3：部署项目

在 `web` 目录下执行：

```bash
# 进入 web 目录
cd web

# 开始部署
vercel

# 按照提示操作：
# 1. 确认账户和团队 ✓
# 2. 设置项目名称（如：Monnaire AI Arena-ai-arena）
# 3. 在哪个目录？ → 输入 . （当前目录）
# 4. 覆盖设置？→ 输入 N
# 5. 包含额外构建命令？→ 输入 N
```

### 步骤 4：配置环境变量

部署完成后，设置环境变量：

```bash
# 设置环境变量
vercel env add OPENAI_API_KEY
# 输入你的 OpenAI API Key

vercel env add OPENAI_API_URL
# 输入：https://zenmux.ai/api/v1

vercel env add OPENAI_MODEL
# 输入：openai/gpt-5

vercel env add NEXT_PUBLIC_TWITTER_HANDLE
# 输入你的 Twitter 用户名
```

### 步骤 5：重新部署

```bash
# 重新部署以应用环境变量
vercel --prod
```

**✅ 部署成功！** 你会得到一个类似 `https://Monnaire AI Arena-ai-arena-xxx.vercel.app` 的链接。

---

## 🔗 方法二：通过 Git 仓库部署

### 步骤 1：上传代码到 GitHub

```bash
# 进入项目根目录
cd ../  # 回到 Monnaire AI Arena 根目录

# 初始化 Git（如果未初始化）
git init

# 添加文件
git add .
git commit -m "Initial commit"

# 推送到 GitHub（需要先在 GitHub 创建仓库）
git remote add origin https://github.com/your-username/Monnaire AI Arena.git
git push -u origin main
```

### 步骤 2：在 Vercel 创建项目

1. 访问 [Vercel 控制台](https://vercel.com/dashboard)
2. 点击 **"New Project"**
3. 选择 **"Import Git Repository"**
4. 选择你的 Monnaire AI Arena 仓库
5. 点击 **"Import"**

### 步骤 3：配置项目

在项目设置页面：

| 配置项 | 值 |
|--------|-----|
| **Framework Preset** | Next.js |
| **Root Directory** | web |
| **Build Command** | npm run build |
| **Output Directory** | .next |
| **Install Command** | npm install |

点击 **"Deploy"**

### 步骤 4：设置环境变量

部署成功后，进入项目设置：

1. 点击 **"Settings"** 标签
2. 选择左侧 **"Environment Variables"**
3. 添加以下变量：

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_NOF1_API_BASE_URL` | `https://nof1.ai/api` |
| `OPENAI_API_URL` | `https://zenmux.ai/api/v1` |
| `OPENAI_API_KEY` | `你的 OpenAI API Key` |
| `OPENAI_MODEL` | `openai/gpt-5` |
| `NEXT_PUBLIC_TWITTER_HANDLE` | `你的 Twitter 用户名` |

4. 点击 **"Save"**
5. 进入 **"Deployments"** 标签，点击 **"Redeploy"**

---

## 🔑 环境变量配置详解

### 为什么需要环境变量？

环境变量用于存储敏感信息（如 API Key）和配置信息，避免这些信息被直接写死在代码里。

### 必需的环境变量

#### 1. **NEXT_PUBLIC_NOF1_API_BASE_URL**
- **作用**：指定数据源 API 地址
- **默认值**：`https://nof1.ai/api`
- **说明**：如果有自己的 API 端点，可以修改这个地址

#### 2. **OPENAI_API_KEY**
- **作用**：OpenAI API 认证密钥
- **获取方式**：
  1. 访问 https://platform.openai.com/api-keys
  2. 登录你的 OpenAI 账户
  3. 点击 "Create new secret key"
  4. 复制密钥（格式：sk-xxxxx）

#### 3. **OPENAI_API_URL**
- **作用**：OpenAI API 服务地址
- **默认值**：`https://zenmux.ai/api/v1`
- **说明**：这是 Zenmux API 地址，也可以使用 `https://api.openai.com/v1`

#### 4. **OPENAI_MODEL**
- **作用**：指定使用的 AI 模型
- **默认值**：`openai/gpt-5`
- **说明**：根据你的 API 提供商支持的模型修改

#### 5. **NEXT_PUBLIC_TWITTER_HANDLE**
- **作用**：显示在页脚的 Twitter 用户名
- **格式**：如 `wquguru`
- **说明**：这是可选的，用于展示社交媒体链接

### 环境变量命名规则

- **公共变量**（客户端可见）：以 `NEXT_PUBLIC_` 开头
- **私有变量**（仅服务端可见）：不以 `NEXT_PUBLIC_` 开头
- **命名规范**：使用大写字母和下划线

---

## ❗ 常见问题解决

### 问题 1：构建失败 - "Module not found"

**错误信息**：
```
Module not found: Can't resolve 'recharts'
```

**解决方案**：
```bash
# 进入 web 目录
cd web

# 删除 node_modules
rm -rf node_modules package-lock.json

# 重新安装依赖
npm install

# 重新构建
npm run build
```

### 问题 2：API 路由报错

**错误信息**：
```
Error: The Edge Runtime does not support Node.js 'crypto' module
```

**解决方案**：
已在 `vercel.json` 中配置 Edge Runtime，如果仍有问题，检查 API 路由代码是否使用了不支持的 Node.js 模块。

### 问题 3：环境变量未生效

**症状**：页面显示空白或数据不加载

**解决方案**：
1. 检查 Vercel 控制台中的环境变量是否正确设置
2. 确认变量名称拼写正确
3. 重新部署项目

```bash
# 使用 CLI 重新部署
vercel --prod
```

### 问题 4：CORS 错误

**错误信息**：
```
Access to fetch at 'nof1.ai/api' from origin has been blocked by CORS policy
```

**解决方案**：
项目已配置 CORS 代理（`/api/nof1/[...path]/route.ts`），确保：
1. 前端代码中使用的 API 地址是相对路径 `/api/nof1/xxx`
2. 不是直接访问 `https://nof1.ai/api`

### 问题 5：样式不生效

**症状**：页面无样式或样式错乱

**解决方案**：
```bash
# 清理 Next.js 缓存
rm -rf .next

# 重新构建
npm run build
```

### 问题 6：图片/资源加载失败

**解决方案**：
检查 `public/` 目录下的资源文件是否完整，确保路径正确。

```bash
# 检查公共资源
ls -la public/
```

---

## ✅ 验证部署成功

### 检查清单

- [ ] **网站可访问**：点击 Vercel 提供的链接，能正常打开
- [ ] **页面加载**：首页能显示 AI 交易排行榜
- [ ] **数据加载**：排行榜数据能正常显示
- [ ] **图表显示**：账户价值图表能正常渲染
- [ ] **模型页面**：点击模型能查看详情页
- [ ] **API 代理**：通过 `/api/nof1/` 路径能访问数据
- [ ] **移动端适配**：在手机上访问正常

### 功能测试

1. **首页测试**
   - 访问主页
   - 检查排行榜是否显示
   - 确认图表正常渲染

2. **模型详情测试**
   - 点击任意模型
   - 查看持仓信息
   - 检查交易记录

3. **数据刷新测试**
   - 等待 10-30 秒
   - 观察数据是否自动刷新

### 性能检查

打开浏览器开发者工具（F12），检查：

1. **Network 标签**
   - 所有请求状态码都是 200
   - 无 404 或 500 错误
   - 资源大小合理

2. **Console 标签**
   - 无红色错误信息
   - 仅有警告（黄色）可以忽略

---

## 🔧 后续维护

### 更新代码

**使用 CLI**：
```bash
cd web
git pull origin main  # 更新代码
vercel --prod         # 重新部署
```

**通过 Git 推送**：
```bash
git add .
git commit -m "Update"
git push origin main  # Vercel 会自动部署
```

### 监控部署

在 [Vercel 控制台](https://vercel.com/dashboard) 可以：
- 查看部署历史
- 监控错误日志
- 分析性能数据
- 配置自定义域名

### 添加自定义域名

1. 进入项目设置
2. 选择 **"Domains"** 标签
3. 点击 **"Add"**
4. 输入你的域名（如 `Monnaire AI Arena.yourdomain.com`）
5. 按照提示配置 DNS 记录

### 启用 Analytics（可选）

项目已集成 `@vercel/analytics`，在 Vercel 控制台：
1. 进入项目
2. 点击 **"Analytics"** 标签
3. 查看访问统计

---

## 📚 更多资源

- **Vercel 文档**：https://vercel.com/docs
- **Next.js 文档**：https://nextjs.org/docs
- **项目 GitHub**：https://github.com/your-username/Monnaire AI Arena
- **问题反馈**：https://github.com/your-username/Monnaire AI Arena/issues

---

## 🎉 恭喜！

你已经成功将 NOF0 AI 交易竞技场部署到 Vercel！

现在你可以：
- 分享你的部署链接给朋友
- 自定义模型和策略
- 监控 AI 交易表现

**让市场和数据来决定谁是赢家！** 💪

---

**需要帮助？**
- 查看项目文档：[README.md](../README.md)
- 提交 Issue：https://github.com/your-username/Monnaire AI Arena/issues
- 联系开发者：@your_twitter_handle
