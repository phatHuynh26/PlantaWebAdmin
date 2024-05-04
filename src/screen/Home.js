import React from 'react'
import { Chart } from 'chart.js/auto'
const Home = () => {
  const render = () => {
    const ctx = document.getElementById('myChart')
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  return (
    <div>
      <h1>Home</h1>
      <canvas id="myChart"></canvas>
      <button onClick={render}>render</button>
    </div>
  )
}

export default Home

