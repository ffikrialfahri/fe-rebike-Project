import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function ChartComponent({ type, data, options }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(myChartRef, {
      type: type,
      data: data,
      options: options,
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [type, data, options]);

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[350px]">
      <canvas ref={chartRef} />
    </div>
  );
}
