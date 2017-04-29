<template>
	<div>
    <!-- <p><a href="http://www.zcool.com.cn/work/ZMjA2OTk4NjA=.html" target='_blank'>设计</a></p> -->
    <div class="bg">
    <span class="cityName">广州</span>
    <div>
      <span>11度</span>
    </div>
    </div>
    <div id="main"></div>
	</div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'hello',
  data () {
    return {
      date: [],
      tpDayDate: [],
      tpNightDate: [],
      highTp: [],
      lowTp: []
    }
  },
  mounted () {
    var that = this
    var myChart = echarts.init(document.getElementById('main'))
    this.axios({
      method: 'get',
      url: 'v3/weather/daily.json',
      params: {
        key: 'oxdd3uvbxiizicfc',
        location: 'guangzhou',
        language: 'zh-Hans',
        unit: 'c',
        start: 0,
        days: 5

      }
    })
    .then(function (res) {
      // that.movieData = res.data.subjects
      console.log(res.data.results[0])
      res.data.results[0].daily.forEach(function (item, index) {
        console.log(item)
        that.date.push(item.date)
        that.tpDayDate.push(item.code_day)
        that.tpNightDate.push(item.code_night)
        that.highTp.push(item.high)
        that.lowTp.push(item.low)
      })
      // 绘制图表
      myChart.setOption({
        title: { text: '未来三天天气' },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['白天温度', '夜间温度', '最低温度', '最高温度']
        },
        xAxis: {
          data: that.date
        },
        yAxis: {},
        series: [{
          name: '白天温度',
          type: 'line',
          smooth: true,
          data: that.tpDayDate
        },
        {
          name: '夜间温度',
          type: 'line',
          smooth: true,
          data: that.tpNightDate
        },
        {
          name: '最低温度',
          type: 'line',
          smooth: true,
          data: that.highTp
        },
        {
          name: '最高温度',
          type: 'line',
          smooth: true,
          data: that.lowTp
        }]
      })
    })
    .catch(function (response) {
      console.log(response)
    })
  }
}
</script>

<style lang="scss">
	.bg {
    background-image: url('./images/bg.jpg');
    background-size: cover;
    height: 234px;

    .cityName {
      color: #fff;
    }
  }
  #main {
    width: 100%;
    height: 300px;
  }
</style>
