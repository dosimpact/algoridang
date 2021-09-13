import React, { useLayoutEffect, useRef, useCallback } from 'react';
import { createChart, IChartApi } from 'lightweight-charts';

const SampleMarker = () => {
  // refObject - JSX 컨테이너는 readonly ( usecallback에 의해 )
  const charContainer = useRef<HTMLDivElement>();
  // Mutable Object - JSX 컨테이너 안의 chart 인스턴스를 리랜더링 가능
  const charApi = useRef<IChartApi>();
  // resize Observer
  // useRef을 사용하여 observer변수를 참조하자.
  const resizeObserver = useRef(
    new ResizeObserver((entries, observer) => {
      // 관찰대상(chart container) 가 있다면
      if (entries && entries[0]) {
        const width = entries[0].contentRect.width;
        // 참조대상(차트 인스턴스) 가 있다면
        if (charApi.current) {
          // width를 동기화 하자.
          charApi.current.applyOptions({ width });
        }
      }
    }),
  );
  // chart 컨테이너를 참조하는 함수
  const handleContainerRef = useCallback((node) => {
    if (node) {
      // 컨테이터 요소 참조
      charContainer.current = node;
      // 리사이즈 구독
      resizeObserver.current.observe(node);
    }
  }, []);

  useLayoutEffect(() => {
    if (charContainer.current) {
      //   console.log("createChart elements");
      const chart = createChart(charContainer.current, {
        height: 500,
        layout: {
          fontSize: 20,
        },
      });
      charApi.current = chart;
      const lineSeries = chart.addLineSeries();
      // 가격 데이터 설정
      lineSeries.setData([
        { time: '2019-04-11', value: 80.01 },
        { time: '2019-04-12', value: 96.63 },
        { time: '2019-04-13', value: 76.64 },
        { time: '2019-04-14', value: 81.89 },
        { time: '2019-04-15', value: 74.43 },
        { time: '2019-04-16', value: 80.01 },
        { time: '2019-04-17', value: 96.63 },
        { time: '2019-04-18', value: 76.64 },
        { time: '2019-04-19', value: 81.89 },
        { time: '2019-04-20', value: 74.43 },
      ]);
      // 마커 데이터 설정
      lineSeries.setMarkers([
        {
          id: 'id1',
          time: '2019-04-12',
          position: 'aboveBar',
          color: '#2196F3',
          shape: 'arrowDown',
          text: 'Buy',
        },
        {
          id: 'id2',
          time: '2019-04-16',
          position: 'belowBar',
          color: '#e91e63',
          shape: 'arrowUp',
          text: 'Sell',
        },
        {
          id: 'id3',
          time: '2019-04-19',
          position: 'belowBar',
          color: 'orange',
          shape: 'circle',
          text: 'example',
          size: 1,
        },
      ]);
      chart.subscribeCrosshairMove((param) => {
        console.log(param.hoveredMarkerId);
      });

      chart.subscribeClick((param) => {
        console.log(param);
        console.log(param.hoveredMarkerId);
      });
    }

    return () => {
      // 컴포넌트가 unmount 되면 차트DOM 제거
      if (charContainer.current) {
        charContainer.current?.removeChild(charContainer.current.childNodes[0]);
      }
      // 컴포넌트가 unmount 되면 차트 Ref 제거
      charApi.current = undefined;
    };
  }, [charContainer]);

  return (
    <div>
      <h2>SampleMarker</h2>
      <div
        className="chartContainer"
        ref={(node) => handleContainerRef(node)}
      ></div>
    </div>
  );
};

export default SampleMarker;
