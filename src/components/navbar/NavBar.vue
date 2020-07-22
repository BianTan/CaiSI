<template>
  <div class="navbar">
    <span class="navbar_l" @click="$emit('leftClick')">
      <i v-if="left" :class="['fas', `fa-${left}`]"></i>
    </span>
    <p class="title">{{title}}</p>
    <span class="navbar_r" @click="$emit('rightClick')">
      <i v-if="right" :class="['fas', `fa-${right}`]"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    left: {
      type: String
    },
    title: {
      type: String
    },
    right: {
      type: String
    }
  }
}
</script>

<style lang='scss' scoped>
.navbar {
  display: flex;
  align-items: center;
  height: 48px;
  font-size: 15px;
  z-index: 1;
  color: white;
  .title {
    display: flex;
    justify-content: center;
    flex: 1;
    font-size: 18px;
  }
  span {
    width: 48px;
    height: 48px;
    text-align: center;
    i {
      line-height: 48px;
      cursor: pointer;
    }
  }
}
</style>
