import { urls } from '../mixins/urls.js'
import { removeUser } from '../mixins/userUtils.js'

async function logout () {
  const response = await fetch(urls.logout)
  response.status === 200 && removeUser()
}

export {logout}