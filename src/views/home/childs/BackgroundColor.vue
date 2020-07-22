<template>
  <div
    :class="['background-color', {'bg-active': active}]"
    :style="{backgroundImage: gradientColor}" />
</template>

<script>
export default {
  name: 'BackgroundColor',
  props: {
    colors: {
      type: Array
    },
    active: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  computed: {
    gradientColor() {
      const colorBottom = `color-stop(30%, ${this.colors[0]})`
      const colorTop = `to(${this.colors[1]})`
      return `-webkit-gradient(linear, left bottom, left top, ${colorBottom}, ${colorTop})`
    }
  }
}
</script>

<style lang='scss' scoped>
.background-color {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease;
}
.bg-active {
  opacity: 1;
}
</style>
