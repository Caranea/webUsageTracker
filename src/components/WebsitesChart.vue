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
      let chartData = [...this.websites]
      let labels = []
      let data = []
      let backgroundColor = []
      chartData.sort((a, b) => {
        return b.timeSpent - a.timeSpent
      })
      chartData.forEach((website, index) => {
        if (index < websitesDisplayed) {
          labels.push(website.url)
          data.push(website.timeSpent)
          backgroundColor.push(colors[Object.keys(colors)[index]].accent1)
        } else {
          if (index === websitesDisplayed) data[websitesDisplayed] = 0
          labels[websitesDisplayed] = 'other'
          data[websitesDisplayed] += website.timeSpent
          backgroundColor[websitesDisplayed] = colors[Object.keys(colors)[websitesDisplayed]].accent1
        }
      })
      chartData = { labels: labels, datasets: [{ backgroundColor: backgroundColor, data: data }] }
      this.renderChart(chartData, this.options)
    }
  },
  watch: {
    websites: function() {
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
