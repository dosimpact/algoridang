import React from 'react';
import { Bar } from 'react-chartjs-2';
const options = {
  responsive: true,
  maintainAspectRatio: true,
  //tooltips 사용시
  indexAxis: 'y',
  tooltips: {
    enabled: true,
    mode: 'nearest',
    position: 'average',
    intersect: false,
  },
  scales: {
    xAxes: [
      {
        //   position: "top", //default는 bottom
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Step',
          fontFamily: 'Montserrat',
          fontColor: 'black',
        },
        ticks: {
          // beginAtZero: true,
          maxTicksLimit: 10, //x축에 표시할 최대 눈금 수
        },
      },
    ],
    yAxes: [
      {
        display: true,
        //   padding: 10,
        scaleLabel: {
          display: true,
          labelString: 'Coverage',
          fontFamily: 'Montserrat',
          fontColor: 'black',
        },
        ticks: {
          beginAtZero: true,
          stepSize: 20,
          min: 0,
          max: 100,
          //y축 scale 값에 % 붙이기 위해 사용
          callback: function (value: any) {
            return value + '%';
          },
        },
      },
    ],
  },
};
const makeData = (arr: number[]) => {
  return {
    labels: arr.map((e) => String(e)),
    datasets: [
      {
        label: '승/패 카운트',
        data: arr,
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
        borderWidth: 1,
      },
    ],
  };
};

const ChartWinRatio = ({ a = 50, b = 50 }: { a?: number; b?: number }) => {
  return (
    <>
      <Bar
        data={makeData([a, b])}
        type="bar"
        options={options}
        style={{ height: '300px' }}
      ></Bar>
    </>
  );
};

export default ChartWinRatio;
