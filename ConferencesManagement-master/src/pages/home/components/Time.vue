<template>
  <div class="content">
    <div class="title">
      <h2>各个会议室的使用情况</h2>
      <span class="border-bottom"></span>
    </div>
    <div id="chart" style="width: 50%;height:50%;margin: 0 auto">
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import echarts from 'echarts';
  import 'echarts-gl'
  require('echarts/lib/chart/bar')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    name: 'HomeDetail',
    props: {
      list: Array
    },
    data() {
      return {
        hoverIndex: -1,
      }
    },
    methods: {
        getdata() {
            var myChart = this.$echarts.init(document.getElementById('chart'))
            var xData = ['a', 'b', 'c', 'd', 'e', 'f', 'g',]
            var days = ['']
            var data = [[0, 0, 5], [0, 1, 11], [0, 2, 3], [6, 3, 1], [6, 4, 2], [6, 5, 2], [6, 6, 6]]
            myChart.setOption({
                tooltip: {},
                visualMap: {
                    show: false,
                    max: 15,
                    inRange: {
                        color: ['#74b3ec', '#609ed5', '#488ecd',
                            '#3383c9', '#2175c0', '#126bba', '#015aaa']
                    }
                },
                //x轴显示
                xAxis3D: {
                    name: 'x', nameGap: 1, type: 'category', data: xData
                },
                //   ------   y轴  ----------
                yAxis3D: {
                    name: '', type: 'category', data: days
                },
                //   ------   z轴  ----------
                zAxis3D: {
                    name: '', type: 'value'
                },
                grid3D: {
                    boxWidth: 200,
                    bosDepth: 20,
                    viewControl: {
                        alpha: 0,
                        beta: 0
                    }
                },
                series: [
                    {
                        type: "bar3D",
                        data: data.map(function (item) {
                            return {
                                value: [item[1], item[0], item[2]],
                            }
                        }),
                        shading: 'lambert'
                    },]
            })
        },
        mounted() {
            this.getdata()
        },
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .content
    padding 100px 100px 50px 100px
    .title
      text-align center
    h2
      font-size 28px
      font-weight 600
      margin-bottom 10px
    .border-bottom
      position relative
      display block
      width 100px
      left 0
      right 0
      margin auto
      margin-bottom 50px
      border-bottom 1px solid #000
    .content-item
      position relative
      float left
      height 200px
      width 46%
      margin 10px 20px
      text-align center
      background-color #eee
      border-radius 4px
      overflow hidden
      display flex
      align-items center
      .item
        position absolute
        .item-img
          width 100%
        .iconfont-item
          display block
          font-size 50px
          color $bgColor
        .item-desc
          display block
          top 5px
          font-size 22px
        .ifUse
          position relative
          float right
          top -120px
          margin-right 10px
          .points
            display inline-block
            height 10px
            width 10px
            border-radius 5px
            margin-right 10px
          .green
            background-color green
          .red
            background-color red
        .showBtn
          margin-top 10px
          height 25px
          width 100px
          border-radius 5px
          color #fff
          font-weight bold
          cursor pointer
          background-color $bgColor
      .item-face
        width 100%
        color white
      .item-black
        height 200px
        width 100%
        background-color rgba(0, 0, 0, .4)
    .clear
      clear both
    .hoverBg
      cursor pointer
</style>
