 export interface Topic {
   id: number;
   title: string;
   titleZh: string;
   summary: string;
   summaryZh: string;
   tags: string[];
   date: string;
 }
 
 export const topics: Topic[] = [
   {
     id: 1,
     title: "Apple Intelligence Goes Public",
     titleZh: "Apple Intelligence 正式上线",
     summary: "Apple rolls out its on-device AI suite with privacy-first LLM inference, integrated across iOS, iPadOS, and macOS. A significant shift in consumer AI distribution.",
     summaryZh: "Apple 正式推出设备端 AI 套件，以隐私优先的大模型推理为核心，覆盖 iOS、iPadOS 与 macOS，标志着消费级 AI 分发模式的重大转变。",
     tags: ["Apple", "On-Device AI", "Privacy"],
     date: "2026-06-28",
   },
   {
     id: 2,
     title: "GPT-5 Agent API Reaches General Availability",
     titleZh: "GPT-5 Agent API 正式开放商用",
     summary: "OpenAI's agentic API enters GA, enabling developers to deploy autonomous multi-step reasoning agents with tool use, memory, and safety guardrails.",
     summaryZh: "OpenAI 的 Agent API 进入正式商用阶段，开发者可部署具备工具调用、记忆能力和安全护栏的自主多步推理智能体。",
     tags: ["OpenAI", "Agent", "API"],
     date: "2026-06-25",
   },
   {
     id: 3,
     title: "EU AI Act Enforcement Begins",
     titleZh: "欧盟 AI 法案正式生效",
     summary: "The first wave of EU AI Act regulations comes into effect, requiring transparency and risk management for high-risk AI systems across all member states.",
     summaryZh: "欧盟 AI 法案首批监管条款正式实施，要求所有成员国对高风险 AI 系统进行透明度与风险管理。",
     tags: ["Regulation", "EU", "Compliance"],
     date: "2026-06-20",
   },
   {
     id: 4,
     title: "Multimodal Models Hit New Benchmark Highs",
     titleZh: "多模态模型刷新多项基准纪录",
     summary: "Google Gemini 3.0 and Anthropic Claude 4 achieve state-of-the-art results across vision, audio, and reasoning benchmarks, blurring the line between modalities.",
     summaryZh: "Google Gemini 3.0 与 Anthropic Claude 4 在视觉、音频与推理基准测试中均取得最佳结果，模态之间的边界日益模糊。",
     tags: ["Multimodal", "Benchmark", "Gemini", "Claude"],
     date: "2026-06-18",
   },
 ];
