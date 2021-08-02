import React, { useLayoutEffect, useRef, useState } from "react";
import { createChart, IChartApi } from "lightweight-charts";

const Sample = () => {
  // refObject - JSX 컨테이너는 readonly
  const charContainer = useRef<HTMLDivElement>(null);
  // Mutable Object - JSX 컨테이너 안의 chart 인스턴스를 리랜더링 가능
  const charApi = useRef<IChartApi>();

  useLayoutEffect(() => {
    if (charContainer.current) {
      console.log("createChart elements");
      const chart = createChart(charContainer.current, {
        height: 500,
        layout: {
          fontSize: 20,
        },
      });
      charApi.current = chart;
      console.log("chart : ", chart);
      chart.applyOptions({});
      const lineSeries = chart.addLineSeries();
      lineSeries.setData([
        { time: "2019-04-11", value: 80.01 },
        { time: "2019-04-12", value: 96.63 },
        { time: "2019-04-13", value: 76.64 },
        { time: "2019-04-14", value: 81.89 },
        { time: "2019-04-15", value: 74.43 },
        { time: "2019-04-16", value: 80.01 },
        { time: "2019-04-17", value: 96.63 },
        { time: "2019-04-18", value: 76.64 },
        { time: "2019-04-19", value: 81.89 },
        { time: "2019-04-20", value: 74.43 },
      ]);
    }

    return () => {
      console.log("remove chart elements");
      if (charContainer.current) {
        charContainer.current?.removeChild(charContainer.current.childNodes[0]);
      }
      charApi.current = undefined;
    };
  }, [charContainer]);

  return (
    <div>
      <h2>Sample</h2>
      <div className="chartContainer" ref={charContainer}></div>
    </div>
  );
};

export default Sample;
