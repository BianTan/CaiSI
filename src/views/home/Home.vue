<template>
  <div class="home">
    <!-- 菜单栏 ↓ -->
    <nav-bar left="bars" title="彩思天气" right="search" @rightClick="console.log('click')"/>
    <!-- 菜单栏 ↑ -->
    <!-- 用户信息 ↓ -->
    <div class="head">
      <home-head v-if="!addressList[activeIndex].loading"/>
    </div>
    <!-- 用户信息 ↑ -->
    <!-- 背景颜色 ↓ -->
    <home-background/>
    <!-- 背景颜色 ↑ -->
    <!-- 天气列表 ↓ -->
    <home-list/>
    <!-- 天气列表 ↑ -->
  </div>
</template>

<script>
import { AmapMixin } from 'common/mixin'
import NavBar from '@/components/navbar/NavBar'
import HomeHead from './childs/HomeHead'
import HomeBackground from './childs/HomeBackground'
import HomeList from './childs/HomeList'

export default {
  name: 'Home',
  mixins: [AmapMixin],
  components: {
    NavBar,
    HomeHead,
    HomeBackground,
    HomeList
  },
  created() {
    const list = this.addressList
    if (!list[0].unshow) { // 判断是否开启定位天气展示
      this.getLocation() // 获取定位信息
    }
    // 获取自定义添加地区天气信息数据
    for (let index in list) {
      if (index > 0) {
        this.getWeatherInfo(list[index].point.lng, list[index].point.lat, index)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  .head {
    min-height: 160px;
  }
}
</style>
