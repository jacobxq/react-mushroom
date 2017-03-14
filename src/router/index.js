import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home/index'
import movieIndex from '@/views/movie/index'
import movieDetail from '@/views/movie/movieDetail'
import weatherIndex from '@/views/weather/index'
import musicIndex from '@/views/music/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/movie',
      name: 'movie',
      component: movieIndex
    },
    {
      path: '/movie/detail',
      name: 'movieDetail',
      component: movieDetail
    },
    {
      path: '/weather',
      name: 'weather',
      component: weatherIndex
    },
    {
      path: '/music',
      name: 'music',
      component: musicIndex
    }
  ]
})
