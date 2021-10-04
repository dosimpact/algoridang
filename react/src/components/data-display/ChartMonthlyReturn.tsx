import React from 'react';
import { Bar } from 'react-chartjs-2';

// const options = {
//   responsive: true,
//   maintainAspectRatio: true,
//   aspectRatio: 2,
//   tooltips: {
//     enabled: true,
//     mode: "nearest",
//     position: "average",
//     intersect: false,
//   },
//   scales: {
//     xAxes: [
//       {
//         //   position: "top", //default는 bottom
//         display: true,
//         scaleLabel: {
//           display: true,
//           labelString: "Step",
//           fontFamily: "Montserrat",
//           fontColor: "black",
//         },
//         ticks: {
//           // beginAtZero: true,
//           maxTicksLimit: 10, //x축에 표시할 최대 눈금 수
//         },
//       },
//     ],
//     yAxes: [
//       {
//         display: true,
//         //   padding: 10,
//         scaleLabel: {
//           display: true,
//           labelString: "Coverage",
//           fontFamily: "Montserrat",
//           fontColor: "black",
//         },
//         ticks: {
//           beginAtZero: true,
//           stepSize: 20,
//           min: 0,
//           max: 100,
//           //y축 scale 값에 % 붙이기 위해 사용
//           callback: function (value: any) {
//             return value + "%";
//           },
//         },
//       },
//     ],
//   },
// };

const makeChartMonthlyReturn = (labels: string[], data: number[]) => {
  return {
    labels,
    datasets: [
      {
        label: '수익률 %',
        data,
        backgroundColor: 'rgba(255, 205, 86, 0.2)',
        borderColor: 'rgb(255, 205, 86)',
        borderWidth: 1,
      },
    ],
  };
};

interface IChartMonthlyReturn {
  labels: string[];
  data: number[];
  props?: any;
}

const ChartMonthlyReturn: React.FC<IChartMonthlyReturn> = ({
  data,
  labels,
  ...props
}) => {
  return (
    <>
      <Bar
        data={makeChartMonthlyReturn(labels, data)}
        type="bar"
        options={{
          maintainAspectRatio: true,
          aspectRatio: 1,
        }}
        style={{ height: '300px' }}
      ></Bar>
    </>
  );
};

export default ChartMonthlyReturn;
