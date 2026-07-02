"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import type { Locale } from "@/i18n/dictionary";

interface Props {
  positive: number;
  neutral: number;
  negative: number;
  locale: Locale;
}

export default function SentimentPieChart({
  positive,
  neutral,
  negative,
  locale,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const instance = useRef<any>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (!instance.current) {
      instance.current = echarts.init(ref.current, undefined, { renderer: "canvas" });
    }

    const labels =
      locale === "en"
        ? { pos: "Positive", neu: "Neutral", neg: "Negative" }
        : { pos: "正面", neu: "中性", neg: "负面" };

    instance.current.setOption({
      tooltip: {
        trigger: "item",
        formatter: (p: any) => `${p.name}: ${p.value}%`,
      },
      series: [
        {
          type: "pie",
          radius: ["42%", "68%"],
          center: ["50%", "50%"],
          avoidLabelOverlap: true,
          itemStyle: {
            borderRadius: 4,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            formatter: (p: any) => `${p.name}\n${p.value}%`,
            fontSize: 12,
            lineHeight: 16,
          },
          emphasis: {
            scale: false,
            label: { show: true, fontWeight: "bold" },
          },
          data: [
            {
              value: positive,
              name: labels.pos,
              itemStyle: { color: "#34d399" },
            },
            {
              value: neutral,
              name: labels.neu,
              itemStyle: { color: "#cbd5e1" },
            },
            {
              value: negative,
              name: labels.neg,
              itemStyle: { color: "#f87171" },
            },
          ],
        },
      ],
    });

    const onResize = () => instance.current?.resize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [positive, neutral, negative, locale]);

  return <div ref={ref} className="w-full h-[220px]" />;
}
