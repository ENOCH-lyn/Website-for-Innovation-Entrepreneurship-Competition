## 项目简介

本项目是一个基于 vercel + Vue 3 + Vite + Tailwind CSS 的无服务器架构网站，用于创新创业大赛的作品展示，包含前台页面和简单的后端 API（`api/*.mjs`）用于登录注册、统计信息等。~~其实是纯AI完成的，开源是因为方便修改与复用，后面估计也会改回私有~~

如果单纯改前端，可以不使用vercel环境。如果需要注册登录，API等，需依赖vercel环境

故项目提供两种启动方式

## 纯前端启动

在项目根目录执行：

```bash
npm install
```

然后运行

```bash
npm run dev
```

默认会通过 Vite 启动开发服务器，一般是 `http://localhost:5173`

注意，这种方式将无法使用注册登录，以及显示部分需要API获取的信息

## Vercel 本地启动

全局安装 Vercel CLI：

```bash
npm install -g vercel
```

安装项目依赖：

```bash
npm install
```

配置 `vercel.json`，部署时，示例配置如下：

```json
{
  "functions": {
    "api/**/*.mjs": {
      "runtime": "@vercel/node@3.0.20"
    }
  },
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    },
    {
      "source": "/:path*",
      "destination": "/"
    }
  ]
}
```

但是需要注意本地开发时，删除`rewrites`规则

> `api/*.mjs` 由 Vercel Functions 处理，前端是 SPA（Vue Router），需要将非 `/api/*` 的路径都重写到根 `/`，由前端路由来接管，但是本地开发不用管，而且规则比较简陋，本地跑不通

也就是 `vercel.json`改为

```
{
  "functions": {
    "api/**/*.mjs": {
      "runtime": "@vercel/node@3.0.20"
    }
  }
}
```

然后运行

```
vercel dev
```

## 部署到vercel

导入项目仓库，保存并部署

由于项目需要数据库，需在vercel中配置KV数据库的环境变量

`KV_REST_API_URL`，`KV_REST_API_TOKEN`

以及管理员密钥 `ADMIN_SECRET`

或者使用命令行

```bash
vercel
```

如需更新部署：

```bash
vercel --prod
```

## 管理员面板

直接访问`/admin`,输入管理员密钥即可
