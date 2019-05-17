<template>
  <v-layout>
    <v-flex xs12 sm6 mt-5 offset-sm3>
      <v-card>
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline">Log in</span>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-title>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-chip class="info-span ml-0 d-none" label color="error" ref="failure" text-color="white">
              <v-avatar>
                <v-icon>error</v-icon>
              </v-avatar>
              {{ error }}
            </v-chip>
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
            <v-text-field
              v-model="password"
              type="password"
              hint="At least 6 characters"
              :rules="passwordRules"
              label="Password"
              required
            ></v-text-field>
            <v-btn :disabled="!valid" color="success" @click="login">Login</v-btn>
          </v-form>
        </v-card-title>
        <v-card-actions class="d-flex">
          <p class="subheading">
            No Account?
            <router-link to="/register">Register</router-link>
          </p>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { urls } from '../mixins/urls.js'
import { post } from '../mixins/httpUtils.js'
import { saveUser } from '../mixins/userUtils.js'

export default {
  data() {
    return {
      error: '',
      valid: false,
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be more than 6 characters'
      ],
      email: '',
      emailRules: [v => !!v || 'E-mail is required', v => /.+@.+/.test(v) || 'E-mail must be valid']
    }
  },
  methods: {
    async login() {
      const email = this.email
      const password = this.password
      const response = await post(urls.login, { email, password })
      const responseData = await response.json()
      if (response.status === 200) {
        this.$refs.failure.$el.classList.add('d-none')
        saveUser(responseData)
        this.$router.push({ name: 'dashboard', params: { user: responseData.user } })
      } else {
        this.error = responseData.error
        this.$refs.failure.$el.classList.remove('d-none')
      }
    }
  }
}
</script>
<style scoped>
.v-form {
  width: 100%;
}
</style>
