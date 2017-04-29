<template>
	<div>
    <p><a href="http://www.zcool.com.cn/work/ZMjA3NDAzMjg=.html" target='_blank'>设计</a></p>
		<p class="three">{{ msg }}</p>
		<audio :src="songUrl" autoplay controls id="audio"></audio>
	</div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'three',
      songUrl: ''
    }
  },
  mounted () {
    var that = this
    var getMusic = function () {
      return new Promise(function (resolve, reject) {
        that.axios({
          method: 'get',
          url: '/cloudmusic',
          params: {
            id: '436514312'
          }
        })
        .then(function (res) {
          // that.movieData = res.data.subjects
          console.log(res.data.data[0])
          that.songUrl = res.data.data[0].url
          resolve()
        })
        .catch(function (response) {
          console.log(response)
        })
      })
    }
    getMusic()
      .then(function () {
        var x = document.getElementById('audio')
        console.log(x.currentTime)
      })
  }
}
</script>

<style lang="scss">
	$color: #f0ccee;
	.three {
		color: $color;
	}
</style>
