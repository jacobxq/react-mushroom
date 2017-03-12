<template>
  <div>
    <div class="img">
      <img :src="detail.images.large" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      detail: ''
    }
  },
  mounted () {
    console.log(this.$route.query.movieId)
    var that = this
    this.axios({
      method: 'get',
      url: 'v2/movie/subject/' + that.$route.query.movieId,
      params: {
        city: '广州'
      }
    })
    .then(function (res) {
      console.log(res.data)
      that.detail = res.data
    })
    .catch(function (response) {
      console.log(response)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  .img {
    
  }
</style>
