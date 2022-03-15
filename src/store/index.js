import {createStore} from 'vuex'
import axios from 'axios'
import {productURL,adminURL,headers,cartURL,orderURL} from '../api/config'

const cart = {
  state:{
    carts:[],
    total:0,
    profit:null
  },
  
// Mutation: mutate the state, and it accepts two params- state and payload
  mutations:{
    set_cart(state,payload){
      state.carts = payload
    },
    countTotal(state,payload){
      state.total = payload
    }
  },
  actions:{
    async fetch_cart({commit}){
      const resp = await axios.get(cartURL)
      commit('set_cart', resp.data.carts)
      commit('countTotal',resp.data.finalTotal)
    },
    async add_cart({commit},payload){
      const resp = await axios.post(cartURL,payload)
      commit('set_cart',resp.data.carts)
      commit('countTotal',resp.data.finalTotal)
    },
    async delete_cart({commit},payload){
      const resp = await axios.delete(cartURL+`/${payload}`)
      commit('set_cart',resp.data.carts)
      commit('countTotal',resp.data.finalTotal)
    },
    async deleteAll_cart({commit}){
      const resp = await axios.delete(cartURL)

      commit('set_cart',resp.data.carts)
      commit('countTotal',resp.data.finalTotal)
    },
    async edit_cart({commit},payload){
      const resp = await axios.patch(cartURL,payload)
      commit('set_cart',resp.data.carts)
      commit('countTotal',resp.data.finalTotal)
    },
    async submit_cart({commit},payload){
      const resp = await axios.post(orderURL,payload)
      commit('set_cart',resp.data.carts)
      commit('countTotal',resp.data.finalTotal)
    }
  }
}

const products = {
  state:{
    products:[]
  },
  mutations:{
    set_product(state,payload){
      state.products = payload
    }
  },
  actions:{
    async fetch_product({commit}){
      const resp = await axios.get(productURL)

      commit('set_product',resp.data.products)
    }
  }
}

const admin = {
  state:{
    login:false,
    orders:[]
  },
  mutations:{
    set_orders(state,payload){
      state.orders = payload
    },
  },
  actions:{
    async fetch_order({commit}){
      const resp = await axios.get(adminURL,headers)
      commit('set_orders',resp.data.orders)
    },
    async edit_paymentStatus({commit},payload){
      const resp = await axios.put(adminURL,payload,headers)
      commit('set_orders',resp.data.orders)
    },
    async delete_order({commit},payload){
      const resp = await axios.delete(adminURL+`/${payload}`,headers)
      commit('set_orders',resp.data.orders)
    },
    async deleteAll_order({commit}){
      const resp = await axios.delete(adminURL,headers)
      commit('set_orders',resp.data.orders)
    }
  }
}

// Create store
const store = createStore({
  modules:{
    cart,
    products,
    admin
  },
})

export default store
