<template>
  <div :class="['home-list', {'cart-open': !!selected}]">
    <ul :style="{ 'width': `${length() * 100}%` }">
      <li
        v-for="(li, index) of addressList"
        v-show="unShowCart(index)"
        :key="li.city"
        :style="{ transform: `translateX(-${activeIndex * 100}%)` }">
        <list-cart
          v-if="unShowCart(index)"
          v-show="loadCart(li.loading)"
          :liData="li"
          :selected="selected && selected.liData === li"/>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import ListCart from '@/components/listcart/ListCart'

export default {
  name: 'HomeList',
  components: {
    ListCart
  },
  computed: {
    ...mapState(['addressList', 'activeIndex', 'selected'])
  },
  methods: {
    ...mapMutations(['nextLi', 'prevLi']),
    /**
     * 判断是否开启定位天气展示
    */
    unShowCart(index) {
      if (this.$store.getters.getAddressList[0].unshow) {
        if (index === 0) {
          return false
        }
      }
      return true
    },
    /**
     * 判断是否开启定位天气展示，以此设定长度
    */
    length() {
      if (this.$store.getters.getAddressList[0].unshow) {
        return this.$store.getters.getAddressList.length - 1
      } else {
        return this.$store.getters.getAddressList.length
      }
    },
    /**
     * 设定 listCart 是否显示，防止数据加载后造成再次加载展示动画
    */
    loadCart(value) {
      return !value
    }
  },
  mounted() {
    /**
     * 滑动切换功能
    */
    let touch = {}
    // 触摸操作
    this.$el.addEventListener('touchstart', e => {
      touch.startX = e.touches[0].clientX
    })
    this.$el.addEventListener('touchmove', e => {
      touch.endX = e.touches[0].clientX
    })
    this.$el.addEventListener('touchend', () => {
      if (!touch.endX || Math.abs(touch.endX - touch.startX) < 50) {
        return
      }
      if (touch.startX > touch.endX) {
        this.nextLi()
      } else {
        this.prevLi()
      }
    })
    // 鼠标操作
    this.$el.addEventListener('mousedown', e => {
      touch.startX = e.clientX
      this.$el.addEventListener('mousemove', e => {
        touch.endX = e.clientX
      })
    })
    this.$el.addEventListener('mouseup', () => {
      if (!touch.endX || Math.abs(touch.endX - touch.startX) < 50) {
        return
      }
      if (touch.startX > touch.endX) {
        this.nextLi()
      } else {
        this.prevLi()
      }
    })
  }
}
</script>

<style lang='scss' scoped>
.home-list {
  flex: 1;
  padding: 0 24px;
  transition: all 0.5s ease;
  li {
    transition: all 0.5s ease;
  }
  ul,
  ul > li {
    // height: 100%;
    display: flex;
    flex: 1;
  }
}
.cart-open {
  transform: scale(1.15)
}
</style>
