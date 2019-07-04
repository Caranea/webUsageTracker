<template>
  <div>
    <v-data-table v-if="domains" :pagination.sync="pagination" :headers="headers" :items="websites" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.url }}</td>
        <td>{{ props.item.timeSpent }}</td>
        <td>{{ props.item.category }}</td>
      </template>
    </v-data-table>
    <v-data-table
      v-if="!domains"
      :pagination.sync="pagination"
      :headers="headers"
      :items="categories"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.category }}</td>
        <td>{{ timeFromMs(props.item.timeSpent) }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { timeFromMs } from '../mixins/dateUtils.js'

export default {
  props: {
    websites: {
      type: Array
    },
    dataType: {
      type: String
    }
  },
  mounted() {
    this.setData()
  },
  data() {
    return {
      pagination: {
        descending: true,
        rowsPerPage: 9,
        sortBy: 'timeSpent'
      },
      headers: [],
      categories: [],
      domains: true,
      timeFromMs: timeFromMs
    }
  },
  methods: {
    setData() {
      const domains = this.dataType === 'domains'
      this.domains = domains
      if (domains) {
        this.headers = [
          { text: 'Domain', align: 'center', width: '33%', value: 'url' },
          { text: 'Total time', align: 'center', width: '33%', value: 'timeSpent' },
          { text: 'Category', align: 'center', width: '33%', value: 'category' }
        ]
      } else {
        this.headers = [
          { text: 'Category', align: 'center', width: '50%', value: 'category' },
          { text: 'Total time', align: 'center', width: '50%', value: 'timeSpent' }
        ]
        this.categories = []
        this.websites.forEach(website => {
          if (this.categories.filter(el => el.category === website.category).length === 0) {
            this.categories.push({ category: website.category, timeSpent: website.timeSpent })
          } else {
            this.categories.forEach(el => {
              if (el.category === website.category) el.timeSpent += website.timeSpent
            })
          }
        })
      }
    }
  },
  watch: {
    websites: function() {
      this.setData()
    }
  }
}
</script>

<style scoped></style>
