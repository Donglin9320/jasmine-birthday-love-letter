# 给 Jasmine 的生日互动情书

这是一个可以直接打开的静态网页。入口文件是 `index.html`。

## 替换回忆照片

每个 Chapter 都有一个独立文件夹。当前网页已经读取你上传的这些照片文件：

- Chapter 01 我们初次约会：`assets/images/chapter-01-first-date/`
  - `IMG_20260403_141902.jpg`
  - `IMG_20260403_180827.jpg`
- Chapter 02 我们的第一次踏青：`assets/images/chapter-02-spring-outing/`
  - `IMG_20260405_215114.jpg`
  - `微信图片_20260405235208_1596_2642.jpg`
- Chapter 03 Granville Island 的回忆：`assets/images/chapter-03-granville-island/`
  - `IMG_20260502_161840.jpg`
  - `mmexport1777795928239.jpg`
- Chapter 04 Charlie Puth 演唱会：`assets/images/chapter-04-charlie-puth/`
  - `mmexport1778054574406.jpg`
  - `mmexport1778054580804.jpg`
- Chapter 05 5.20 当天的回忆：`assets/images/chapter-05-520/`
  - `mmexport1779337240245.jpg`
  - `mmexport1779337263909.jpg`

每个回忆节点会显示两张照片。如果之后替换成新文件名，打开 `script.js`，更新对应 chapter 的 `src` 路径即可。

## 添加背景音乐

页面已经内置一首为 Jasmine 回忆录创作的轻柔钢琴曲：`assets/music/jasmine-memory-piano.wav`。这首曲子约 72 秒，F 大调，慢速 72 BPM，带轻微混响，会循环播放。

如果想换成自己的音乐，把音乐文件放到 `assets/music/`，命名为 `birthday-music.mp3`，并在 `index.html` 里调整 `<audio>` 的 source 顺序。右下角按钮可以开关音乐。

## 微信分享

项目已经添加微信/社交分享用的标题、描述和封面图：

- 分享标题：`致 Jasmine，请亲启`
- 分享封面：`assets/images/wechat-share-cover.jpg`
- 分享压缩包：`jasmine-birthday-love-letter-share.zip`

微信不能直接分享本机的 `localhost` 给别人访问。要发给 Jasmine，需要把 `jasmine-birthday-love-letter-share.zip` 上传到支持静态网页的 HTTPS 服务，例如 Netlify、Vercel、GitHub Pages 或 Cloudflare Pages。上传后，把生成的 HTTPS 链接发到微信即可。
