# VLA 中文文献汇报与选题核查

更新于2026-10-22：22篇论文，按六类问题组织。25页主讲约25分钟，附6页参考文献，每页有中文讲稿。新增8篇为原始摘要级定位，全文及代码细节待核。

- [导师汇报](https://babe153.github.io/vla-weekend-report/)：RT-2、OpenVLA、π₀主线，补充OFT、评测、最近邻及选题判断。
- [22篇分组速读](https://babe153.github.io/vla-weekend-report/reading/)：110条五行笔记、中文对比表、六类筛选、搜索及本地已读进度。
- [逐页讲稿](https://babe153.github.io/vla-weekend-report/?notes=1)；也可下载 `speaker-notes.md`。
- [English report](https://babe153.github.io/vla-weekend-report/en/) · [English reading handbook](https://babe153.github.io/vla-weekend-report/en/reading/) · [English speaker notes](https://babe153.github.io/vla-weekend-report/en/?notes=1)。两种语言顶部均有切换入口，保留当前幻灯片／论文锚点及讲稿模式；速读进度共用当前浏览器存储。

## 分组

A 通用策略6篇；B 数据基础1篇；C 动作与适配5篇；D 评测2篇；E 阶段与训练资源4篇；F 鲁棒训练与诊断4篇。

保留原01–14编号和已读进度，15–22为新增论文。新增Long-VLA、EGR、FrameSkip、PHASER、STRONG-VLA、MAIL-Bench / MINT、View Collapse、CARE。

当前判断：阶段定向视觉增强与前人存在明显交集，创新性未确认。文献事实、阅读判断和拟议实验分开说明，未声称复现或取得新结果。新增文献身份与阅读深度见笔记来源说明。

## 使用与手机布局

桌面支持逐页演示、方向键、全屏、目录、讲稿和连续阅读；手机自动连续阅读，表格按项展示，按钮适配触控。速读页支持主题跳转、筛选、搜索、折叠笔记及打印；已读进度仅保存当前浏览器。

## 编辑与构建

- `content.js`：幻灯片、逐页讲稿及完整书目。
- `reading/notes.md`：22篇笔记的Markdown内容来源。
- `reading/catalog.json`：主题分组配置与新增论文结构化来源。
- `scripts/build-reading.mjs`：生成静态速读HTML。
- `app.js`、`styles.css`：演示交互与布局。
- `reading/reading.js`、`reading/reading.css`：速读交互与布局。
- `en/content.js`、`en/reading/notes.md`：完整英文正文与笔记来源；`en/reading/catalog.json` 为英文分组标签。
- `scripts/build-english.mjs`、`scripts/build-reading-en.mjs`：生成英文讲稿、静态速读页面及部署目录。
- `language.js`：中英文原生链接及阅读位置保留；两版共用布局和交互脚本。

无需安装依赖，Node22或更新版本：

```sh
node scripts/prepare.mjs
node scripts/check.mjs
python -m http.server 8765 --bind 127.0.0.1
```

构建生成 `speaker-notes.md`、`reading/index.html` 和 `dist/`。请修改内容源，不只修改生成文件。推送main后，GitHub Actions检查并发布到原GitHub Pages。

## 来源与版权

所有原文链接在逐页来源、笔记和末尾书目。原14篇固定PDF版本和页码保留；新增8篇于2026-10-22核对原始摘要。不同任务、硬件和指标的成功率不直接排名。

论文和原图版权归原作者，图片来源记录于 `assets/sources.json`。离线渲染不依赖外部脚本或字体；访问原论文需网络。Markdown解析器为Marked17.0.5，MIT许可证见 `scripts/vendor/marked-LICENSE.md`。
