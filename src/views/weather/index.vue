<template>
	<div>
    <!-- <p><a href="http://www.zcool.com.cn/work/ZMjA2OTk4NjA=.html" target='_blank'>设计</a></p> -->
    <div class="bg">
    <span class="cityName">广州</span>
    <div class="weather-msg">
      <span>{{lowTp[0]}}&deg;</span>
      <p>{{wind_direction}}</p>
      <p>{{text_day}}</p>
    </div>
    <div class="date">
      <p>{{weekDay}}</p>
      <p>{{today}}</p>
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
      highTp: [],
      lowTp: [],
      wind_direction: '',
      text_day: '',
      today: '',
      week: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      weekDay: ''
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
        that.highTp.push(item.high)
        that.lowTp.push(item.low)
        if (index === 0) {
          that.wind_direction = item.wind_direction
          that.text_day = item.text_day
        }
      })
      // 绘制图表
      myChart.setOption({
        // title: { text: '未来三天天气' },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['最低温度', '最高温度']
        },
        xAxis: {
          data: that.date
        },
        yAxis: {},
        series: [{
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

    var date = new Date()
    that.today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    that.weekDay = that.week[date.getDay()]
  }
}
</script>

<style lang="scss">
	.bg {
    background-image: url('./images/bg.jpg');
    background-size: cover;
    height: 234px;
    position: relative;
    padding-top: 20px;
    box-sizing: border-box;

    .cityName {
      color: #fff;
    }
    .weather-msg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      min-width: 150px;

      span {
        font-size: 30px;
        float: left;
      }

      p {
        font-size: 14px;
      }
    }

    .date {
      position: absolute;
      left: 10px;
      bottom: 10px;
      color: #fff;
    }
  }
  #main {
    width: 100%;
    height: 300px;
    margin-top: 10px;
  }
</style>
