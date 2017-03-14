<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      citys: '',
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    // var that = this
    this.axios({
      method: 'get',
      url: 'mayi/location/allCitys',
      params: {
        storeID: '7'
      }
    })
    .then(function (res) {
      console.log(res)
      // that.movieData = res.data
      // that.silideData = res.data.subjects.slice(0, 6)
      // that.loading = false
    })
    .catch(function (response) {
      console.log(response)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
