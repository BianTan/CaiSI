<template>
  <div class="home-background">
    <background-color
      v-for="(item, index) of addressList"
      :key="item.city"
      :colors="item.colors"
      :active="unShow(index)"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BackgroundColor from './BackgroundColor'

export default {
  name: 'HomeBackground',
  components: {
    BackgroundColor
  },
  computed: {
    ...mapState(['addressList', 'activeIndex'])
  },
  methods: {
    /**
     * 判断是否开启定位天气展示
    */
    unShow(index) {
      if (this.$store.getters.getAddressList[0].unshow) {
        if (index <= this.$store.getters.getActiveIndex + 1) {
          return true
        }
      } else {
        if (index <= this.$store.getters.getActiveIndex) {
          return true
        }
      }
      return false
    }
  }
}
</script>

<style lang='scss' scoped>
.home-background {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
}
</style>
