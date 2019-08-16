<template>
  <div>
    <router-view></router-view>
    <Bread-Crumb></Bread-Crumb>
    <div id="main" style="width: 900px;height:600px;background-color: rgba(211,220,230,0.19)">
    </div>
  </div>
</template>

<script>
  import BreadCrumb from '../../Breadcrumb'

  export default {
    name: 'meetingroom',
    components:{
      BreadCrumb
    },
    methods: {
      drawLine() {
        var myChart = this.$echarts.init(document.getElementById('main'))
        var struct_colors = [
          '#c73437', '#2e4553', '#6e7073', '#5ba0a7', '#8cc8af',
          '#f59731', '#bfa29b', '#709f84', '#d88268'
        ]
        var RICH = {
          name: {
            color: '#fdfa3e',
            fontSize: 30,
            lineHeight: 30
          },
          basic: {
            color: '#fff',
            fontSize: 18,
            lineHeight: 18
          }
        }
        var info2 = {}

        $.ajax({
          type: 'get',
          async: false,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
          // url : "http://localhost:9001/building",    //请求发送到TestServlet处
          url: 'static/building.json',
          data: {},
          dataType: 'json',        //返回数据形式为json
          success: function(result) {
            if (result) {
              info2 = result
            }

          },
          error: function(errorMsg) {
            //请求失败时执行该函数
            alert('图表请求数据失败!')
            myChart.hideLoading()
          }
        })
        var structs_datas = []
        var formatUtil = this.$echarts.format

        function format_struct_data(children, structs_datas) {
          // 添加每个单位的颜色
          for (var prop in children) {
            var index = Math.floor(Math.random() * 20)
            var value = 1
            if (children[prop].asset_num !== 0) {
              value = children[prop].asset_num
            }
            var tmp = {
              name: children[prop].name,
              manage: children[prop].manage,
              children: [],
              asset_num: children[prop].asset_num,
              id: children[prop].id,
              value: value
            }
            format_struct_data(children[prop].children, tmp.children)
            if (tmp.children.length === 0) {
              delete tmp.children
            }
            structs_datas.push(tmp)
            // console.log(tmp)
            // return structs_datas;
          }
        }

        format_struct_data(info2.children, structs_datas)

        var position
        var option
        myChart.setOption(option = {
          title: {
            text: '',
            subtext: '',
            left: 'leafDepth'
          },
          grid: {
            left: '0%',
            top: '0%',
            right: '0%',
            bottom: '0%',
            containLabel: true
          },
          tooltip: {
            formatter: function(info) {
              // console.log('tool------', info);
              var asset_num = info.data.asset_num
              var name = info.name
              var id = info.id
              var treePathInfo = info.treePathInfo
              var treePath = []
              for (var i = 1; i < treePathInfo.length; i++) {
                treePath.push(treePathInfo[i].name)
              }
              return [
                '<div class="tooltip-title">' + formatUtil.encodeHTML(treePath.join('/')) + '</div>',
                '<div>可容纳人数：' + asset_num + '</div>',
              ].join('\n')
            }
          },
          series: [{
            name: '会议室平面图',
            type: 'treemap',
            visibleMin: 200,
            data: structs_datas,
            leafDepth: 1,
            roam: false,
            label: {
              normal: {
                show: true,
                position: 'insideTopLeft',
                formatter: function(a) {
                  // console.log('formatter==label=======', a);
                  return '{name|' + a.name + '}' + '\n\n' + '{basic|容纳人数 : ' + a.data.asset_num + '人}'

                },
                textStyle: {
                  // color: '',  label的字体颜色
                  fontSize: '18',
                  fontWeight: 'bold'
                },
                rich: RICH

              }
            },
            levels: [{
              itemStyle: {
                normal: {
                  borderWidth: 0,
                  gapWidth: 3,
                  borderColor: '#111'
                }
              }
            }, {
              itemStyle: {
                normal: {
                  gapWidth: 1,
                  borderColor: '#fff'
                }
              }
            }],
            breadcrumb: {
              show: true,
              height: 30,
              fontSize: 26,
              left: '10%',
              top: '3%',
              emptyItemWidth: 100,
              itemStyle: {
                normal: {
                  color: '#f8ece9',
                  borderColor: 'rgba(13,25,33,0)',
                  borderWidth: 1,
                  shadowColor: 'rgba(150,150,150,0)',
                  shadowBlur: 3,
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  textStyle: {
                    color: '#737373',
                    fontSize: 22,
                    fontWeight: 400
                  }
                },
                emphasis: {
                  textStyle: {}
                }
              }
            }
          }]

        })

        myChart.on('click', (param) => {
          if (param.data.children == null) {
            console.log('222222222222')
            this.$router.push({
              name: 'Order',
              params: { roomId: param.data.id },
            })
          }

        })
      }
    },
    mounted() {
      this.drawLine()
    }
  }
</script>

<style scoped>

</style>
