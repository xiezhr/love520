# 520表白神器

一个浪漫的网页表白工具，帮助你向心爱的人表达爱意。

## 功能介绍

- **浪漫启动页**：显示相识天数和小时数，营造浪漫氛围
- **动态情书系统**：打字机效果展示情书内容，支持自定义内容
- **趣味互动游戏**：
  - 爱心捕捉：点击飘动的爱心获取分数
  - 记忆拼图：上传照片创建拼图游戏
- **时光相册墙**：上传和展示珍贵照片，支持本地存储
- **终极表白仪式**：生成爱情证书，烟花特效，礼物二维码展示

## 项目配置

### 基本配置

编辑 `js/config.js` 文件，可以自定义以下内容：

```javascript
const CONFIG = {
    // 初始相识日期（格式：年-月-日）
    firstMeetDate: '2023-05-20',
    
    // 收件人姓名
    recipientName: '未来的您',
    
    // 情书内容 - 可自定义多条消息
    loveLetters: [
        '从遇见你的那一刻起，我的世界就开始变得不一样。',
        // 可添加更多内容...
    ],
    
    // 爱情证书信息
    certificate: {
        lover1: '我的名字',
        lover2: '对方名字'
    },
    
    // 礼物二维码链接 - 可以是任何图片URL
    giftQRCodeUrl: '你的二维码图片URL',
    
    // 服务器端口
    serverPort: 3008
};
```

### 自定义音乐

在 `assets/music/` 目录下放置MP3音乐文件，并在 `config.js` 中更新音乐列表：

```javascript
musicList: [
    {
        title: '歌曲名称',
        artist: '歌手名',
        src: 'assets/music/你的音乐文件.mp3'
    }
]
```

### 自定义图片

- 爱心图片：替换 `assets/images/heart.png`
- 证书背景：替换 `assets/images/certificate-bg.jpg`
- 玫瑰图片：替换 `assets/images/rose.png`

## 部署方法

### 本地部署

1. **环境准备**：
   - 安装 [Node.js](https://nodejs.org/)（建议v14.0.0或更高版本）

2. **启动服务器**：

   **方法一**：使用Node.js直接启动
   ```bash
   node server.js
   ```

   **方法二**：使用NPM启动
   ```bash
   npm start
   ```

   **方法三**：Windows用户可双击运行 `start.bat` 文件

3. **访问网站**：
   - 打开浏览器访问：http://localhost:3008

### 线上部署

1. **使用云服务器**：
   - 将整个项目上传到云服务器
   - 安装Node.js环境
   - 使用PM2等工具保持服务运行：
     ```bash
     npm install -g pm2
     pm2 start server.js --name "love520"
     ```

2. **使用Vercel/Netlify等静态网站托管**：
   - 注册[Vercel](https://vercel.com/)或[Netlify](https://www.netlify.com/)账号
   - 连接你的GitHub仓库或直接上传项目
   - 按照平台指引完成部署

3. **使用GitHub Pages**：
   
   - 创建GitHub仓库并上传项目
   - 在仓库设置中启用GitHub Pages
   - 注意：需要修改服务器逻辑，改为纯静态网站

## 注意事项

- 照片和数据保存在浏览器本地存储中，清除浏览器数据会导致数据丢失
- 音乐自动播放可能受到浏览器策略限制，需要用户交互后才能播放
- 为获得最佳体验，建议使用Chrome、Edge或Firefox最新版本浏览器