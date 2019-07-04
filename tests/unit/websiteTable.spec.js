import { expect } from 'chai'
import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils'

import WebsitesTable from '@/components/WebsitesTable.vue'
import mock from './mock.js'
Vue.use(Vuetify)

describe('WebsitesTable.vue', () => {
  const websites = mock.websites
  const websitesByMs = mock.websitesByMs
  const dataType = 'domains'
  const wrapper = mount(WebsitesTable, {
    propsData: { websites, dataType }
  })

  it('renders a table', () => {
    expect(wrapper.find('table').is('table')).to.be.true
  })

  it('displays each entry in domain mode', () => {
    websites.forEach((website, i) => {
      const row = wrapper.findAll('tbody tr').at(i)
      Object.keys(website).forEach((key, j) => {
        const cell = row
          .findAll('td')
          .at(j)
          .text()
        expect(cell).to.include(website[key])
      })
    })
  })

  it('is correctly changing sorting order in domain mode', () => {
    const pagination = {
      descending: false,
      rowsPerPage: 9,
      sortBy: 'timeSpent'
    }
    wrapper.setData({ pagination })
    expect(
      wrapper
        .findAll('tbody td')
        .at(0)
        .text()
    ).to.equal('ptasieoferty.pl')
  })

  it('is correctly changing sortBy value in domain mode', () => {
    const pagination = {
      descending: false,
      rowsPerPage: 9,
      sortBy: 'url'
    }
    wrapper.setData({ pagination })
    expect(
      wrapper
        .findAll('tbody td')
        .at(0)
        .text()
    ).to.equal('olx.pl')
  })

  it('is correctly calculating category time', () => {
    const dataType = 'categories'
    const websites = websitesByMs
    const categories = mock.categories
    wrapper.setProps({ dataType })
    wrapper.setProps({ websites })
    const cells = wrapper.findAll('tbody td')
    cells.wrappers.forEach((wrapper, i) => {
      const key = Object.keys(categories[Math.floor(i / 2)])[0]
      const value = categories[Math.floor(i / 2)][key]
      expect(wrapper.text()).to.equal((i + 1) % 2 === 0 ? value : key)
    })
  })
})
