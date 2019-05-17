<template>
  <v-layout>
    <v-flex xs12 sm6 mt-5 offset-sm3>
      <v-card>
        <v-container fill-height fluid pb-0>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline">Register</span>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-title class="pt-0">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-chip class="info-span ml-0 d-none" label color="success" ref="success" text-color="white">
              <v-avatar> <v-icon color="white">done</v-icon> </v-avatar>Registration successful! You can now
              <router-link to="/login" text-color="white">&nbsp;login</router-link>
            </v-chip>
            <v-layout ref="failure">
              <v-list>
                <v-list-tile v-for="error in errors" :key="error.id" avatar>
                  <v-list-tile-avatar>
                    <v-icon color="error">error</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ error.error }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-layout>
            <v-text-field v-model="name" :rules="nameRules" label="Name" required></v-text-field>
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
            <v-text-field
              v-model="password"
              type="password"
              hint="At least 6 characters"
              :rules="passwordRules"
              label="Password"
              required
            ></v-text-field>
            <v-text-field
              v-model="password2"
              type="password"
              hint="Retype your password"
              :rules="password2Rules"
              label="Repeat password"
              required
            ></v-text-field>

            <v-btn :disabled="!valid" color="success" @click="register()">Register</v-btn>
          </v-form>
        </v-card-title>
        <v-card-actions class="d-flex">
          <p class="subheading">
            Have An Account?
            <router-link to="/login">Login</router-link>
          </p>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { post } from '../mixins/httpUtils.js'
import { urls } from '../mixins/urls.js'

export default {
  data() {
    return {
      errors: '',
      valid: false,
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be more than 6 characters'
      ],
      email: '',
      emailRules: [v => !!v || 'E-mail is required', v => /.+@.+/.test(v) || 'E-mail must be valid'],
      name: '',
      nameRules: [v => (v && v.length >= 3 && v.length < 25) || 'Name must be more than 3 and less than 25 characters'],
      password2: '',
      password2Rules: [v => (v && v === this.password) || "Passwords don't match"]
    }
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
        this.$refs.success.$el.classList.remove('d-none')
        this.$refs.failure.classList.add('d-none')
      } else {
        this.errors = responseData
        this.$refs.failure.classList.remove('d-none')
        this.$refs.success.$el.classList.add('d-none')
      }
    }
  }
}
</script>

<style scoped>
.v-form {
  width: 100%;
}
.success a {
  font-weight: bold;
  text-decoration: none;
  color: white;
}
</style>
