import { createStore } from 'vuex';
import phones from '../../public/data/phones.json'; 

const store = createStore({
  state: {
    products: [],
    count: 3,
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    UPDATE_COUNT(state, newCount){
      state.count = newCount;
    }
  },
  actions: {
    loadProducts({ commit }) {
      commit('SET_PRODUCTS', phones.products);
    },
    updateCount({ commit }, newCount) {
      commit('UPDATE_COUNT', newCount);
    }
  },
  getters: {
    allProducts: (state) => state.products,
    currentCount: (state) => state.count,
  }
});

export default store;