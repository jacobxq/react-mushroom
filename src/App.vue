<template>
  <div id="app">
    <div class="bar">
        <div class="bar-item" :class="{active: routerName == 'home'}" @click="render('home')">
          <router-link to="/"><i class="iconfont">&#xe603;</i>首页</router-link>
        </div>
        <div class="bar-item" :class="{active: routerName == 'weather'}" @click="render('weather')">
          <router-link to="/weather"><i class="iconfont">&#xe80d;</i>天气</router-link>
        </div>
        <div class="bar-item" :class="{active: routerName == 'movie'}" @click="render('movie')">
          <router-link to="/movie"><i class="iconfont">&#xe61e;</i>电影</router-link>
        </div>
        <div class="bar-item" :class="{active: routerName == 'music'}" @click="render('music')">
          <router-link to="/music"><i class="iconfont">&#xe618;</i>音乐</router-link>
        </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      routerName: ''
    }
  },
  methods: {
    render (data) {
      switch (data) {
        case 'home':
          this.routerName = 'home'
          break
        case 'weather':
          this.routerName = 'weather'
          break
        case 'music':
          this.routerName = 'music'
          break
        case 'movie':
          this.routerName = 'movie'
          break
      }
    }
  },
  mounted () {
    this.routerName = this.$route.path.substring(1) === '' ? 'home' : this.$route.path.substring(1)
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: 'iconfont';  /* project id 250625 */
  src: url('//at.alicdn.com/t/font_9fbkyl0irtua0pb9.eot');
  src: url('//at.alicdn.com/t/font_9fbkyl0irtua0pb9.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_9fbkyl0irtua0pb9.woff') format('woff'),
  url('//at.alicdn.com/t/font_9fbkyl0irtua0pb9.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_9fbkyl0irtua0pb9.svg#iconfont') format('svg');
}
.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
body {
  background: #f2f2f2;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.bar {
  display: flex;
  position: fixed;
  bottom: -4px;
  width: 100%;
  z-index: 1;
  line-height: 45px;
  background-color: #fff;
  box-shadow: 1px 1px 10px #000;
}

.bar {
  &-item {
    flex: 1;

    &.active {
      color: red;

      a {
        color: red;
      }
    }

    a {
      text-decoration: none;
      color: #999
    }
  }
}
</style>
