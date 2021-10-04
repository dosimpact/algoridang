import React, { useLayoutEffect, useRef, useEffect, useCallback } from 'react';
import {
  createChart,
  IChartApi,
  ISeriesApi,
  SeriesMarker,
  Time,
} from 'lightweight-charts';

export interface ILineData {
  time: string;
  value: number;
}
export interface IonCrossHairChange {
  price: number;
}
export interface IonHoverMarker {
  markerId: string;
}
interface ILineSeriesChartPointing {
  datas?: ILineData[];
  markerDatas?: SeriesMarker<Time>[];
  onCrossHairChange?: (e: IonCrossHairChange) => void;
  onHoverMarker?: (e: IonHoverMarker) => void;
}

// todo
// 리팩토링 : (1) 생성과 소멸 useEffect로 잘 했는가
// 데이터 set : (2) useEffect로 데이터를 셋팅을 ?
// 데이터 onChange 함수 : (3) 적절한 설계인가?
// React.memo 로 랜더링 최적화 하였는가?

const LineSeriesChartPointing: React.FC<ILineSeriesChartPointing> = ({
  datas,
  markerDatas,
  onCrossHairChange,
  onHoverMarker,
}) => {
  // onCrossHairChange = useMemo(() => onCrossHairChange, [onCrossHairChange]);
  // onCrossHairChange = useCallback(() => onCrossHairChange, []);
  const charContainer = useRef<HTMLDivElement>();
  const charApi = useRef<IChartApi>();
  const resizeObserver = useRef(
    new ResizeObserver((entries, observer) => {
      if (entries && entries[0]) {
        // width를 동기화 하자.
        const width = entries[0].contentRect.width;
        if (charApi.current) {
          charApi.current.applyOptions({ width });
        }
      }
    }),
  );

  // 그래프의 Area 시리즈 데이터를 참조
  const SeriesApiArea = useRef<ISeriesApi<'Area'>>();

  // chart 컨테이너를 참조하는 함수
  const handleContainerRef = useCallback((node) => {
    if (node) {
      charContainer.current = node; // 컨테이터 요소 참조
      resizeObserver.current.observe(node); // 리사이즈 구독
    }
  }, []);

  useLayoutEffect(() => {
    if (charContainer.current) {
      const chart = createChart(charContainer.current, {
        height: 400,
        layout: {
          fontSize: 12,
          // backgroundColor: "#F5F5F9",
          // textColor: "#333",
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
      chart.subscribeCrosshairMove(function (param) {
        if (onCrossHairChange) {
          const price = param.seriesPrices.get(SeriesApiArea.current!);
          onCrossHairChange({ price: Number(price) });
        }
        if (onHoverMarker && param.hoveredMarkerId) {
          onHoverMarker({ markerId: param.hoveredMarkerId });
        }
      });
    }
    return () => {
      // clear useEffect
      if (charContainer.current) {
        charContainer.current?.removeChild(charContainer.current.childNodes[0]);
      }
      charApi.current = undefined;
      SeriesApiArea.current = undefined;
    };
  }, [charContainer, onCrossHairChange, onHoverMarker]);

  useEffect(() => {
    if (datas && SeriesApiArea.current) {
      SeriesApiArea.current?.setData(datas as ILineData[]);
    }
    return () => {};
  }, [datas]);

  useEffect(() => {
    if (markerDatas && SeriesApiArea.current) {
      SeriesApiArea.current.setMarkers(markerDatas);
    }
    return () => {};
  }, [markerDatas]);

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

export default LineSeriesChartPointing;

// export default React.memo(LineSeriesChartPointing, (prev, next) => {
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
