<script>
import { Doughnut, mixins } from 'vue-chartjs'
import { timeFromMs } from '../mixins/dateUtils.js'
import colors from 'vuetify/es5/util/colors'

const websitesDisplayed = 10

export default {
  extends: Doughnut,
  props: {
    websites: {
      type: Array
    },
    dataType: {
      type: String
    }
  },
  computed: {
    options() {
      return {
        responsive: false,
        maintainAspectRatios: false,
        tooltips: {
          enabled: true,
          callbacks: {
            label: (tooltipItem, data) => {
              return `${data.labels[tooltipItem.index]}: ${timeFromMs(data.datasets[0].data[tooltipItem.index])}`
            }
          }
        },
        legend: {
          fullWidth: true
        }
      }
    }
  },
  mixins: [mixins.reactiveProp],
  mounted() {
    this.drawChart()
  },
  methods: {
    drawChart() {
      const domains = this.dataType === 'domains'
      const websites = [...this.websites]
      let chartData = { labels: [], datasets: [{ backgroundColor: [], data: [] }] }
      websites.sort((a, b) => {
        return b.timeSpent - a.timeSpent
      })
      domains
        ? websites.forEach((website, index) => {
            if (index < websitesDisplayed) {
              chartData.labels.push(website.url)
              chartData.datasets[0].data.push(website.timeSpent)
              chartData.datasets[0].backgroundColor.push(colors[Object.keys(colors)[index]].accent1)
            } else {
              if (index === websitesDisplayed) chartData.datasets[0].data[websitesDisplayed] = 0
              chartData.labels[websitesDisplayed] = 'other'
              chartData.datasets[0].data[websitesDisplayed] += website.timeSpent
              chartData.datasets[0].backgroundColor[websitesDisplayed] =
                colors[Object.keys(colors)[websitesDisplayed]].accent1
            }
          })
        : websites.forEach((website, index) => {
            if (chartData.labels.includes(website.category)) {
              chartData.datasets[0].data[website.category] += website.timeSpent
            } else {
              const colorCount = index === 0 ? 0 : chartData.datasets[0].backgroundColor.length + 1
              chartData.labels.push(website.category)
              chartData.datasets[0].data.push(website.timeSpent)
              chartData.datasets[0].backgroundColor.push(colors[Object.keys(colors)[colorCount]].accent1)
            }
          })
      this.renderChart(chartData, this.options)
    }
  },
  watch: {
    websites: function() {
      this.drawChart()
    },
    dataType: function() {
      this.drawChart()
    }
  }
}
</script>

<style>
#doughnut-chart {
  width: 430px !important;
  height: 430px !important;
  margin: 0 auto;
}
</style>
