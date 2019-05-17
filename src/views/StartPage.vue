<template>
  <v-layout onload="getUser()">
    <v-flex xs12 sm6 mt-5 offset-sm3>
      <v-card>
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline">Activity monitor</span>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-title class="d-flex">
          <v-icon color="success" size="72px">
            watch
          </v-icon>
        </v-card-title>
        <v-card-actions class="d-flex py-4">
          <p class="subheading">
            <router-link to="/register">Create an account</router-link>&nbsp;or&nbsp;
            <router-link to="/login">Login</router-link>
          </p>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import { getSavedUser } from '../mixins/userUtils.js'

export default {
  mounted() {
    this.getUser()
  },
  methods: {
    async getUser() {
      let user = await getSavedUser()
      if (user) this.$router.push({ name: 'dashboard', params: { user: user } })
    }
  }
}
</script>
