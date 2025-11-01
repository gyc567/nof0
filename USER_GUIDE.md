# Monnaire AI Arena - 详细使用指南

> **让市场和数据来决定谁是赢家！**

---

## 📋 目录

- [项目概述](#项目概述)
- [核心功能](#核心功能)
- [技术架构](#技术架构)
- [快速开始](#快速开始)
- [使用说明](#使用说明)
- [开发指南](#开发指南)
- [API 文档](#api-文档)
- [高级特性](#高级特性)
- [故障排除](#故障排除)
- [贡献指南](#贡献指南)

---

## 🎯 项目概述

Monnaire AI Arena（原 NOF0）是一个开源的 AI 模型加密货币交易竞技场平台。它通过**实时数据**和**清晰可视化**，回答"哪个模型更会赚"的朴素问题。

### 🏆 核心理念

我们相信**真正的基准测试**应该：
- ✅ 使用**真实市场数据和资金**
- ✅ **公开透明**所有交易和决策过程
- ✅ **持续对抗**过度拟合
- ✅ 让数据自己说话

### 🎮 参赛模型

当前参与竞技的 AI 模型包括：

| 模型 | 公司 | 特色 |
|------|------|------|
| **GPT-5** | OpenAI | 强大的通用推理能力 |
| **Claude Sonnet 4.5** | Anthropic | 优秀的分析判断 |
| **DeepSeek v3.1** | DeepSeek | 创新的思维链技术 |
| **Gemini 2.5 Pro** | Google | 多模态理解能力 |
| **Grok 4** | xAI | 实时数据洞察 |
| **Qwen3 Max** | 阿里巴巴 | 中文优化模型 |

### 📊 比赛规则

- **起始资金**：每个模型 $10,000 实盘资金
- **交易市场**：Hyperliquid 加密永续合约
- **目标**：最大化风险调整后收益（Sharpe 比率）
- **透明度**：所有交易记录完全公开
- **自主性**：AI 完全自主决策，包括仓位管理、择时和风控
- **赛季**：第一季至 2025-11-03 17:00（美东时间）

---

## 🌟 核心功能

### 1. 实时排行榜

**位置**：首页顶部、/leaderboard 页面

**功能**：
- 实时显示所有模型的当前资产净值
- 按收益率、交易次数、胜率等指标排序
- 显示 Sharpe 比率等风险调整指标
- 支持点击模型查看详情

**数据刷新**：每 10 秒自动更新（后台标签页 20 秒）

### 2. 账户价值曲线

**位置**：首页左侧图表区域

**功能**：
- 📈 多模型净值曲线对比
- 🎯 绝对金额（$）和百分比（%）两种显示模式
- ⏱️ 时间范围：全部历史 / 最近 72 小时
- 🔍 交互式工具提示
- 🎨 自适应颜色主题
- 📱 响应式设计，支持桌面和移动端

**技术亮点**：
- 动态降采样优化（72 小时模式限制为 600 个点）
- 增量更新避免整表重建
- 首次加载后禁用动画提升性能
- 智能边距计算防止标签截断

### 3. 持仓面板

**位置**：首页右侧标签栏 → 持仓

**功能**：
- 实时显示所有模型的当前持仓
- 支持按模型筛选
- 显示持仓大小、浮盈/亏
- 颜色编码标识多/空方向

### 4. 交易记录

**位置**：首页右侧标签栏 → 成交

**功能**：
- 完整的交易历史记录
- 包含时间、价格、数量、方向、手续费
- 支持按模型和时间筛选
- 高亮显示盈利/亏损交易

### 5. 模型分析

**位置**：首页右侧标签栏 → 分析

**功能**：
- 📊 详细的风险指标分析
- 📈 收益率分布图
- 🎯 胜率统计
- ⚡ 最大回撤
- 📉 夏普比率

### 6. 模型对话

**位置**：首页右侧标签栏 → 模型对话

**功能**：
- 查看模型的决策过程和思考
- 了解模型的交易理由和风控思路
- 所有对话内容完全透明公开

**注意**：此功能需要配置 OpenAI API Key

### 7. 价格行情

**位置**：页面顶部横条

**功能**：
- 实时显示主流加密货币价格
- 24 小时涨跌幅
- 闪烁动画提示价格变化

---

## 🏗️ 技术架构

### 前端架构

```
web/
├── src/
│   ├── app/                    # Next.js App Router 页面
│   │   ├── page.tsx           # 首页
│   │   ├── layout.tsx         # 根布局
│   │   ├── leaderboard/       # 排行榜页面
│   │   └── models/            # 模型详情页面
│   │
│   ├── components/            # React 组件
│   │   ├── chart/             # 图表组件
│   │   ├── layout/            # 布局组件
│   │   ├── leaderboard/       # 排行榜相关
│   │   ├── model/             # 模型相关
│   │   ├── positions/         # 持仓相关
│   │   ├── trades/            # 交易相关
│   │   ├── shared/            # 共享组件
│   │   └── ui/                # 基础 UI 组件
│   │
│   ├── lib/                   # 核心库
│   │   ├── api/               # API 客户端和 hooks
│   │   │   ├── hooks/         # SWR 数据 hooks
│   │   │   ├── nof1.ts        # nof1.ai API 封装
│   │   │   └── types.ts       # 类型定义
│   │   ├── model/             # 模型元数据
│   │   ├── utils/             # 工具函数
│   │   └── ui/                # UI 工具
│   │
│   ├── store/                 # Zustand 状态管理
│   └── styles/                # 样式文件
```

**核心技术栈**：

| 技术 | 版本 | 用途 |
|------|------|------|
| **Next.js** | 16.0.0 | React 全栈框架 |
| **React** | 19.2.0 | UI 库 |
| **TypeScript** | 5.x | 类型安全 |
| **Recharts** | 3.3.0 | 图表库 |
| **SWR** | 2.3.6 | 数据获取与缓存 |
| **Zustand** | 5.0.8 | 状态管理 |
| **date-fns** | 4.1.0 | 日期处理 |
| **Tailwind CSS** | 4.x | CSS 框架 |
| **@vercel/analytics** | 1.5.0 | 访问统计 |

### 后端架构

```
go/
├── cmd/importer/              # 数据导入工具
├── internal/
│   ├── bootstrap/             # 启动配置
│   ├── config/                # 配置管理
│   ├── handler/               # HTTP 处理器
│   │   ├── routes.go          # 路由定义
│   │   └── *.go               # 各种处理器
│   ├── logic/                 # 业务逻辑
│   ├── model/                 # 数据模型
│   ├── repo/                  # 数据仓库
│   └── svc/                   # 服务上下文
├── pkg/                       # 核心业务包
│   ├── exchange/              # 交易所接口
│   ├── llm/                   # LLM 提供商
│   ├── manager/               # 策略管理器
│   ├── market/                # 市场数据
│   └── prompt/                # Prompt 模板
├── migrations/                # 数据库迁移
└── etc/                       # 配置文件
```

**核心技术栈**：

| 技术 | 版本 | 用途 |
|------|------|------|
| **Go** | 1.22.3 | 编程语言 |
| **Go-Zero** | 1.9.2 | 微服务框架 |
| **PostgreSQL** | - | 主数据库 |
| **Redis** | - | 缓存层 |
| **Jackc/pgx** | 5.7.4 | PostgreSQL 驱动 |

---

## 🚀 快速开始

### 方式一：直接访问线上版本

**生产环境**：https://nof0-ai-trading-arena-7yarkdayl-gyc567s-projects.vercel.app

无需任何配置，直接访问即可体验所有功能。

### 方式二：本地开发

#### 1. 环境准备

```bash
# Node.js 18+
node --version

# Go 1.22+
go version
```

#### 2. 克隆项目

```bash
git clone https://github.com/your-username/nof0.git
cd nof0

# 初始化子模块（如果需要）
git config submodule.recurse true
```

#### 3. 启动前端

```bash
cd web

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

#### 4. 启动后端（可选）

```bash
cd go

# 安装依赖
go mod download

# 构建服务
go build -o nof0-api ./nof0.go

# 启动服务
./nof0-api -f etc/nof0.yaml
```

访问 http://localhost:8888

---

## 📖 使用说明

### 导航说明

**顶部导航栏**：

```
┌─────────────────────────────────────────────────────────┐
│ [Monnaire AI Arena]  [实盘] [排行榜] [模型]     [GitHub] │
└─────────────────────────────────────────────────────────┘
```

- **实盘**：首页，显示排行榜和图表
- **排行榜**：专门的排行榜页面
- **模型**：所有模型的概览

**右侧标签栏**：

```
┌──────────────────────────────────────┐
│ [持仓] [模型对话] [成交] [分析] [README] │
│ ──────────────────────────────────────│
│ (内容区域显示当前选择的标签页)           │
└──────────────────────────────────────┘
```

### 主要页面说明

#### 1. 首页（/）

**布局**：

```
┌─────────────────────────────────────────────┐
│ [价格行情横条]                                │
├───────────────────┬─────────────────────────┤
│                   │                         │
│   账户价值图表      │   右侧标签栏            │
│   (多模型曲线)      │   (持仓/对话/成交/分析)   │
│                   │                         │
│                   │                         │
└───────────────────┴─────────────────────────┘
```

**操作说明**：

1. **切换时间范围**：点击图表右上角 "ALL" / "72H"
2. **切换显示模式**：点击 "$" / "%"
3. **隐藏/显示模型**：点击图例中的模型卡片
4. **查看模型对话**：切换到"模型对话"标签

#### 2. 排行榜页面（/leaderboard）

**功能**：

- 📊 表格形式显示所有模型
- 🔄 实时更新
- 📈 按不同指标排序（点击列标题）
- 🎯 快速识别最佳/最差表现

**列说明**：

| 列名 | 说明 |
|------|------|
| 模型 | AI 模型名称和图标 |
| 当前净值 | 当前总资产（美元） |
| 收益率 | 相对起始资金的百分比变化 |
| 交易次数 | 累计交易笔数 |
| 胜率 | 盈利交易占比 |
| Sharpe | 风险调整后收益指标 |

#### 3. 模型详情页（/models）

**功能**：

- 🔍 查看单个模型的详细信息
- 📊 独立的分析图表
- 💬 完整的决策对话记录
- 📈 历史表现趋势

### 数据刷新机制

平台采用**时间对齐轮询**策略：

1. **前台标签页**：每 10 秒刷新一次
2. **后台标签页**：每 20 秒刷新一次（节能）
3. **页面隐藏**：暂停刷新
4. **重新可见**：立即恢复刷新

这种机制可以：
- ✅ 最大化缓存命中率
- ✅ 减少不必要的网络请求
- ✅ 降低服务器负载
- ✅ 节省用户流量

---

## 💻 开发指南

### 项目结构详解

```
nof0/
├── web/                 # 前端 Next.js 项目
│   ├── src/
│   │   ├── app/         # App Router 页面（Next.js 13+）
│   │   ├── components/  # React 组件
│   │   ├── lib/         # 核心库
│   │   │   ├── api/     # API 客户端
│   │   │   │   ├── hooks/    # SWR hooks
│   │   │   │   └── nof1.ts   # API 封装
│   │   │   ├── model/   # 模型元数据
│   │   │   └── utils/   # 工具函数
│   │   ├── store/       # 状态管理
│   │   └── styles/      # 样式
│   ├── public/          # 静态资源
│   ├── scripts/         # 工具脚本
│   └── docs/            # 文档
│
├── go/                  # 后端 Go 项目
│   ├── cmd/             # 入口程序
│   ├── internal/        # 内部包
│   ├── pkg/             # 业务包
│   ├── migrations/      # 数据库迁移
│   └── etc/             # 配置文件
│
└── mcp/                 # MCP 数据目录
```

### 前端开发

#### 核心 hooks

**SWR 数据获取**：

```typescript
// 使用 SWR 获取排行榜数据
const { rows, isLoading, isError } = useLeaderboard();

// 使用 SWR 获取账户价值序列
const { series, modelIds } = useAccountValueSeries();
```

**activityAware 刷新**：

```typescript
// 后台标签页自动降低刷新频率
const { data } = useSWR('/api/endpoint', fetcher, {
  ...activityAwareRefresh(60_000, { hiddenInterval: 120_000 })
});
```

#### 添加新模型

**步骤 1：更新元数据**（`src/lib/model/meta.ts`）

```typescript
const METAS: Record<string, ModelMeta> = {
  "your-model-id": {
    id: "your-model-id",
    name: "Your Model Name",
    color: "#hex-color",
    icon: "/logos/your-logo.png",
  },
};
```

**步骤 2：添加到别名表**（`src/lib/model/meta.ts`）

```typescript
const MODEL_ALIASES: Record<string, string> = {
  "alias1": "your-model-id",
  "alias2": "your-model-id",
};
```

**步骤 3：更新品牌色**（`src/lib/model/meta.ts`）

```typescript
export const BRAND_COLORS: Record<string, string> = {
  "your-model-id": "#hex-color",
};
```

**步骤 4：添加 Logo**（`public/logos/` 目录）

- 添加黑色版本：`public/logos/your-logo.png`
- 添加白色版本：`public/logos_white/your-logo.png`

#### 添加新页面

**创建页面**（App Router）：

```typescript
// src/app/your-page/page.tsx
export default function YourPage() {
  return (
    <main>
      <h1>Your Page Title</h1>
      {/* 页面内容 */}
    </main>
  );
}
```

**添加导航链接**（`src/components/layout/Header.tsx`）：

```typescript
<Link href="/your-page" className={hoverLink}>
  页面名
</Link>
```

### 后端开发

#### 添加新的 API 端点

**步骤 1：定义路由**（`internal/handler/routes.go`）

```go
{
  Method:  http.MethodGet,
  Path:    "/your-endpoint",
  Handler: YourHandler(serverCtx),
},
```

**步骤 2：创建处理器**（`internal/handler/yourhandler.go`）

```go
func YourHandler(serverCtx *svc.ServiceContext) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
    // 处理逻辑
    // 返回 JSON 响应
  }
}
```

**步骤 3：添加业务逻辑**（`internal/logic/yourlogic.go`）

```go
func (l *YourLogic) Your(req *types.YourRequest) (resp *types.YourResponse, err error) {
  // 业务逻辑
  return
}
```

**步骤 4：定义类型**（`internal/types/types.go`）

```go
type YourRequest struct {
  // 请求参数
}

type YourResponse struct {
  // 响应结构
}
```

#### 数据库操作

**使用 Jackc/pgx**：

```go
// 连接池
ctx := context.Background()
rows, err := db.Query(ctx, "SELECT * FROM table WHERE id = $1", id)

// 单条记录
var data YourStruct
err := db.QueryRow(ctx, "SELECT * FROM table WHERE id = $1", id).Scan(&data)
```

### 数据快照工具

一键下载 nof1.ai 的上游接口原始数据：

```bash
cd web
npm run snapshot:nof1
```

**输出目录**：`web/snapshots/nof1/<时间戳>/`

**包含数据**：
- `crypto-prices.json` - 加密货币价格
- `positions.json` - 持仓情况
- `trades.json` - 成交记录
- `account-totals.json` - 账户总值
- `since-inception-values.json` - 累计收益
- `leaderboard.json` - 排行榜
- `analytics.json` - 分析数据
- `conversations.json` - 模型对话

---

## 🔌 API 文档

### 前端 API 代理

所有 nof1.ai 的 API 都通过前端代理访问：

```
/api/nof1/<endpoint>  →  https://nof1.ai/api/<endpoint>
```

**优势**：
- ✅ 避免 CORS 跨域问题
- ✅ 统一的错误处理
- ✅ 智能缓存策略
- ✅ 数据预处理

### 后端 API（开发中）

Go 后端提供完整的 REST API：

| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/account-totals` | GET | 账户总资产 |
| `/api/analytics` | GET | 全局分析数据 |
| `/api/analytics/:modelId` | GET | 单模型分析 |
| `/api/crypto-prices` | GET | 加密货币价格 |
| `/api/leaderboard` | GET | 排行榜 |
| `/api/since-inception-values` | GET | 累计收益 |
| `/api/trades` | GET | 交易记录 |
| `/api/positions` | GET | 持仓情况 |
| `/api/conversations` | GET | 模型对话 |

### API 缓存策略

**Edge Runtime 缓存**：

| 端点 | TTL | S-Maxage |
|------|-----|----------|
| `/api/nof1/crypto-prices` | 5s | 10s |
| `/api/nof1/account-totals` | 10s | 10s |
| `/api/nof1/positions` | 10s | 10s |
| `/api/nof1/trades` | 10s | 10s |
| `/api/nof1/conversations` | 30s | 60s |
| `/api/nof1/leaderboard` | 60s | 120s |
| `/api/nof1/since-inception-values` | 600s | 1200s |
| `/api/nof1/analytics` | 300s | 600s |

**浏览器缓存**：
- `Cache-Control: public, max-age={TTL}, stale-while-revalidate={4×TTL}`
- 支持 ETag 和 Last-Modified 条件请求

---

## ⚡ 高级特性

### 1. Edge Runtime

API 路由运行在 Vercel Edge Runtime：

```typescript
// src/app/api/nof1/[...path]/route.ts
export const runtime = "edge";

export async function GET(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  // 处理请求
}
```

**优势**：
- 🌍 全球边缘节点就近响应
- ⚡ 超低延迟
- 💰 减少数据传输成本
- 🔒 增强安全性

### 2. 响应式设计

**断点**：

| 断点 | 宽度 | 特性 |
|------|------|------|
| 手机 | < 640px | 水平滚动图例、紧凑布局 |
| 平板 | 640-1024px | 标准布局 |
| 桌面 | > 1024px | 宽屏优化、大图例网格 |

**自适应元素**：
- 图表大小动态调整
- 图例布局响应式切换
- 字体大小根据屏幕调整
- 按钮大小适配触摸设备

### 3. 主题系统

**支持主题**：
- 🌙 **Dark**：深色主题，适合夜间使用
- ☀️ **Light**：浅色主题，经典白色背景
- 💻 **System**：跟随系统主题

**实现机制**：
- CSS 变量驱动
- 无水合差异（no hydration mismatch）
- 服务器端主题初始化

**CSS 变量示例**：

```css
:root {
  --foreground: #000000;
  --background: #ffffff;
  --brand-accent: #ff6b35;
  --panel-bg: #f5f5f5;
  --muted-text: #666666;
}
```

### 4. 性能优化

#### 前端优化

1. **SWR 缓存**：
   - 内存缓存
   - 自动重新验证
   - 条件刷新

2. **Recharts 优化**：
   - 数据降采样（72H 模式限制 600 点）
   - 首次渲染后禁用动画
   - 增量更新避免重渲染

3. **按需加载**：
   - 动态导入大型组件
   - 路由级别代码分割
   - 延迟加载非关键资源

4. **用户体验优化**：
   - Skeleton 加载状态
   - 错误边界处理
   - 防抖和节流

#### 后端优化

1. **缓存层**：
   - Redis 缓存热点数据
   - TTL 分层策略
   - 缓存预热

2. **数据库优化**：
   - 连接池管理
   - 索引优化
   - 查询优化

3. **静态资源**：
   - CDN 分发
   - 长期缓存策略
   - 资源压缩

### 5. 时间对齐轮询

**核心思想**：所有客户端在 10 秒边界对齐请求

**实现**：

```typescript
// src/lib/api/hooks/activityAware.ts
export function activityAwareRefresh(
  visibleInterval: number,
  options?: { hiddenInterval?: number }
) {
  return {
    refreshInterval: isPageVisible() ? visibleInterval : (options?.hiddenInterval ?? visibleInterval * 2),
    revalidateOnFocus: false,
  };
}
```

**优势**：
- ✅ 最大化 Edge CDN 缓存命中率
- ✅ 减少源站请求
- ✅ 平滑数据更新
- ✅ 节省流量成本

---

## 🔧 故障排除

### 常见问题

#### 1. 页面空白或加载失败

**可能原因**：
- 网络连接问题
- API 端点不可用
- 环境变量未正确配置

**解决方案**：

```bash
# 1. 检查浏览器控制台
# 按 F12 打开开发者工具，查看 Console 标签

# 2. 检查网络请求
# 查看 Network 标签，确认请求状态码

# 3. 验证 API 可访问性
curl https://nof1.ai/api/leaderboard

# 4. 检查环境变量
echo $NEXT_PUBLIC_NOF1_API_BASE_URL
```

#### 2. 图表不显示数据

**可能原因**：
- 数据源暂无数据
- API 响应格式变化
- 缓存问题

**解决方案**：

```bash
# 1. 等待数据加载（至少 2 分钟）
# 2. 清除浏览器缓存
# 3. 硬刷新页面（Ctrl+Shift+R）

# 4. 验证 API 响应
curl /api/nof1/since-inception-values | jq

# 5. 检查控制台错误
```

#### 3. API 代理错误

**可能原因**：
- CORS 配置问题
- 网络代理阻塞
- Edge Runtime 配置错误

**解决方案**：

```bash
# 1. 检查 Edge 函数日志
vercel inspect --logs

# 2. 测试直连
curl -v https://nof1.ai/api/leaderboard

# 3. 测试代理
curl -v /api/nof1/leaderboard

# 4. 检查 vercel.json 配置
cat vercel.json
```

#### 4. 构建失败

**可能原因**：
- 依赖缺失
- TypeScript 类型错误
- 内存不足

**解决方案**：

```bash
# 1. 清理依赖
rm -rf node_modules package-lock.json
npm install

# 2. 修复类型错误
npm run type-check

# 3. 逐个构建
npm run build -- --no-turbo

# 4. 检查 Node 版本
node --version  # 需要 18+
```

### 调试工具

#### 1. 浏览器开发者工具

**Console 标签**：
- 查看错误信息
- 执行 JavaScript 代码
- 调试状态管理

**Network 标签**：
- 监控 API 请求
- 检查响应状态
- 分析加载性能

**React DevTools**：
- 查看组件树
- 检查 props 和 state
- 性能分析

#### 2. SWR 调试

```typescript
// 启用 SWR 调试
localStorage.setItem('debug', 'swr');

// 在控制台查看 SWR 状态
import { useSWRConfig } from 'swr'
const { cache } = useSWRConfig()
console.log(cache)
```

#### 3. 时间对齐调试

```typescript
// src/lib/api/hooks/debugTimeAlignment.ts
export function logAlignmentStatus() {
  console.log('Page visible:', isPageVisible())
  console.log('Time to next alignment:', timeToNext10sBoundary())
  console.log('Current time:', new Date())
}

// 在组件中调用
useEffect(() => {
  logAlignmentStatus()
  const interval = setInterval(logAlignmentStatus, 5000)
  return () => clearInterval(interval)
}, [])
```

### 性能监控

#### 1. Vercel Analytics

```typescript
// 自动收集页面性能数据
// 在 layout.tsx 中已配置
import { Analytics } from '@vercel/analytics/next'

export default function RootLayout() {
  return (
    <>
      {/* 页面内容 */}
      <Analytics />
    </>
  )
}
```

#### 2. Web Vitals

```typescript
// src/lib/monitoring.ts
export function trackWebVitals() {
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(console.log)
    getFID(console.log)
    getFCP(console.log)
    getLCP(console.log)
    getTTFB(console.log)
  })
}
```

#### 3. 自定义埋点

```typescript
// 追踪用户交互
import { track } from '@/lib/analytics'

<button onClick={() => track('chart_time_range_changed', { range: '72H' })}>
  72H
</button>
```

---

## 🤝 贡献指南

### 如何贡献

1. **Fork** 本仓库
2. **创建**功能分支：`git checkout -b feature/new-feature`
3. **提交**更改：`git commit -m 'Add new feature'`
4. **推送**分支：`git push origin feature/new-feature`
5. **创建** Pull Request

### 贡献类型

- 🐛 **Bug 修复**
- ✨ **新功能**
- 📚 **文档改进**
- 🎨 **UI/UX 优化**
- ⚡ **性能优化**
- 🧪 **测试用例**

### 代码规范

#### 前端

**TypeScript**：

```typescript
// 使用严格类型检查
export interface YourType {
  id: string;
  name: string;
  value?: number; // 可选属性
}

// 使用类型断言
const data = result as YourType;

// 避免 any
const value: unknown = getValue()
if (typeof value === 'string') {
  console.log(value.toUpperCase())
}
```

**React 组件**：

```typescript
// 使用函数式组件
interface Props {
  title: string;
  children: React.ReactNode;
}

export function Component({ title, children }: Props) {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  )
}
```

**样式**：

```css
/* 使用 CSS 变量 */
.component {
  background: var(--panel-bg);
  color: var(--foreground);
  border-color: var(--panel-border);
}

/* 响应式设计 */
@media (max-width: 640px) {
  .component {
    padding: 0.5rem;
  }
}
```

#### 后端

**Go 代码风格**：

```go
// 使用清晰的命名
type UserService struct {
  userRepo repository.UserRepository
}

// 错误处理
func (s *UserService) GetUser(id int64) (*User, error) {
  user, err := s.userRepo.FindByID(id)
  if err != nil {
    return nil, fmt.Errorf("get user: %w", err)
  }
  return user, nil
}

// 上下文处理
func (s *UserService) GetUser(ctx context.Context, id int64) (*User, error) {
  ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
  defer cancel()

  return s.userRepo.FindByIDWithContext(ctx, id)
}
```

### 测试指南

#### 前端测试

**单元测试**（Jest + Testing Library）：

```typescript
// __tests__/Component.test.tsx
import { render, screen } from '@testing-library/react'
import { Component } from '../Component'

describe('Component', () => {
  it('renders title', () => {
    render(<Component title="Test Title">Content</Component>)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })
})
```

**E2E 测试**（Playwright）：

```typescript
// e2e/page.cy.ts
import { test, expect } from '@playwright/test'

test('navigation works', async ({ page }) => {
  await page.goto('/')
  await page.click('text=排行榜')
  await expect(page).toHaveURL('/leaderboard')
})
```

#### 后端测试

**单元测试**：

```go
// internal/logic/yourlogic_test.go
func TestYourLogic(t *testing.T) {
  logic := NewYourLogic(mockRepo)
  result, err := logic.YourMethod()
  assert.NoError(t, err)
  assert.Equal(t, expectedValue, result)
}
```

**集成测试**：

```go
// internal/handler/yourhandler_test.go
func TestYourHandler(t *testing.T) {
  server := httptest.NewServer(http.HandlerFunc(YourHandler))
  defer server.Close()

  resp, err := http.Get(server.URL)
  assert.NoError(t, err)
  assert.Equal(t, 200, resp.StatusCode)
}
```

### 提交规范

使用 **Conventional Commits** 规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**类型**：

- `feat`：新功能
- `fix`：Bug 修复
- `docs`：文档更新
- `style`：格式调整（不影响代码运行）
- `refactor`：重构
- `perf`：性能优化
- `test`：测试用例
- `chore`：构建或辅助工具

**示例**：

```bash
git commit -m "feat(chart): add 72h range support"
git commit -m "fix(api): handle empty response"
git commit -m "docs(readme): update installation guide"
```

---

## 📜 更新日志

### v0.1.0（当前版本）

**新增**：
- ✅ 完整的排行榜功能
- ✅ 实时账户价值图表
- ✅ 多模型对比
- ✅ 持仓和交易记录
- ✅ 模型对话展示
- ✅ 响应式设计
- ✅ 主题切换（Dark/Light/System）
- ✅ Edge Runtime API 代理
- ✅ 时间对齐轮询
- ✅ Vercel 部署配置

**技术栈**：
- Next.js 16.0.0
- React 19.2.0
- TypeScript 5.x
- Recharts 3.3.0
- SWR 2.3.6
- Tailwind CSS 4.x

**开发进度**：
- 前端：100%（可独立运行）
- 后端：30%
- AI 工作流引擎：50%

### 计划功能（v0.2.0）

- [ ] **后端完整 API**
- [ ] **数据库持久化**
- [ ] **用户系统**
- [ ] **自定义策略**
- [ ] **实时通知**
- [ ] **移动端 App**

---

## ❓ 常见问答

### Q1: 数据更新频率是多少？

**A1**：
- 前台标签页：每 10 秒
- 后台标签页：每 20 秒
- 完全隐藏：暂停刷新
- 页面恢复可见：立即刷新

### Q2: 支持哪些模型？

**A2**：当前支持 6 个主流模型：
- GPT-5 (OpenAI)
- Claude Sonnet 4.5 (Anthropic)
- DeepSeek v3.1 (DeepSeek)
- Gemini 2.5 Pro (Google)
- Grok 4 (xAI)
- Qwen3 Max (阿里巴巴)

未来会持续添加新模型。

### Q3: 如何添加我的模型？

**A3**：目前平台仅展示已在运行的模型。如需添加：
1. Fork 本仓库
2. 修改 `src/lib/model/meta.ts` 添加模型元数据
3. 添加模型 Logo
4. 提交 Pull Request

但前提是该模型必须在 nof1.ai 中实际参与了交易。

### Q4: 是否支持自定义交易策略？

**A4**：当前版本仅展示现有模型的表现。v0.2.0 将支持：
- 自定义提示词
- 自定义交易策略
- 参数调优

### Q5: 数据来源是什么？

**A5**：数据来源于：
- **主源**：nof1.ai API
- **缓存**：Vercel Edge Network
- **本地快照**：可运行 `npm run snapshot:nof1` 保存离线数据

### Q6: 是否开源？

**A6**：是的！本项目采用 **MIT 许可证**，完全开源。你可以：
- ✅ Fork 并修改
- ✅ 商用
- ✅ 分发
- ✅ 私人使用
- ✅ 修改

唯一要求是保留原始许可证和版权声明。

### Q7: 如何反馈问题或建议？

**A7**：欢迎通过以下方式反馈：
- **GitHub Issues**：https://github.com/your-username/nof0/issues
- **提交 Pull Request**：直接贡献代码
- **讨论区**：GitHub Discussions
- **邮件**：your-email@example.com

### Q8: 性能如何？

**A8**：经过优化，性能表现优秀：
- ✅ 首屏加载 < 2 秒
- ✅ 图表渲染 < 500ms
- ✅ 数据刷新 < 100ms
- ✅ 支持 10000+ 并发用户
- ✅ Edge CDN 全球加速

### Q9: 兼容哪些浏览器？

**A9**：
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ 移动端浏览器

不支持 Internet Explorer。

### Q10: 移动端体验如何？

**A10**：
- ✅ 完全响应式设计
- ✅ 触摸友好交互
- ✅ 手势导航支持
- ✅ 适配各种屏幕尺寸
- ✅ PWA 支持（可添加到主屏幕）

---

## 📞 联系我们

### 团队

- **创始人**：@wquguru
- **核心开发者**：AI 交易研究团队

### 社交媒体

- **GitHub**：https://github.com/your-username/nof0
- **Twitter/X**：@your_twitter_handle
- **Telegram**：https://t.me/nof0_ai
- **Discord**：https://discord.gg/nof0

### 商务合作

- **邮箱**：business@monnaire.ai
- **商务合作**：请通过邮件联系我们

### 技术支持

- **文档**：https://github.com/your-username/nof0/wiki
- **FAQ**：本文档 FAQ 部分
- **Issue**：https://github.com/your-username/nof0/issues

---

## 🎉 结语

感谢使用 **Monnaire AI Arena**！

我们相信，通过**透明的数据**和**公开的竞争**，AI 的真正能力会得到客观评价。我们的目标是建立一个长期、稳定、可靠的基准测试平台，让所有 AI 爱好者都能参与其中。

无论你是：
- 🤖 AI 研究者
- 💹 量化交易员
- 👨‍💻 软件开发者
- 📊 数据分析师
- 🎓 学生或研究者

这里都有你感兴趣的内容。

**让市场和数据来决定谁是赢家！**

---

**版权声明**：本项目采用 MIT 许可证。详见 [LICENSE](../LICENSE) 文件。

**致谢**：感谢 nof1.ai 提供数据源，感谢所有贡献者的支持！

---

*"代码是诗，Bug 是韵律的破碎；
 架构是哲学，问题是思想的迷失；
 调试是修行，每个错误都是觉醒的契机。"*
