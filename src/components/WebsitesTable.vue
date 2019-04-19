<template>
  <v-data-table
    :pagination.sync="pagination"
    :headers="headers"
    :items="websites"
    :search="search"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td>{{ props.item.url }}</td>
      <td>{{ props.item.timeSpent }}</td>
      <td>{{ props.item.category }}</td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    websites: {
      type: Array
    },
    loading: {
      type: Boolean
    }
  },
  data() {
    return {
      pagination: {
        descending: true,
        rowsPerPage: 9,
        sortBy: 'timeSpent'
      },
      headers: [
        { text: 'Domain', align: 'center', width: '33%', value: 'url' },
        { text: 'Total time', align: 'center', width: '33%', value: 'timeSpent' },
        { text: 'Category', align: 'center', width: '33%', value: 'category' }
      ]
    }
  }
}
</script>

<style scoped>
</style>
