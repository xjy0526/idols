# 你更想成为谁

一个纯静态的韩国女 idol 成为型测试项目。

它不做业务能力排名，而是用舞台、镜头、声线、性格和偶像叙事，测你更想拥有哪一种气质:

- 明亮公主感，镜头一给就有主角光
- 冷感大女主，舞台压迫感很强
- 声线、作品和长期陪伴型吸引
- 亲近、元气、团队氛围和综艺生命力
- 时尚品牌感、神图体质和 solo 主角感

当前内置 24 个成为画像:

- Wonyoung 장원영 张元英
- Karina 카리나 柳智敏
- Jennie 제니 金珍妮
- Jisoo 지수 金智秀
- Rosé 로제 朴彩英
- IU 아이유 李知恩
- HyunA 현아 金泫雅
- Mina ミナ 名井南
- Lisa 리사 莉莎
- Taeyeon 태연 金泰妍
- Yoona 윤아 林允儿
- Gaeul 가을 金秋天
- Suzy 수지 裴秀智
- Sunmi 선미 李宣美
- Yujin 유진 安宥真
- Winter 윈터 金旼炡
- Jihyo 지효 朴志效
- Rei レイ 直井怜
- Liz 리즈 金志垣
- Chaewon 채원 金采源
- Sana サナ 凑崎纱夏
- Nayeon 나연 林娜琏
- Momo モモ 平井桃
- Tzuyu 쯔위 周子瑜

## 维度设计

测试一共 12 个维度，分成 6 组:

- 视觉偏好: 甜感亮度 / 冷感气场
- 舞台吸引: 舞台爆发 / 舞蹈张力
- 音乐取向: 声线质感 / 作品叙事
- 镜头审美: 时尚品牌感 / 镜头表现力
- 性格氛围: 亲近感 / 团队感
- 偶像叙事: Solo 主角感 / 经典滤镜

每个维度 2 道题，总共 24 题。测试页侧面会从 72 张韩国女 idol 图片入口里随机抽图，并展示该明星成就小字。

## 评分方式

每道题的 3 个选项分别对应 1 / 2 / 3 分。每个维度两道题取平均分:

- 平均分 < 1.75: L
- 平均分 < 2.5: M
- 平均分 >= 2.5: H

最终会得到一个 12 维 H/M/L 字符串，再和 24 个 idol 成为画像做距离匹配。结果只代表你的成为型画像，不代表现实排名。

## 本地运行

这是一个纯静态站点，不需要构建。

```bash
cd web
python3 -m http.server 8000
```

打开:

```text
http://127.0.0.1:8000
```

测试页:

```text
http://127.0.0.1:8000/quiz.html
```

## 项目结构

- [`web/index.html`](web/index.html): 首页
- [`web/quiz.html`](web/quiz.html): 答题页
- [`web/quiz-core.mjs`](web/quiz-core.mjs): 通用匹配引擎
- [`web/data/idol-data.mjs`](web/data/idol-data.mjs): 维度、题库、结果和图库数据
- [`web/quiz-core.test.mjs`](web/quiz-core.test.mjs): 核心逻辑测试

## 测试

```bash
node --test web/quiz-core.test.mjs
```

## 部署

`web/` 目录可以直接部署到任何静态托管:

- Cloudflare Pages
- Vercel
- Netlify

发布目录设为 `web/` 即可。
