<template>
  <transition name="show" @enter="handleEnter" @leave="handleLeave">
    <div class="cart-detail" v-if="!!selected">
      <nav-bar left="chevron-left" @leftClick="setunSelect()"/>
      <list-cart :liData="selected.liData"/>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import NavBar from '@/components/navbar/NavBar'
import ListCart from './ListCart'

export default {
  name: 'CartDetail',
  components: {
    NavBar,
    ListCart
  },
  computed: {
    ...mapState(['selected', 'unselect'])
  },
  methods: {
    ...mapMutations(['setunSelect']),
    handleEnter (el) {
      Object.assign(el.style, {
        top: `${this.selected.rect.top}px`,
        left: `${this.selected.rect.left}px`,
        width: `${this.selected.rect.width}px`,
        height: `${this.selected.rect.height}px`
      })
      setTimeout(() => {
        Object.assign(el.style, {
          top: 0,
          left: 0,
          width: `${this.selected.rect.appWidth}px`,
          height: `${this.selected.rect.appHeight}px`
        })
      }, 0)
    },
    handleLeave (el) {
      Object.assign(el.style, {
        top: 0,
        left: 0,
        width: `${this.unselect.rect.appWidth}px`,
        height: `${this.unselect.rect.appHeight}px`
      })
      setTimeout(() => {
        Object.assign(el.style, {
          top: `${this.unselect.rect.top}px`,
          left: `${this.unselect.rect.left}px`,
          width: `${this.unselect.rect.width}px`,
          height: `${this.unselect.rect.height}px`
        })
      }, 0)
    }
  }
}
</script>

<style lang='scss'>
.cart-detail {
  z-index: 10;
  position: fixed;
  border-radius: 0;
  background: white;
  will-change: top, left, width, height;
  .navbar {
    color: #666;
    transition: all .6s ease;
    z-index: 10;
    position: relative;
  }
  .list-cart {
    margin: 0;
    box-shadow: none;
    border-radius: 0;
    transition: all .6s ease;
    margin-top: -48px;
    .list-head,
    .list-body,
    .head-icon {
      transition: all .6s ease;
    }
    .list-head {
      height: 48px;
      padding: 0 20px;
      margin-left: 56px;
      .head-icon {
        opacity: 0;
      }
    }
  }
}
.show-enter-active,
.show-leave-active {
  transition: all .6s ease;
}
.show-enter,
.show-leave-to {
  border-radius: 8px;
  .navbar {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
  .list-cart {
    border-radius: 8px;
    .list-head {
      padding: 20px;
      height: auto;
      margin-left: 0;
      .head-icon {
        opacity: 1;
      }
    }
  }
}
.show-leave,
.show-enter-to {
  border-radius: 0;
  .navbar {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  .list-cart {
    .list-head {
      padding: 0 20px;
      height: 48px;
      margin-left: 56px;
      .head-icon {
        opacity: 0;
      }
    }
  }
}
</style>
