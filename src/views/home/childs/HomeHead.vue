<template>
  <div :class="['home-head', {'cart-open': !!selected}, {'showHead': show}]">
    <div class="avatar">
      <img src="~@/assets/images/avatar.jpg">
    </div>
    <div class="title">您好, BianDan</div>
    <div class="tips">{{tips | tips}}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HomeHead',
  data() {
    return {
      show: true
    }
  },
  computed: {
    /**
     * 获取 State 数据
    */
    ...mapState(['addressList', 'activeIndex', 'selected']),
    /**
     * 获取 tips 数据
    */
    tips() {
      const getAddressList = this.addressList
      const getActiveIndex = this.activeIndex
      if (getAddressList[0].unshow) { // 判断是否开启定位天气展示
        return getAddressList[getActiveIndex + 1].data.tips
      } else {
        return getAddressList[getActiveIndex].data.tips
      }
    }
  },
  mounted() {
    /**
     * 等待动画效果结束取消动画 Class
    */
    setTimeout(() => {
      this.show = this.selected
    }, 800)
  },
  filters: {
    /**
     * 设定 tips 数据未获取时的默值
    */
    tips(value) {
      if (!value) {
        return '您今天看起来不错~'
      } else {
        return value
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.home-head {
  margin: 40px;
  color: white;
  min-height: 160px;
  margin-bottom: 64px;
  transition: all .5s ease;
  opacity: 1;
  transform: translate(0, 0);
  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 6px 10px rgba(0, 0, 0, .16);
    img {
      width: auto;
      height: 100%;
    }
  }
  .title {
    font-weight: 300;
    font-size: 32px;
    margin-top: 38px;
    margin-bottom: 28px;
  }
  .tips {
    opacity: .8;
    font-size: 14px;
    font-weight: 300;
  }
}
.showHead {
  animation: showHead .8s;
  animation-fill-mode: forwards;
}
@keyframes showHead {
  from {
    opacity: 0;
    transform: translate(-42px, 0)
  }
  to {
    opacity: 1;
    transform: translate(0, 0)
  }
}
.cart-open {
  opacity: 0;
  transform: translate(0, 20px)
}
</style>
