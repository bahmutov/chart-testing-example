import { labels } from './labels'

const data = {
  labels,
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
  colors: ['#7cd6fd']
})

if (window.Cypress) {
  window.chart = chart
}
