<template>
  <div class="row mt-5">
    <div class="col-md-6 m-auto">
      <div class="card card-body">
        <h1 class="text-center mb-3"><i class="fas fa-user-plus"></i> Register</h1>
        <div ref="success" class="d-none p-3 mb-2 bg-success text-white">
          Registration successful! You can now
          <router-link to="/login" class="btn btn-primary btn-block mb-2">Login</router-link>
        </div>
        <div ref="failure" class="d-none p-3 mb-2 bg-warning text-white">
          <ul>
            <li v-for="error in errors" :key="error.id">
              {{ error.error }}
            </li>
          </ul>
        </div>
        <form id="registerForm">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="name" id="name" name="name" class="form-control" placeholder="Enter Name" v-model="name" />
          </div>
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
              placeholder="Create Password"
              v-model="password"
            />
          </div>
          <div class="form-group">
            <label for="password2">Confirm Password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              class="form-control"
              placeholder="Confirm Password"
              v-model="password2"
            />
          </div>
          <a @click="register" class="btn btn-primary btn-block">Register</a>
        </form>
        <p class="lead mt-4">
          Have An Account?
          <router-link to="/login" class="btn btn-primary btn-block mb-2">Login</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { post } from '../mixins/httpUtils.js'
import { urls } from '../mixins/urls.js'

export default {
  data() {
    return {
      errors: ''
    }
    //   },
    //   async mounted () {
    //     vm.patrons = await vm.$store.dispatch('hall:getPatrons', { page: 0 })
  },
  methods: {
    async register() {
      const registerData = {
        name: this.name,
        email: this.email,
        password: this.password,
        password2: this.password2
      }
      const response = await post(urls.register, registerData)
      const responseData = await response.json()

      if (response.status === 200) {
        this.$refs.success.classList.remove('d-none')
        this.$refs.failure.classList.add('d-none')
      } else {
        this.errors = responseData
        this.$refs.failure.classList.remove('d-none')
        this.$refs.success.classList.add('d-none')
      }
    }
  }
}
</script>

<style></style>
