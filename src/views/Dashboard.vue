<template>
  <v-container grid-list-xl class="dashboard">
    <v-layout column>
      <Spinner v-if="loading"></Spinner>
      <v-flex>
        <v-layout row justify-space-between>
          <span class="headline ml-3 mt-1">Hello, {{ user.name }}</span>
          <div>
            <v-btn small color="primary">Settings</v-btn>
            <v-btn class="mr-3" v-on:click="logout()" small>Log out</v-btn>
          </div>
        </v-layout>
      </v-flex>
      <v-flex class="px-0">
        <v-layout row class="options">
          <v-flex>
            <v-btn-toggle v-model="Period" class="transparent" max="100" mandatory>
              <v-btn small v-on:click="getReport()" flat>Day</v-btn>
              <v-btn small v-on:click="getReport(firstDayOfTheWeek())" flat>Week</v-btn>
              <v-btn small v-on:click="getReport(firstDayOfTheMonth())" flat>Month</v-btn>
              <v-dialog v-model="dialog" persistent lazy full-width width="290px">
                <template v-slot:activator="{ on }">
                  <v-btn small flat v-on="on">Exact date</v-btn>
                </template>
                <v-date-picker v-bind:max="today" v-model="date" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" v-on:click="dialog = false">Cancel</v-btn>
                  <v-btn flat color="primary" v-on:click="getReport(date)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-btn-toggle>
          </v-flex>
          <v-divider class="my-2" inset vertical></v-divider>
          <v-flex>
            <v-btn-toggle v-model="viewMode" class="transparent" max="100" mandatory>
              <v-btn small :value="'table'" flat>Table</v-btn>
              <v-btn small :value="'chart'" flat>Chart</v-btn>
            </v-btn-toggle>
          </v-flex>
          <v-divider class="my-2" inset vertical></v-divider>
          <v-flex>
            <v-btn-toggle v-model="dataType" class="transparent" max="100" mandatory>
              <v-btn small :value="'domains'" flat>Domains</v-btn>
              <v-btn small :value="'categories'" flat>Categories</v-btn>
            </v-btn-toggle>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex class="py-1" d-flex justify-space-between>
        <v-chip class="info-span ml-0" label color="success" text-color="white">
          <v-avatar>
            <v-icon>check_circle</v-icon>
          </v-avatar>
          {{
            loading
              ? 'Refreshing data... '
              : `Displaying data ${date === today ? 'from ' + today : 'from ' + date + ' to ' + today}`
          }}
        </v-chip>
        <v-btn class="mr-0" small color="primary">Download PDF report</v-btn>
      </v-flex>
      <v-flex>
        <websites-table v-if="viewMode === 'table'" :websites="websites" :dataType="dataType"></websites-table>
        <websites-chart v-if="viewMode === 'chart'" :websites="websites" :dataType="dataType"></websites-chart>
        <div v-if="viewMode === 'chart' && !websites.length" class="no-data">No data available</div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { fetchReport } from '../services/report.service.js'
import { logout } from '../services/user.service.js'
import { dateOnlyFormat, firstDayOfTheWeek, firstDayOfTheMonth, setMidnight } from '../mixins/dateUtils.js'
import WebsitesTable from '../components/WebsitesTable.vue'
import WebsitesChart from '../components/WebsitesChart.vue'
import Spinner from '../components/Spinner.vue'

export default {
  props: ['user'],
  components: {
    WebsitesTable,
    WebsitesChart,
    Spinner
  },
  data() {
    return {
      websites: [],
      logout: logout,
      dialog: false,
      loading: true,
      today: dateOnlyFormat(new Date()),
      firstDayOfTheWeek: firstDayOfTheWeek,
      firstDayOfTheMonth: firstDayOfTheMonth,
      date: '',
      period: [0],
      dataTypeDisabled: true,
      dataType: 'domains',
      viewMode: 'table'
    }
  },
  created() {
    this.getReport()
  },
  methods: {
    async getReport(from, to) {
      this.loading = true
      const milliseconds = this.viewMode === 'chart' || this.dataType === 'categories'
      let report = await fetchReport(from, to, milliseconds)
      if (report.websites) this.websites = report.websites
      this.dialog = false
      this.loading = false
      this.date = from ? dateOnlyFormat(from) : this.today
    }
  },
  watch: {
    viewMode: function() {
      this.getReport(setMidnight(new Date(this.date)))
    },
    dataType: function() {
      this.getReport()
    }
  }
}
</script>

<style>
.info-span {
  min-width: 400px;
}
.no-data {
    position: absolute;
    top: 175px;
    width: 100%;
    font-size: 18px;
}
.dashboard table.v-table tbody td,
table.v-table tbody th {
  height: 35px;
}
.dashboard table.v-table thead tr {
  height: 40px;
}
</style>
