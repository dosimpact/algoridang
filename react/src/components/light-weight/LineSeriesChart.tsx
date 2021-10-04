import React, { useLayoutEffect, useRef, useEffect, useCallback } from 'react';
import { createChart, IChartApi, ISeriesApi } from 'lightweight-charts';

export interface ILineData {
  time: string;
  value: number;
}
export interface IonCrossHairChange {
  price: number;
}
interface ILineSeriesChart {
  datas?: ILineData[];
  onCrossHairChange?: (e: IonCrossHairChange) => void;
}

// todo
// 리팩토링 : (1) 생성과 소멸 useEffect로 잘 했는가
// 데이터 set : (2) useEffect로 데이터를 셋팅을 ?
// 데이터 onChange 함수 : (3) 적절한 설계인가?
// React.memo 로 랜더링 최적화 하였는가?

const LineSeriesChart: React.FC<ILineSeriesChart> = ({
  datas,
  onCrossHairChange,
}) => {
  // onCrossHairChange = useMemo(() => onCrossHairChange, [onCrossHairChange]);
  // onCrossHairChange = useCallback(() => onCrossHairChange, []);

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

  // 그래프의 Area 시리즈 데이터를 참조
  // const lineSeries = useRef<ISeriesApi<"Line">>();
  const SeriesApiArea = useRef<ISeriesApi<'Area'>>();

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
      // const width = 600;
      // const height = 300;
      const chart = createChart(charContainer.current, {
        height: 400,
        layout: {
          fontSize: 11,
        },
        rightPriceScale: {
          visible: false,
        },
        leftPriceScale: {
          visible: false,
        },
        grid: {
          horzLines: {
            color: '#ebebeb',
          },
          vertLines: {
            color: '#ebebeb',
          },
        },
      });
      charApi.current = chart;
      SeriesApiArea.current = chart.addAreaSeries({
        lineColor: 'rgb(243, 188, 47)',
        topColor: 'rgb(243, 188, 47,0.5)',
        bottomColor: 'rgb(243, 188, 47,0)',
        lineWidth: 2,
      });
      if (datas) {
        SeriesApiArea.current?.setData(datas as ILineData[]);
      }
      // todo 쓰로틀링
      // update tooltip
      chart.subscribeCrosshairMove(function (param) {
        if (onCrossHairChange) {
          const price = param.seriesPrices.get(SeriesApiArea.current!);
          onCrossHairChange({ price: Number(price) });
        }
      });
    }

    return () => {
      // 컴포넌트가 unmount 되면 차트DOM 제거
      if (charContainer.current) {
        // console.log("will remove child!", charContainer.current.childNodes[0]);
        charContainer.current?.removeChild(charContainer.current.childNodes[0]);
      }
      // 컴포넌트가 unmount 되면 차트 Ref 제거
      charApi.current = undefined;
      // 컴포넌트가 unmount 되면 차트 DataSetter Ref 제거
      SeriesApiArea.current = undefined;
    };
  }, [charContainer, onCrossHairChange, datas]);

  const setLineData = (data?: ILineData[]) => {
    if (SeriesApiArea.current && data) {
      SeriesApiArea.current?.setData(data);
    }
  };

  useEffect(() => {
    setLineData(datas);
    return () => {};
  }, [datas]);

  return (
    <div
      className="chartContainer"
      ref={(node) => handleContainerRef(node)}
    ></div>
  );
};

export default LineSeriesChart;

// export default React.memo(LineSeriesChart, (prev, next) => {
// console.log(
//   "onCrossHairChange",
//   prev.onCrossHairChange === next.onCrossHairChange
// );
// console.log("datas", prev.datas === next.datas);

// 항상 존재, 컴포넌트가 소멸될때만 제거한다.
// return true;

// datas가 바뀌면 컴포넌트 자체를 리랜더링
// (인스턴스화)된 컴포넌트를 없앨 이유가 없음
// return prev.datas === next.datas;
// });
