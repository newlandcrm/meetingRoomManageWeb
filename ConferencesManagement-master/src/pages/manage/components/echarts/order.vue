<template>
  <div style="display: flex">

    <div height="500" width="600" style="margin:10px;">
      <div class="block">
        <div>
          <span class="demonstration">查看某日预约情况</span>
          <el-date-picker
            v-model="dateValue"
            @change="changeTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>

        <div>
          <el-tag type="success" style="margin: 10px 20px 0px 10px">通过审核</el-tag>
          <el-tag type="danger">未审核</el-tag>
        </div>
      </div>
      <canvas id="chart"> 你的浏览器不支持HTML5 canvas</canvas>
    </div>

    <div id="bottomarea">

      <el-form :model="form" ref="form" :rules="rules2" label-width="120px"
      >
        <el-form-item label="会议室名称" prop="name" ref="ron">
          <el-input :disabled="true" style="width: 200px;" v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属层" prop="floor">
          <el-input :disabled="true" style="width: 200px;" v-model="form.floor.describes"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属楼" prop="building">
          <el-input :disabled="true" style="width: 200px;" v-model="form.floor.building.name"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="容量" prop="capacity">
          <el-input :disabled="true" style="width: 200px;" v-model="form.capacity" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input :disabled="true" style="width: 200px;" v-model="form.addr" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="预约时间:">
          <el-date-picker
            v-model="form.value1"
            align="right"
            class="float"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>

        </el-form-item>
        <el-form-item label="会议内容" prop="content">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="会议内容"
            v-model="form.content">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">预约</el-button>
          <el-button type="primary" @click="searchPosition()">查看我的预约</el-button>
          <el-button type="primary" @click="dialogTableVisible = true">查看该会议室预约情况</el-button>
          <el-dialog :visible.sync="dialogTableVisible" @open="open()" width="70%">
            <el-table stripe :data="gridData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                      @selection-change="handleSelectionChange"

                      :header-cell-style="{
                      'background-color': '#fcffba',
                      'color': '#4b84bc',
                      'font-size': '16px',
                      'border-bottom': '1px yellow solid'
                  }"
            >
              <el-table-column property="user.nickname" label="预约人" width="100"></el-table-column>
              <el-table-column ref="startdate" property="startdate" label="开始时间" width="150">
                <template slot-scope="scope">{{ scope.row.startdate | formatDate}}</template>
              </el-table-column>
              <el-table-column ref="end" v-model="gridData.enddate" property="enddate" label="结束时间" width="150">
                <template slot-scope="scope">{{ scope.row.enddate | formatDate}}</template>
              </el-table-column>
              <el-table-column property="content" label="会议内容"></el-table-column>
              <el-table-column property="state" label="状态">
                <template slot-scope="scope">
                  <el-tag type effect="dark" v-if="scope.row.state==0">未审核</el-tag>
                  <el-tag type="success" effect="dark" v-if="scope.row.state==1">已通过</el-tag>
                  <el-tag type="danger" effect="dark" v-if="scope.row.state==2">未通过</el-tag>
                </template>
              </el-table-column>

            </el-table>
            <el-pagination background
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="currentPage"
                           :page-sizes="[5,10, 50, 100]"
                           :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="gridData.length">
            </el-pagination>
          </el-dialog>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
    import { formatTime } from '../../../../js/format.js'
    import clock from '../../../../js/clock.js'

    export default {
        name: 'order',
        data() {
            return {
                clockData: [],
                dateValue: '',
                dialogTableVisible: false,
                gridData: [],
                total: 5,
                currentPage: 1,
                pageSize: 5,
                form: {
                    name: '',
                    floorid: '',
                    floor: {
                        building: {
                            name: ''
                        }
                    },
                    capacity: '',
                    addr: '',
                    content: '',
                    state: '',
                    openstate: '',
                    userid: '',
                    value1: [],
                    number: ''
                },
                rules2: {

                    value1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    content: [
                        { required: true, message: '请填写会议内容', trigger: 'blur' }
                    ]
                }
            }
        },
        filters: {
            formatDate(val) {
                return formatTime(val, '{y}-{m}-{d} {h}:{i}')
            }
        },
        methods: {

            // 参数number为毫秒时间戳，format为需要转换成的日期格式
            time(time = +new Date()) {
                var date = new Date(time + 8 * 3600 * 1000) // 增加8小时
                return date.toJSON().substr(0, 19).replace('T', ' ')
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            handleSizeChange(val) {
                this.pageSize = val
                this.currentPage = 1
                this.fetchData(1, val)
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.fetchData(val, this.pageSize)
            },
            searchPosition(){
                this.$router.push({
                    name: 'Already',
                    params: { roomId: this.$route.params.roomId }
                })
            },
            //查看预约情况
            open() {
                var info = {
                    roomid: this.$route.params.roomId
                }
                var $this = this
                $.ajax({
                    type: 'post',
                    async: true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
                    url: 'http://localhost:9001/roomReserve/search',    //请求发送到TestServlet处
                    data: JSON.stringify(info),
                    dataType: 'json',
                    contentType: 'application/json',        //返回数据形式为json
                    success: function(result) {
                        $this.gridData = result.data
                    },
                    error: function(errorMsg) {
                        //请求失败时执行该函数
                        alert('图表请求数据失败!')
                    }
                })
            },

            //提交预约
            submitForm(formName) {
                var $this = this
                var reserveInfo = {
                    userid: this.$store.state.userid,
                    roomid: $this.$route.params.roomId,
                    content: $this.form.content,
                    time: $this.form.value1
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                        $.ajax({
                            type: 'post',
                            async: true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
                            url: 'http://localhost:9001/roomReserve/reserve',    //请求发送到TestServlet处
                            data: JSON.stringify(reserveInfo),
                            dataType: 'json',
                            contentType: 'application/json',        //返回数据形式为json
                            success: function(result) {
                                $this.$message({
                                    showClose: true,
                                    message: result.message,
                                    type: 'success'
                                })
                                $this.changeTime();
                            },
                            error: function(errorMsg) {
                                $this.$message({
                                    showClose: true,
                                    message: result.message,
                                    type: 'error'
                                })
                            }
                        })
                    } else {
                        alert('表单填写不正确!!');
                        return false;
                    }
                });

            },
            changeTime() {

                var info = {
                    roomid: this.$route.params.roomId,
                    time: this.dateValue
                }
                //查看当日会议室预约情况
                var $this = this
                $.ajax({
                    type: 'post',
                    async: true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
                    url: 'http://localhost:9001/roomReserve/roomReserveDayInfo',    //请求发送到TestServlet处
                    data: JSON.stringify(info),
                    dataType: 'json',
                    contentType: 'application/json',        //返回数据形式为json
                    success: function(result) {
                        // console.log(result.data)
                        $this.clockData = result.data
                        $this.clockData = []
                        for (var i = 0; i < result.data.length; i++) {
                            var dateArray = new Array()
                            // var dateArray = new Array(1,result.data[i].startdate.getHours()+":"+result.data[i].startdate.getMinutes(),result.data[i].enddate.getHours()+":"+result.data[i].enddate.getMinutes(),'',result.data[i].content);
                            dateArray[0] = result.data[i].id
                            dateArray[1] = new Date(result.data[i].startdate).getHours() + ':' + new Date(result.data[i].startdate).getMinutes()
                            dateArray[2] = new Date(result.data[i].enddate).getHours() + ':' + new Date(result.data[i].enddate).getMinutes()
                            dateArray[3] = ''
                            dateArray[4] = result.data[i].content
                            dateArray[5] = result.data[i].state
                            $this.clockData.push(dateArray)
                        }
                        // console.log($this.clockData)
                        clock($this.clockData)
                    },
                    error: function(errorMsg) {
                        //请求失败时执行该函数
                        alert('图表请求数据失败!')
                    }
                })

                //加载会议室楼层信息
                var roomId = this.$route.params.roomId
                $.ajax({
                    type: 'get',
                    async: true, //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
                    url: 'http://localhost:9001/room/' + roomId, //请求发送到TestServlet处
                    data: {},
                    dataType: 'json', //返回数据形式为json
                    success: function(result) {
                        $this.form = result.data
                    },
                    error: function(errorMsg) {
//请求失败时执行该函数
                        alert('图表请求数据失败!')
                        myChart.hideLoading()
                    }
                })
            }

        },
        mounted() {
            this.dateValue = new Date()
            this.dateValue.setHours(0)
            this.dateValue.setMinutes(0)
            this.dateValue.setSeconds(0)
            this.dateValue.setMilliseconds(0)
            this.changeTime()
        }
    }
</script>

<style scoped>
  .sub-title {
    color: #d13f2d;
    height: 18px;
  }
</style>
