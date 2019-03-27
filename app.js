// import { Chart } from 'frappe-charts/dist/frappe-charts.esm.js'

const data = {
  labels: ['winter', 'spring', 'summer', 'fall'],
  datasets: [
    {
      name: 'Sunny days',
      type: 'bar',
      values: [10, 20, 30, 25]
    }
  ]
}

const chart = new frappe.Chart('#chart', {
  title: 'Sunny days per year',
  data: data,
  type: 'bar',
  height: 250,
  colors: ['#7cd6fd', '#743ee2']
})

if (window.Cypress) {
  window.chart = chart
}
