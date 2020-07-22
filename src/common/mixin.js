// import AMap from 'AMap'
import BMap from 'BMap'
import { mapState } from 'vuex'
import { baseData, GetHome } from 'network/home'

export const AmapMixin = {
  data () {
    return {
      AmapL: [],
      GetHome: { wind: [] },
      homeData: {},
      address: {}
    }
  },
  methods: {
    /**
     * 获取定位信息，为后面获取天气信息做准备
     */
    // getLocation() { // 这个是高德定位的
    //   const _this = this
    //   AMap.plugin('AMap.Geolocation', function () {
    //     const geolocation = new AMap.Geolocation({
    //       // 是否使用高精度定位，默认：true
    //       enableHighAccuracy: true,
    //       // 设置定位超时时间，默认：无穷大
    //       timeout: 5000
    //     })
    //     geolocation.getCurrentPosition()
    //     AMap.event.addListener(geolocation, 'complete', data => {
    //       _this.AmapL = [data.position.lng, data.position.lat]
    //       _this.AmapL = [data.point.lng, data.point.lat]
    //       _this.address = data.address
    //       _this.getInit() // 获取天气信息
    //       // const city = [data.addressComponent.province, data.addressComponent.city, data.addressComponent.district]
    //       const address = data.formattedAddress
    //       _this.$store.commit('setAmapData', { AmapL, address }) // 保存数据到 Store
    //       _this.getCaiyun() // 获取天气信息
    //       console.log(data)
    //     })
    //     AMap.event.addListener(geolocation, 'error', data => {
    //       // 失败 启用 ip定位
    //       console.log('失败~')
    //     })
    //   })
    // },

    /**
     * 获取定位信息，为后面获取天气信息做准备
    */
    getLocation() { // 这个是百度定位的（感觉百度定位准一些）
      const _this = this
      const geolocation = new BMap.Geolocation()
      // 关于状态码
      // BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
      // BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
      // BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
      // BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
      // BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
      // BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
      // BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
      // BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
      // BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)
      geolocation.getCurrentPosition(data => {
        if (geolocation.getStatus() === 0) {
          _this.AmapL = [data.point.lng, data.point.lat]
          _this.address = data.address
          _this.getInit()
        }
      }, { enableHighAccuracy: true })
    },
    /**
     * 获取首页定位天气信息
    */
    getInit() {
      baseData(this.AmapL[0] + ',' + this.AmapL[1]).then(res => {
        const data = res.data.result
        const _this = this.GetHome = new GetHome(data)
        const homeData = this.homeData = {
          city: this.address.province + this.address.city + this.address.district + this.address.street,
          data: {
            wind: _this.wind,
            temperature: _this.temperature,
            apparent_temperature: _this.apparent_temperature,
            humidity: _this.humidity,
            skycon: _this.skycon,
            air_desc: _this.air_desc,
            tips: _this.tips
          },
          colors: ['#7187db', '#6188da'],
          unshow: false,
          loading: false
        }
        this.$store.commit('setHomeData', homeData)
      })
    },
    /**
     * 根据经纬度获取天气信息
    */
    getWeatherInfo(lng, lat, index) {
      baseData(lng + ',' + lat).then(res => {
        const data = res.data.result
        const _this = this.GetHome = new GetHome(data)
        const weatherData = {
          wind: _this.wind,
          temperature: _this.temperature,
          apparent_temperature: _this.apparent_temperature,
          humidity: _this.humidity,
          skycon: _this.skycon,
          air_desc: _this.air_desc,
          tips: _this.tips
        }
        this.$store.commit('setListData', { index, weatherData })
      })
    }
  },
  computed: {
    ...mapState(['addressList', 'activeIndex'])
  }
}
