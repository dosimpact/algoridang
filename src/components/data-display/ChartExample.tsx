import React from 'react';
import { Line } from 'react-chartjs-2';
const options = {
  responsive: true,
  maintainAspectRatio: true,
  //tooltips 사용시
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
const labels = [65, 59, 80, 81, 56, 55, 40].map((e) => String(e));
const data = {
  labels: labels,
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

const ChartExample = () => {
  return (
    <div>
      <Line data={data} type="line" options={options}></Line>
    </div>
  );
};

export default ChartExample;
