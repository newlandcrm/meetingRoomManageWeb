<template>
  <div style="display: flex" width="1000px">

    <div id="main" style="width: 700px;height:600px;background-color: rgba(211,220,230,0.19)">
    </div>


    <div style="width: 480px">
      <div class="table">
        <div class="search-Box" style="margin-bottom: 20px">
          <el-row>
            <el-col :span="20">
              <el-date-picker
                v-model="time"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="search">搜索</el-button>
            </el-col>
          </el-row>
        </div>
        <el-table :header-cell-style="{
                      'background-color': '#fcffba',
                      'color': '#4b84bc',
                      'font-size': '16px',
                      'border-bottom': '1px yellow solid'
                  }" :data="tables" border style="width: 100%">
          <el-table-column prop="name" label="会议室名字"></el-table-column>
          <el-table-column prop="capacity" label="容量"></el-table-column>
          <el-table-column prop="addr" label="地址"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">预约
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
    import BreadCrumb from '../../Breadcrumb'

    export default {
        name: 'meetingroom',
        components: {
            BreadCrumb
        },
        data() {
            return {
                tables: [],
                time: []
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(row.id)
                this.$router.push({
                    name: 'Order',
                    params: {roomId: row.id}
                })
            },
            search() {
                var $this = this
                var timeinfo = {
                    time: $this.time
                }

                $.ajax({
                    type: 'post',
                    async: true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
                    url: 'http://localhost:9001/room/queryFreeRoom',    //请求发送到TestServlet处
                    data: JSON.stringify(timeinfo),
                    dataType: 'json',
                    contentType: 'application/json',        //返回数据形式为json
                    success: function (result) {
                        $this.tables = result.data
                    },
                    error: function (errorMsg) {
                        //请求失败时执行该函数
                        alert('搜索失败!')
                    }
                })
            },
            drawLine() {
                var myChart = this.$echarts.init(document.getElementById('main'))
                var struct_colors = [
                    '#e8b5be', '#d18269', '#737373', '#63adb4', '#8cc8af',
                    '#f59731', '#bfa29b', '#709f84', '#d88268'
                ]
                var RICH = {
                    name: {
                        color: '#f2e45c',
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
                myChart.showLoading()
                $.ajax({
                    type: 'get',
                    async: false,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
                    url: 'http://localhost:9001/building/getChildren',    //请求发送到TestServlet处
                    data: {},
                    dataType: 'json',        //返回数据形式为json
                    success: function (result) {
                        if (result) {
                            info2 = result.data
                        }
                        myChart.hideLoading()
                    },
                    error: function (errorMsg) {
                        //请求失败时执行该函数
                        alert('图表请求数据失败!')

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
                            // manage: children[prop].manage,
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
                        x:20,
                        y:20,
                        x2:20,
                        y2:20
                    },
                    tooltip: {
                        formatter: function (info) {
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
                                '<div class="tooltip-title">' + formatUtil.encodeHTML(treePath.join('/')) + '</div>'
                                // '<div>可容纳人数：' + asset_num + '</div>',
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
                                formatter: function (a) {
                                    // console.log('formatter==label=======', a);
                                    return '{name|' + a.name + '}' + '\n\n'
                                    // + '{basic|容纳人数 : ' + a.data.asset_num + '人}'

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
                                    borderColor: '#fff'
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
                        this.$router.push({
                            name: 'Order',
                            params: {roomId: param.data.id}
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
  canvas {
    width:600px;
    height: 600px;
    border:1px blueviolet solid;
  }
</style>
