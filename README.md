# VLA 中文文献汇报

面向导师周末汇报的 HTML 演示，共 21 页，主体约 20 分钟。重点为 RT-2、OpenVLA 与 π₀，附八篇论文、方法对比、能力边界、候选研究方向及每页中文讲稿。

## 查看

- 新增 **[14篇论文中文速读手册](https://babe153.github.io/vla-weekend-report/reading/)**：五行笔记、中文对比、论文关系与易混点。支持手机逐项对比、关键词搜索、角色筛选、折叠阅读及浏览器本地已读进度。
- `reading/notes.md` 是速读手册的内容来源；构建时生成静态 HTML，无需浏览器请求 Markdown 或第三方脚本。

- 桌面默认逐页演示，方向键翻页。支持全屏、目录、讲稿与连续阅读切换。
- 手机自动使用连续阅读，表格改为逐项展示。点击原论文方法图可以放大。
- `?notes=1` 打开纯讲稿阅读版，可通过浏览器打印为讲稿 PDF。
- `speaker-notes.md` 为独立逐页讲稿，可直接下载或编辑。
- 下载仓库后可直接打开 `index.html`，无需联网加载字体、脚本或图片。外部论文链接需要网络。
- 浏览器“打印”可导出演示 PDF。交互图像放大、导航不进入打印内容。

## 编辑

- `reading/notes.md`：14篇论文的五行笔记、证据图表页码与版本来源。
- `scripts/build-reading.mjs`：将 Markdown 构建为 `reading/index.html`，并发布到 `dist/reading/`。
- `reading/reading.css`、`reading/reading.js`：速读手册的手机布局和本地阅读交互。
- `scripts/vendor/marked.mjs`：固定版本 Marked 17.0.5；许可证见同目录 `marked-LICENSE.md`。

- `content.js`：幻灯片正文、讲稿和书目信息。
- `styles.css`：桌面、手机及打印样式。
- `app.js`：渲染、导航、图像放大及讲稿模式。
- `assets/`：随页面一并提供的原论文图片。图号和原始地址记录于 `assets/sources.json`。

无需 npm 包，也无需安装依赖。使用 Node 22 或更新版本：

```sh
node scripts/prepare.mjs
node scripts/check.mjs
```

第一条命令根据 `content.js` 生成独立讲稿并准备 `dist/`。不要只修改生成的 `speaker-notes.md`，下次构建会覆盖它。

本地 HTTP 预览：

```sh
python -m http.server 8765 --bind 127.0.0.1
```

快捷键：左右方向键翻页，`N` 切换讲稿，`R` 切换连续阅读，`O` 打开目录，`F` 切换全屏。

## 自动部署

`.github/workflows/pages.yml` 在推送 `main` 后检查内容、生成静态文件，再通过 GitHub Actions 发布到 GitHub Pages。仓库 Pages 发布来源应设为 **GitHub Actions**。也可以在 Actions 页面手动运行工作流。

## 内容与来源

清单按代表性与阅读逻辑选择，主要覆盖 2023–2025 年首发论文，不是 2026 年最新模型排名。年份按首次预印本发布计算。π₀ 的方法和公式核对版本为 arXiv v4（2026-01-08）。整理日期：2026-10-19。

论文结论、阅读判断与拟议实验在正文及讲稿中分别标明。未声称完成复现或提出经检索确认的新方法。不同论文的训练数据、硬件与评测不同，未将跨论文成功率直接排名。

论文及原图版权归原作者所有。图片仅用于学术解读，并在对应页面注明来源。请在再次使用时保留引用。完整八篇书目位于汇报末页及独立讲稿末尾。
