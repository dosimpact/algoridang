import React from 'react';
import { Bar } from 'react-chartjs-2';
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
      data: [65, 59, 80, 81, 56, 55, 40, 50, 12, 20],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
      ],
      borderWidth: 1,
    },
  ],
};

const ChartMonthlyReturn = () => {
  return (
    <>
      <Bar
        data={data}
        type="bar"
        options={options}
        style={{ height: '300px' }}
      ></Bar>
    </>
  );
};

export default ChartMonthlyReturn;
