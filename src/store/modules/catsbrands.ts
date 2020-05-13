import axios from 'axios'
import { isEmpty } from 'lodash'
import { mockupData, filterMockupData } from '@/utils/mockup'
// initial state
const state = {
  brands: [],
  categories: [],
  items: [],
  pagination: {
    per_page: 48,
    last_page: 1,
    current_page: 1
  },
  loading: false
}

// mutations
const mutations = {
  SET_BRANDS: (state: { brands: Array<object> }, values: Array<object>) => {
    state.brands = values
  },
  SET_CATEGORIES: (state: { categories: Array<object> }, values: Array<object>) => {
    state.categories = values
  },
  SET_ITEMS: (state: { items: Array<object> }, values: Array<object>) => {
    state.items = values
  },
  SET_PAGINATION: (state: { pagination: object }, values: object) => {
    state.pagination = {
      per_page: values['per_page'],
      last_page: values['last_page'],
      current_page: values['current_page']
    }
  },
  SET_LOADING: (state: { loading: boolean }, status: boolean) => {
    state.loading = status
  }
}

// actions
const actions = {
  async getAllCatsbrands({ commit }) {
    try {
      commit('SET_LOADING', true)
      const { data } = await axios({
        method: 'GET',
        url: 'https://factools.qa.maqe.com/catalog/allcatsbrands'
      })
      if (!isEmpty(data)) {
        commit('SET_BRANDS', data.brands)
        commit('SET_CATEGORIES', data.categories)
      }
      commit('SET_LOADING', false)
    } catch (err) {
      console.log('Can not fetch data from api')
      commit('SET_BRANDS', mockupData.brands)
      commit('SET_CATEGORIES', mockupData.categories)
      commit('SET_LOADING', false)
    }
  },
  async filterCatsbrands({ commit }, queryString) {
    try {
      commit('SET_LOADING', true)
      const { data } = await axios({
        method: 'GET',
        url: `https://factools.qa.maqe.com/catalog/filter?${queryString}`
      })
      if (!isEmpty(data)) {
        commit('SET_ITEMS', data.data)
        commit('SET_PAGINATION', data.meta)
      }
      commit('SET_LOADING', false)
    } catch (err) {
      commit('SET_ITEMS', filterMockupData.data)
      commit('SET_PAGINATION', filterMockupData.meta)
      commit('SET_LOADING', false)
      //   throw err
    }
  }
}
export const getters = {
  loading: state => state.loading,
  brands: state => state.brands,
  categories: state => state.categories,
  items: state => state.items,
  pagination: state => state.pagination
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
