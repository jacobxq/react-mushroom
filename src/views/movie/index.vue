<template>
	<div v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <p><a href="http://www.zcool.com.cn/work/ZMjA3MjI5MTY=.html" target='_blank'>设计</a></p>
    <template>
      <el-carousel :interval="4000" type="card" height="200px" arrow='never'>
        <el-carousel-item v-for="item in silideData" :key="item.id">
          <router-link :to="{ name: 'movieDetail', query: { movieId: item.id }}">
            <img :src="item.images.large" style="width: 100%" >
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </template>
    <div class="movie-box">
      <div class="movie-type">
        <a href="javascript:;" :class="{active: movieType == 'in_theaters'}" @click="getMovies('in_theaters')">正在热映</a>
        <a href="javascript:;" :class="{active: movieType == 'top250'}" @click="getMovies('top250')">Top250</a>
        <a href="javascript:;" :class="{active: movieType == 'coming_soon'}" @click="getMovies('coming_soon')">即将上映</a>
      </div>
      <div class="movie" v-for="item in movieData.subjects">
        <router-link :to="{ name: 'movieDetail', query: { movieId: item.id }}">
          <div class="movie-img">
            <img :src="item.images.medium" alt="">
          </div>
          <div class="movie-message">
            <h4 class="movie-title">{{item.title}}</h4>
            <div class="movie-details">
              <p>豆瓣评分：{{item.rating.average}}</p>
              <p>导演：{{item.directors[0].name}}</p>
              <p class="movie-casts">
                主演：
                <span v-for="nameItem in item.casts">
                  {{nameItem.name}}
                </span>
              </p>
              <p>
                类型：
                <span v-for="genres in item.genres">
                  {{genres}}
                </span>
              </p>
              <p>年份：{{ item.year }} </p>
            </div>
          </div>
        </router-link>
      </div>
      <el-pagination
        small
        :page-size="20"
        layout="prev, pager, next"
        :total="movieData.total"
        @current-change="getMovies"
        @click="">
      </el-pagination>
    </div>
	</div>
</template>

<script>
// import axios from 'axios'
// import $ from 'jquery'
export default {
  name: 'hello',
  data () {
    return {
      movieData: '',
      silideData: '',
      movieType: 'in_theaters',
      loading: true
    }
  },
  methods: {
    getMovies (type, currentPage) {
      var params = {
        city: '广州'
      }
      if (typeof type === 'number') {
        currentPage = type
        type = this.movieType
        params.start = (currentPage - 1) * 20
      }
      this.movieType = type
      this.loading = true
      var that = this
      // $.ajax({
      //   url: 'https://api.douban.com/v2/book/1220562',
      //   type: 'get',
      //   dataType: 'jsonp',
      //   success: function (res) {
      //     console.log(res)
      //   }
      // })
      // axios.get('/v2/book/1220562')
      // .then(function (res) {
      //   console.log(res)
      //   that.bookData = res.data.title
      // })
      // .catch(function (response) {
      //   console.log(response)
      // })
      // axios.get('v2/movie/in_theaters?city=广州')
      // .then(function (response) {
      //   console.log(response)
      // })
      // .catch(function (response) {
      //   console.log(response)
      // })
      this.axios({
        method: 'get',
        url: 'v2/movie/' + type,
        params: params
      })
      .then(function (res) {
        that.movieData = res.data
        that.loading = false
      })
      .catch(function (response) {
        console.log(response)
      })
    }
  },
  mounted () {
    var that = this
    this.axios({
      method: 'get',
      url: 'v2/movie/in_theaters',
      params: {
        city: '广州'
      }
    })
    .then(function (res) {
      that.movieData = res.data
      that.silideData = res.data.subjects.slice(0, 6)
      that.loading = false
    })
    .catch(function (response) {
      console.log(response)
    })
  },
  updated: () => {
    // console.log(2)
  }
}
</script>

<style scoped lang="less">
	.second {
		color: red;
	}
  .el-carousel--card {
    background-color: #EFF2F7;
  }
  .movie-box {
    padding: 0 10px 46px;

    .movie-type {
      display: flex;
      color: red;
      border: 1px solid red;
      border-radius: 5px;
      margin-top: 5px;

      a {
        flex: 1;
        font-size: 14px;
        color: red;
        border-right: 1px solid red;

        &:last-child {
          border-right: none;
        }

        &.active {
          color: #fff;
          background-color: red;
        }
      }
    }
    .movie {
      box-shadow: 1px 1px 10px #ccc;
      margin: 7px 0;
      border-radius: 5px;
      // background-color: #f0f0f0;
      
      a {
        display: flex;
        color: #333;

          .movie-img {
          flex: 1;

          img {
            display: block;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
          }
        }


        .movie-message {
          flex: 3;
          text-align: left;
          padding-left: 10px;
          position: relative;

          h4 {
            height: 30px;
            line-height: 30px;
          }

          .movie-details {
            position: absolute;
            bottom: 0;

            .movie-casts {
              display: -webkit-box;
              overflow: hidden;
              text-overflow: ellipsis;
              word-break: break-all;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            }

            p {
              font-size: 14px;
            }
          }
        }
      }
      
    }
  }
</style>
