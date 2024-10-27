import { createStore } from 'vuex'
import phones from '../../public/data/phones.json'

const store = createStore({
  state: {
    products: [],
    show: 3, //Default
    currentModal: '', //Default
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    UPDATE_SHOW(state, newShow) {
      state.show = newShow
    },
    UPDATE_CURRENT_MODAL(state, newCurrent) {
      state.currentModal = newCurrent
    },
  },
  actions: {
    loadProducts({ commit }) {
      commit('SET_PRODUCTS', phones.products)
    },
    updateShow({ commit }, newShow) {
      commit('UPDATE_SHOW', newShow)
    },
    updateCurrentModal({ commit }, newCurrent) {
      commit('UPDATE_CURRENT_MODAL', newCurrent)
    },
  },
  getters: {
    allProducts: state => state.products,
    currentShow: state => state.show,
    currentModal: state => state.currentModal,
  },
})

export default store
