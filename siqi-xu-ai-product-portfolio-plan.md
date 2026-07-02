# Siqi Xu — AI Product Portfolio

## 项目定位

这是一个双语个人作品集与热点分析站点，左侧用于展示个人身份、技能与履历，右侧用于展示每日热点议题的情绪、立场与分布分析。[cite:33][cite:53][cite:55][cite:65]
站点需要同时服务中国香港、中国内地和海外访客，因此语言切换、静态化数据输出、自定义域名和双区域可访问部署应从第一版就纳入设计。[cite:66][cite:67]

## 信息架构图

```text
Siqi Xu — AI Product Portfolio
├── Global Shell
│   ├── Header
│   │   ├── Logo / Site Title
│   │   ├── Language Switch (中文 / EN)
│   │   ├── Theme Toggle
│   │   └── Region-safe external links
│   └── Footer
│       ├── Copyright / Last updated
│       ├── Data disclaimer
│       └── Contact links
│
├── Left Panel: Profile / Resume
│   ├── Compact Card (default)
│   │   ├── Photo
│   │   ├── Name
│   │   ├── Title / Tagline
│   │   ├── Email / Location
│   │   ├── Education
│   │   ├── Skill tags
│   │   └── CTA: Expand Resume
│   │
│   └── Expanded Resume Drawer
│       ├── About
│       ├── Education
│       ├── Experience / Internships
│       ├── Projects
│       ├── Research Interests
│       ├── Skills & Tools
│       └── Download CV / Contact
│
└── Right Panel: Topic Lab
    ├── Intro State
    │   ├── Project description
    │   ├── What this lab analyzes
    │   └── Select today's topic
    │
    ├── Topic Overview
    │   ├── Date / last refresh time
    │   ├── Trending topics list
    │   ├── Short AI summary
    │   └── Dataset size / source note
    │
    └── Topic Detail View
        ├── Topic summary card
        ├── Sentiment pie chart
        ├── Stance distribution chart
        ├── Region heatmap or source map
        ├── Keyword clusters
        ├── Representative comments
        ├── Evidence & explanation panel
        └── Methodology / disclaimer
```

## 页面模块说明

### 1. 全局壳层
- 顶部保留站点标题 `Siqi Xu — AI Product Portfolio`，右上角放语言切换与深浅色模式切换。[cite:66]
- 所有中英文文案、图表标题、免责声明、日期格式均由统一 i18n 配置控制，避免散落在组件内部。[cite:78]

### 2. 左侧个人区
- 默认是窄栏卡片，优先展示姓名、照片、标签、邮箱、学校、求职方向和技能关键词，确保招聘方 5 秒内读懂身份信息。[cite:33]
- 点击或拖拽后展开为履历抽屉，展示教育、经历、项目、研究兴趣、技能矩阵和简历下载入口。[cite:33]

### 3. 右侧热点分析区
- 首屏先显示项目介绍和“今日热点”列表，再让访客选择某个话题查看详细分析，这比默认直接塞满图表更清晰。[cite:55][cite:65]
- 详情页的重点不只是图表，还要有摘要、争议点、代表语句和方法说明，避免成为单纯的数据看板。[cite:55][cite:61]

## 中英文文案框架

### 站点级文案

| 模块 | 中文 | English |
|---|---|---|
| 站点标题 | Siqi Xu — AI产品作品集 | Siqi Xu — AI Product Portfolio |
| 副标题 | 面向中文互联网场景的AI产品与语义分析作品集 | Portfolio of AI product work for Chinese-language internet scenarios |
| 首页介绍 | 这个站点结合了我的个人履历与每日热点分析实验，用产品化方式展示我在NLP、内容理解与数据可视化方面的能力。 | This site combines my profile with a daily topic analysis lab to showcase my work in NLP, content understanding, and data visualization. |
| 免责声明 | 本页面中的热点分析结果为实验性AI输出，仅用于研究、展示与产品原型演示。 | The topic analysis shown here is experimental AI output for research, portfolio, and product prototyping purposes only. |

### 左侧个人区文案

| 模块 | 中文 | English |
|---|---|---|
| 姓名下标签 | AI产品 / NLP / 内容理解 | AI Product / NLP / Content Understanding |
| 自我介绍 | 我关注中文语义理解、内容审核、用户反馈分析，以及如何把模型能力转化为可用的产品体验。 | Interested in Chinese semantic understanding, content moderation, user feedback analysis, and turning model capability into usable product experiences. |
| 展开按钮 | 查看完整履历 | View Full Resume |
| 教育 | 教育背景 | Education |
| 经历 | 实习/经历 | Experience |
| 项目 | 项目经历 | Projects |
| 技能 | 技能与工具 | Skills & Tools |
| 研究兴趣 | 研究兴趣 | Research Interests |
| 联系方式 | 联系我 | Contact |

### 右侧热点分析区文案

| 模块 | 中文 | English |
|---|---|---|
| 区域标题 | 今日热点观察 | Today’s Topic Lab |
| 列表标题 | 今日可选热点 | Topics Available Today |
| 更新时间 | 更新时间 | Last Updated |
| 数据来源 | 数据来源说明 | Data Source Note |
| 摘要标题 | 话题摘要 | Topic Summary |
| 情绪图 | 情绪分布 | Sentiment Distribution |
| 立场图 | 立场分布 | Stance Breakdown |
| 地区图 | 地区热力图 | Regional Heatmap |
| 关键词 | 高频关键词 | Key Terms |
| 代表评论 | 代表性言论 | Representative Comments |
| 方法说明 | 方法与局限 | Method & Limitations |

## 内容策略建议

### 中文版
- 偏向内地与香港求职语境，强调教育背景、项目产出、技术栈、求职方向和“可落地”能力。[cite:33]
- 右侧热点分析描述可更具体，如“情绪”“立场”“争议点”“样本来源”等。

### 英文版
- 偏向国际化与简洁表达，减少冗长叙述，突出 impact、scope、method、tooling。
- 避免逐句硬翻，可以把中文简历内容改写成更自然的英文 resume style。

## 部署结构图

```text
                         +-----------------------+
                         |   Git Repository      |
                         |  (code + locales +    |
                         |   static JSON schema) |
                         +-----------+-----------+
                                     |
                           push / scheduled build
                                     |
                +--------------------+--------------------+
                |                                         |
                v                                         v
      +---------------------+                 +--------------------------+
      | Build / Analyze Job |                 | Scheduled Data Pipeline  |
      | Next.js/Astro build |                 | Python crawler + DeepSeek|
      +----------+----------+                 +------------+-------------+
                 |                                           |
                 | reads latest JSON                         | outputs daily-hotspots.json
                 +---------------------------+---------------+
                                             |
                                             v
                                 +--------------------------+
                                 | Static data artifacts    |
                                 | /data/daily-hotspots.json|
                                 +------------+-------------+
                                              |
                        +---------------------+----------------------+
                        |                                            |
                        v                                            v
             +-------------------------+                  +--------------------------+
             | International Deploy    |                  | China-optimized Deploy   |
             | Vercel + custom domain  |                  | 21YunBox / OSS + CDN     |
             | www.siqixu.com          |                  | cn.siqixu.com            |
             +------------+------------+                  +------------+-------------+
                          |                                            |
                          +----------------+---------------------------+
                                           |
                                           v
                               +--------------------------+
                               | End users                |
                               | Hong Kong / Global / CN  |
                               +--------------------------+
```

## 部署建议

- 国际主站建议使用 Vercel + 自定义域名，适合香港和海外访问，但 `.vercel.app` 在中国内地可能不稳定，因此应使用自定义域名。[cite:66]
- 中国内地访问建议增加镜像或中国优化静态托管，例如 21YunBox 或等价的中国优化静态托管/CDN 方案，以改善加载稳定性。[cite:67]
- 关键资源如字体、头像、图表脚本、热点 JSON 建议尽量静态化并自托管，减少对不稳定第三方资源的依赖。[cite:66]

## 技术实现建议

### 前端
- 推荐 Next.js 静态输出或 Astro，便于做双语路由、静态 JSON 渲染和组件化开发。[cite:78]
- 图表建议用 ECharts，适合饼图、词云、地图和趋势图，也更贴合中国互联网开发生态。

### 数据层
- 每日热点分析结果由 Python 定时脚本抓取并清洗，再调用 DeepSeek 输出摘要、情绪、立场和关键词。[cite:55][cite:65]
- 将分析结果存成结构化 JSON，前端只负责读取和展示，避免浏览器直接请求复杂接口。[cite:55]

### 国际化
- 采用 `/zh` 与 `/en` 路由，或基于 locale 的静态构建输出。
- 所有 UI 文案统一放在 `locales/zh.json` 与 `locales/en.json` 中。

## 数据结构建议

```json
{
  "date": "2026-06-30",
  "updated_at": "2026-06-30T08:00:00Z",
  "topics": [
    {
      "id": "topic-001",
      "title_zh": "某热点话题",
      "title_en": "Topic Title",
      "summary_zh": "一句话摘要",
      "summary_en": "One-line summary",
      "sentiment": {
        "positive": 0.22,
        "neutral": 0.31,
        "negative": 0.47
      },
      "stances": [
        {"label_zh": "支持", "label_en": "Support", "ratio": 0.28},
        {"label_zh": "反对", "label_en": "Oppose", "ratio": 0.52},
        {"label_zh": "观望", "label_en": "Neutral", "ratio": 0.20}
      ],
      "regions": [
        {"name": "广东", "value": 18},
        {"name": "北京", "value": 13}
      ],
      "keywords_zh": ["关键词1", "关键词2"],
      "keywords_en": ["keyword1", "keyword2"],
      "evidence": [
        {
          "text_zh": "代表性言论样本",
          "text_en": "Representative sample comment",
          "stance": "oppose",
          "sentiment": "negative"
        }
      ],
      "source_note_zh": "数据来自公开可访问来源",
      "source_note_en": "Data comes from publicly accessible sources"
    }
  ]
}
```

## Codex 开发提示词

### 提示词 1：网站骨架

```text
Build a bilingual personal portfolio website named “Siqi Xu — AI Product Portfolio”.

Requirements:
- Single-page responsive layout with two main panels.
- Left panel shows compact profile info by default: photo, name, email, location, education, skills, short tagline.
- Left panel can expand to reveal full resume sections: about, education, experience, projects, skills, research interests, contact.
- Right panel is a “Today’s Topic Lab” dashboard showing daily trending topics and analysis cards.
- Add Chinese and English language switcher.
- Add dark/light mode toggle.
- Use clean professional design, not flashy AI gradient style.
- Ensure mobile responsive behavior.
- Use static sample JSON data first.
- Use semantic HTML, accessible keyboard interactions, and clear component structure.
```

### 提示词 2：国际化

```text
Refactor this portfolio site to support bilingual content with zh and en locales.

Requirements:
- Extract all text strings into locale JSON files.
- Support /zh and /en routes or equivalent locale state.
- Language switch must update all left-panel resume content and right-panel chart labels.
- Chinese copy should feel natural for Mainland China and Hong Kong job applications.
- English copy should read like a professional international portfolio, not literal translation.
- Include translated labels for navigation, cards, chart titles, buttons, disclaimer, and footer.
```

### 提示词 3：热点分析模块

```text
Create a topic analysis dashboard for the right panel of the portfolio site.

Requirements:
- Load data from a static JSON file named daily-hotspots.json.
- Show a list of today’s topics.
- When a topic is selected, render:
  1. topic summary card
  2. sentiment pie chart
  3. stance bar or donut chart
  4. regional heatmap (or fallback source distribution chart)
  5. keyword chips
  6. representative comments
  7. methodology and disclaimer block
- Use ECharts for charts.
- Provide good empty states and loading states.
- Make chart titles bilingual.
```

### 提示词 4：Python 数据管道

```text
Create a Python pipeline that generates daily-hotspots.json for a bilingual AI topic analysis portfolio.

Requirements:
- Fetch publicly accessible trending topics from configurable sources.
- Clean and deduplicate text data.
- Call DeepSeek API to produce:
  - Chinese and English topic summaries
  - sentiment ratios
  - stance labels and ratios
  - keyword extraction
  - representative evidence samples
- Output a stable JSON schema that the frontend can render directly.
- Include error handling, retry logic, and a fallback mode that uses previous cached data if fresh collection fails.
- Save outputs to /data/daily-hotspots.json.
```

### 提示词 5：部署与区域兼容

```text
Prepare this bilingual static portfolio project for dual-region deployment.

Requirements:
- Optimize for Vercel deployment with a custom domain for international users.
- Ensure assets are self-hosted where possible.
- Avoid dependencies that may fail in Mainland China.
- Generate a static export build suitable for mirrored China deployment.
- Add a deployment README explaining:
  - international deployment steps
  - China-optimized mirror deployment steps
  - environment variables for DeepSeek API
  - scheduled build / cron update workflow
```

## 开发顺序建议

1. 先完成静态页面骨架与视觉系统。
2. 再接入双语文案与语言切换。
3. 再用假数据完成右侧热点详情交互。
4. 再写 Python 抓取与 DeepSeek 分析脚本。
5. 最后接部署、定时更新和中国优化镜像。[cite:66][cite:67]

## 作品集表达建议

这个项目最终不应被表述成“个人主页”，而应被表述成“一个兼具个人履历展示与中文热点语义分析能力的双语 AI 产品作品集”。这种说法更贴近求职目标，也更能体现产品思维与工程落地能力。[cite:33][cite:61]
