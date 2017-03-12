import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/index'
import movieIndex from '@/components/movie/index'
import movieDetail from '@/components/movie/movieDetail'
import weatherIndex from '@/components/weather/index'
import musicIndex from '@/components/music/index'

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
