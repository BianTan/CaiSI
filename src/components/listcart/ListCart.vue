<template>
  <transition @enter="handleEnter" @leave="handleLeave">
    <div :class="['list-cart', {'selected': selected}]" v-if="MixinGetObjKey(liData.data, 'skycon')">
      <div class="list-head" @click="headClick()">
        <span class="head-icon">
          <i
            class="fas fa-map-marker-alt"
            :style="{color: liData.colors[1]}"></i>
        </span>
        <p class="head-title">{{liData.city}}</p>
      </div>
      <div class="list-body">
        <div class="skycon"><i :class="['fas', skycon_icon(liData.data.skycon)]"></i>{{liData.data.skycon | skycon}}</div>
        <div class="temperature">
          <div class="box-left">{{liData.data.temperature | temperature}}</div>
          <div class="box-right">
            <div class="top">°</div>
            <div class="bottom">体感 {{liData.data.apparent_temperature | temperature}}°</div>
          </div>
        </div>
        <div class="more-info">
          <div class="direction" v-if="MixinGetObjKey(liData.data, 'wind', 'direction')">{{liData.data.wind.direction | windDir}}</div>
          <!-- <div class="speed">风速 {{liData.data.wind.speed}}</div> -->
          <div class="humidity">湿度 {{liData.data.humidity | humidity}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ListCart',
  data() {
    return {
      show: true
    }
  },
  props: {
    liData: {
      type: Object,
      default() {
        return {}
      }
    },
    selected: Boolean
  },
  methods: {
    skycon_icon(value) {
      let desc = ''
      switch (value) {
        case 'CLEAR_DAY':
          desc = 'sun' // （白天）
          break
        case 'CLEAR_NIGHT':
          desc = 'moon' // （夜间）
          break
        case 'PARTLY_CLOUDY_DAY':
          desc = 'cloud' // （白天）
          break
        case 'PARTLY_CLOUDY_NIGHT':
          desc = 'cloud' // （夜间）
          break
        case 'CLOUDY':
          desc = 'cloud-sun'
          break
        case 'LIGHT_HAZE':
          desc = 'smog'
          break
        case 'MODERATE_HAZE':
          desc = 'smog'
          break
        case 'HEAVY_HAZE':
          desc = 'smog'
          break
        case 'LIGHT_RAIN':
          desc = 'cloud-showers-heavy'
          break
        case 'MODERATE_RAIN':
          desc = 'cloud-showers-heavy'
          break
        case 'HEAVY_RAIN':
          desc = 'cloud-showers-heavy'
          break
        case 'STORM_RAIN':
          desc = 'poo-storm'
          break
        case 'FOG':
          desc = 'smog'
          break
        case 'LIGHT_SNOW':
          desc = 'snowflake'
          break
        case 'MODERATE_SNOW':
          desc = 'snowflake'
          break
        case 'HEAVY_SNOW':
          desc = 'snowflake'
          break
        case 'STORM_SNOW':
          desc = 'cloud-meatball'
          break
        case 'DUST':
          desc = 'wind'
          break
        case 'SAND':
          desc = 'wind'
          break
        case 'WIND':
          desc = 'wind'
          break
      }
      return 'fa-' + desc
    },
    /**
     * 判断是否存在数据(手动 ?. 2333)
    */
    MixinGetObjKey() {
      if (!arguments[0]) return ''
      let state = arguments[0]
      for (let i = 1; i < arguments.length; i++) {
        state = state[arguments[i]]
        if (!state) {
          state = ''
          return ''
        }
      }
      return state
    },
    /**
     * 顶部点击
     * 获取窗口与卡片大小&卡片 Left Top 距离，保存在 State
    */
    headClick() {
      if (this.liData.loading) { // 未加载完成时不触发
        return
      }
      const appRect = document.querySelector('#app').getBoundingClientRect()
      const elRect = this.$el.getBoundingClientRect()
      const liData = this.liData
      const rect = {}
      rect.top = elRect.top - appRect.top
      rect.left = elRect.left - appRect.left
      rect.width = elRect.width
      rect.height = elRect.height
      rect.appWidth = appRect.width
      rect.appHeight = appRect.height
      this.$store.commit('selectCart', { rect, liData })
    },
    handleEnter (el) {
      Object.assign(el.style, {
        opacity: '0'
      })
      setTimeout(() => {
        Object.assign(el.style, {
          opacity: '1'
        })
      }, 0)
    },
    handleLeave (el) {
      Object.assign(el.style, {
        opacity: '1'
      })
      setTimeout(() => {
        Object.assign(el.style, {
          opacity: '0'
        })
      }, 0)
    }
  },
  filters: {
    skycon(value) {
      let desc = ''
      switch (value) {
        case 'CLEAR_DAY':
          desc = '晴朗' // （白天）
          break
        case 'CLEAR_NIGHT':
          desc = '晴朗' // （夜间）
          break
        case 'PARTLY_CLOUDY_DAY':
          desc = '多云' // （白天）
          break
        case 'PARTLY_CLOUDY_NIGHT':
          desc = '多云' // （夜间）
          break
        case 'CLOUDY':
          desc = '阴'
          break
        case 'LIGHT_HAZE':
          desc = '轻度雾霾'
          break
        case 'MODERATE_HAZE':
          desc = '中度雾霾'
          break
        case 'HEAVY_HAZE':
          desc = '重度雾霾'
          break
        case 'LIGHT_RAIN':
          desc = '小雨'
          break
        case 'MODERATE_RAIN':
          desc = '中雨'
          break
        case 'HEAVY_RAIN':
          desc = '大雨'
          break
        case 'STORM_RAIN':
          desc = '暴雨'
          break
        case 'FOG':
          desc = '雾'
          break
        case 'LIGHT_SNOW':
          desc = '小雪'
          break
        case 'MODERATE_SNOW':
          desc = '中雪'
          break
        case 'HEAVY_SNOW':
          desc = '大雪'
          break
        case 'STORM_SNOW':
          desc = '暴雪'
          break
        case 'DUST':
          desc = '浮尘'
          break
        case 'SAND':
          desc = '沙尘'
          break
        case 'WIND':
          desc = '大风'
          break
      }
      return desc
    },
    temperature(value) {
      return Math.floor(value)
    },
    humidity(value) {
      return (value * 100).toFixed(0) + '%'
    },
    windDir(value) {
      if (value < 90) {
        return '东北风'
      } else if (value === 90) {
        return '东风'
      } else if (value < 180) {
        return '东南风'
      } else if (value === 180) {
        return '南风'
      } else if (value < 270) {
        return '西南风'
      } else if (value === 270) {
        return '西风'
      } else if (value < 360) {
        return '西北风'
      } else if (value === 360) {
        return '北风'
      }
    }
  },
  created() {
  },
  mounted() {
    /**
     * 等待动画效果结束取消动画 Class
    */
    if (!this.liData.loading) {
      setTimeout(() => {
        this.show = this.selected
      }, 600)
    }
  }
}
</script>

<style lang='scss' scoped>
.list-cart {
  width: 100%;
  height: 100%;
  margin: 0 12px;
  background: white;
  border-radius: 8px;
  padding-bottom: 64px;
  transition: all .6s ease;
  box-shadow: 0 10px 10px rgba(0, 0, 0, .24);
  .list-head {
    padding: 20px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    .head-icon {
      width: 36px;
      height: 36px;
      display: flex;
      border-radius: 50%;
      align-items: center;
      justify-content: center;
      border: 1px solid #e2e2e2;
    }
    .head-title {
      margin-left: 24px;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      flex: 1;
    }
  }
  .list-body {
    color: #3e3e3e;
    .skycon {
      margin-top: 32px;
      text-align: center;
      .fas {
        margin-right: 8px;
      }
    }
    .temperature {
      display: flex;
      margin: 20px 0;
      justify-content: center;
      .box-left {
        font-size: 96px;
      }
      .box-right {
        display: flex;
        flex-direction: column;
        position: relative;
        .top {
          font-size: 64px;
        }
        .bottom {
          position: absolute;
          bottom: 12px;
          width: 64px;
          right: -40px;
        }
      }
    }
    .more-info {
      display: flex;
      justify-content: center;
      div {
        margin: 0 4px;
      }
    }
  }
}
.selected {
  visibility: hidden;
}
.showCart {
  animation: showCart .6s;
  animation-fill-mode: forwards;
}
@keyframes showCart {
  from {
    opacity: 0;
    transform: translateY(48px)
  }
  to {
    opacity: 1;
    transform: translateY(0)
  }
}
</style>
