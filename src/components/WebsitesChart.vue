
<script>
import { Doughnut } from 'vue-chartjs'
const websitesDisplayed = 10
function getRandomRgb() {
  var num = Math.round(0xffffff * Math.random());
  var r = num >> 16;
  var g = num >> 8 & 255;
  var b = num & 255;
  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}
export default {
  extends: Doughnut,
  props: {
    websites: {
      type: Array
    },
    loading: {
      type: Boolean
    }
  },
  mounted() {
    let labels = []
    let datasets = []
    let backgroundColor = []
    this.websites.sort((a, b) => {b
      return b.timeSpent - a.timeSpent
    })
    this.websites.forEach((website, index) => {
      if (index < websitesDisplayed) {
        labels.push(website.url)
        datasets.push(website.timeSpent)
        backgroundColor.push(getRandomRgb())
      } else {
        if (index = websitesDisplayed) datasets[websitesDisplayed] = 0
        labels[websitesDisplayed] = 'other'
        datasets[websitesDisplayed] += website.timeSpent
        backgroundColor[websitesDisplayed] = getRandomRgb()
      }
    })
    this.renderChart({
      labels: labels,
      datasets: [
        {
      backgroundColor: backgroundColor,
          data: datasets
        }
      ]
    })
  }
}
</script>

<style>
.chartjs-render-monitor {
  width: 430px !important;
  height: 430px !important;
  margin: 0 auto;
}
</style>