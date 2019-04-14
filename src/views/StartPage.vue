<template>
  <div onload="getUser()">
    <div>
      <div>
        <h1>Activity Monitor</h1>
        <p>Create an account or login</p>
        <router-link to="/register">Register</router-link>
        <router-link to="/login">Login</router-link>
      </div>
    </div>
  </div>
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
