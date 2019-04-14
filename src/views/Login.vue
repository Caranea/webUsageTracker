<template>
  <div class="row mt-5">
    <div class="col-md-6 m-auto">
      <div class="card card-body">
        <h1 class="text-center mb-3"><i class="fas fa-sign-in-alt"></i>Login</h1>
        <div ref="failure" class="d-none p-3 mb-2 bg-warning text-white">
          {{ error }}
        </div>
        <form id="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              class="form-control"
              placeholder="Enter Email"
              v-model="email"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              class="form-control"
              placeholder="Enter Password"
              v-model="password"
            />
          </div>
          <a class="btn btn-primary btn-block" v-on:click="login">Login</a>
        </form>
        <p class="lead mt-4">
          No Account?
          <router-link to="/register" class="btn btn-primary btn-block mb-2">Register</router-link>
          <a href="=/register">Register</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { urls } from '../mixins/urls.js'
import { post } from '../mixins/httpUtils.js'
import { saveUser } from '../mixins/userUtils.js'

export default {
  data() {
    return {
      error: ''
    }
  },
  methods: {
    async login() {
      const email = this.email
      const password = this.password
      const response = await post(urls.login, { email, password })
      const responseData = await response.json()
      if (response.status === 200) {
        this.$refs.failure.classList.add('d-none')
        saveUser(responseData)
        this.$router.push({ name: 'dashboard', params: { user: responseData.user } })
      } else {
        this.error = responseData.error
        this.$refs.failure.classList.remove('d-none')
      }
    }
  }
}
</script>
<style></style>
