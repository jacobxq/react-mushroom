<template>
	<div>
    <p><a href="http://www.zcool.com.cn/work/ZMjA2OTk4NjA=.html" target='_blank'>设计</a></p>
		<p class="first">first <span>page</span></p>
	</div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    // var that = this
    this.axios({
      method: 'get',
      url: 'v3/weather',
      params: {
        location: '阳江',
        output: 'json',
        ak: 'FiKkzFtskuqH7KVI1xALKeQG8UhICXcT'
      }
    })
    .then(function (res) {
      // that.movieData = res.data.subjects
      console.log(res.data.results[0])
    })
    .catch(function (response) {
      console.log(response)
    })
  }
}
</script>

<style lang="scss">
	.first {
		color: red;

		span {
			color: #ff00dd;
		}
	}
</style>
