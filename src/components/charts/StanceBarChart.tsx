"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface StanceItem {
  label: string;
  percentage: number;
}

interface Props {
  data: StanceItem[];
}

export default function StanceBarChart({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const instance = useRef<any>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (!instance.current) {
      instance.current = echarts.init(ref.current, undefined, { renderer: "canvas" });
    }

    const labels = data.map((d) => d.label);
    const values = data.map((d) => d.percentage);

    instance.current.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: (p: any) => `${p[0].name}: ${p[0].value}%`,
      },
      grid: {
        left: "3%",
        right: "12%",
        bottom: "3%",
        top: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
        max: 100,
        axisLabel: { formatter: "{value}%" },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: "#f1f5f9" } },
      },
      yAxis: {
        type: "category",
        data: labels,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { fontSize: 12 },
      },
      series: [
        {
          type: "bar",
          data: values.map((v) => ({
            value: v,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: "#93c5fd" },
                { offset: 1, color: "#3b82f6" },
              ]),
              borderRadius: [0, 6, 6, 0],
            },
          })),
          barWidth: 14,
          label: {
            show: true,
            position: "right",
            formatter: "{c}%",
            fontSize: 11,
          },
        },
      ],
    });

    const onResize = () => instance.current?.resize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [data]);

  return <div ref={ref} className="w-full h-[150px]" />;
}
