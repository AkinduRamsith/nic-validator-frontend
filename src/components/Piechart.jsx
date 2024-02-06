import React from 'react'
import {Pie} from 'react-chartjs-2';
import {Chart as ChartJS, scales} from "chart.js/auto"

function Piechart({chartdata}) {
  return <Pie data={chartdata} />;
}

export default Piechart