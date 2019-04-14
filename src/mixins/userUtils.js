import { urls } from './urls.js'
import Router from '../router'

async function ensureAuth(user) {
  const savedUser = user
  const userData = await getUserData()
  return !!savedUser && !!userData.user && savedUser._id === userData.user._id
}

async function getUserData() {
  let response = await fetch(urls.dashboard)
  response = await response.json()
  return response
}

function getSavedUser() {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get('user', async result => {
        const authorized = await ensureAuth(result.user)
        authorized ? resolve(result.user) : reject()
      })
    } catch (e) {
      reject(e)
    }
  }).catch(e => {
    removeUser()
    Router.push('login')
  })
}

function removeUser() {
  chrome.storage.sync.set({ user: null }, () => {
    Router.push('login')
  })
}

function saveUser(userData) {
  chrome.storage.sync.set({ user: userData.user }, () => {})
}

export { getSavedUser, removeUser, saveUser }
