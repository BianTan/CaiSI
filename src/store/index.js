import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeIndex: 0,
    address: '',
    addressList: [
      {
        city: '获取定位中...',
        data: {},
        colors: ['#2c3e50', '#34495e'],
        unshow: false,
        loading: true
      },
      {
        city: '景德镇',
        data: {},
        colors: ['#16a085', '#1abc9c'],
        point: {
          lng: '117.17800028683175',
          lat: '29.2686002613824'
        },
        loading: true
      }
    ],
    selected: null,
    unselect: null
  },
  mutations: {
    setListData(state, payload) {
      state.addressList[payload.index].data = payload.weatherData
      state.addressList[payload.index].loading = false
    },
    setHomeData(state, payload) {
      state.addressList.splice(0, 1, payload)
    },
    nextLi(state) {
      if (state.addressList[0].unshow) {
        if (state.activeIndex < state.addressList.length - 2) {
          state.activeIndex++
        }
      } else {
        if (state.activeIndex < state.addressList.length - 1) {
          state.activeIndex++
        }
      }
    },
    prevLi(state) {
      if (state.activeIndex > 0) {
        state.activeIndex--
      }
    },
    selectCart(state, payload) {
      state.unselect = null
      state.selected = payload
    },
    setunSelect(state) {
      state.unselect = state.selected
      state.selected = null
    }
  },
  actions: {
  },
  getters: {
    getAddressList(state) {
      return state.addressList
    },
    getActiveIndex(state) {
      return state.activeIndex
    },
    test(state) {
      return state.selected
    }
  },
  modules: {
  }
})
