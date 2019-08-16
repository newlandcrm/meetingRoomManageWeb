<template>
  <div>
    <router-view></router-view>
    <Bread-Crumb></Bread-Crumb>
  <div style="display: flex">
    <div id="main" style="width: 600px;height:600px;background-color: rgba(211,220,230,0.19)">
    </div>
    <div id="bottomarea">
      <el-form :model="form" ref="form" :rules="rules2" label-width="120px"
      >
        <el-form-item label="会议室名称" prop="name">
          <el-input :disabled="true" style="width: 200px;" v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属楼" prop="floor">
          <el-input :disabled="true" style="width: 200px;" v-model="form.floor.describes" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="容量" prop="capacity">
          <el-input :disabled="true" style="width: 200px;" v-model="form.capacity" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input :disabled="true" style="width: 200px;" v-model="form.addr" auto-complete="off"></el-input>
        </el-form-item>

        <!--<el-form-item label="开放状态" prop="openstate">-->
          <!--<el-input :disabled="true" style="width: 200px;" v-model="form.openstate" auto-complete="off"></el-input>-->
          <!--<div class="sub-title">0:未审核; 1:通过审核; 2:未通过审核; 3:已结束</div>-->
        <!--</el-form-item>-->
        <el-form-item label="申请人姓名:" prop="userid">
          <el-input style="width:200px;" v-model="form.user" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="申请人工号:" prop="number">
          <el-input style="width:200px;" v-model="form.number" auto-complete="off"></el-input>
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
          <!--<el-row style="padding-bottom: 20px;">-->
            <!--<el-col :span="5">-->
              <!--<el-form-item prop="value1">-->
                <!--<el-date-picker style="width:200px;"-->
                                <!--required="true"-->
                                <!--v-model="form.value1"-->
                                <!--type="date"-->
                                <!--placeholder="选择日期">-->
                <!--</el-date-picker>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          <!--</el-row>-->
          <!--<el-row :gutter="20">-->
            <!--<el-col :span="12">-->
              <!--<el-form-item prop="value2">-->
                <!--<el-time-picker style="width:200px;"-->
                                <!--v-model="form.startdate"-->
                                <!--:picker-options="{-->
      <!--selectableRange: '18:30:00 - 20:30:00'-->
    <!--}"-->
                                <!--placeholder="开始时间点">-->
                <!--</el-time-picker>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="12">-->
              <!--<el-form-item prop="value3">-->
                <!--<el-time-picker style="width:200px;"-->
                                <!--v-model="form.enddate"-->
                                <!--:picker-options="{-->
      <!--selectableRange: '18:30:00 - 20:30:00'-->
    <!--}"-->
                                <!--placeholder="结束时间点">-->
                <!--</el-time-picker>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          <!--</el-row>-->

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
          <el-button type="primary" @click="submitForm(form)">预约</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  </div>
</template>

<script>
  import BreadCrumb from '../../Breadcrumb'
  export default {
    name: 'order',
    components:{
      BreadCrumb
    },
    data() {
      return {
        form: {
          name: '',
          floorid: '',
          floor:{},
          building:{},
          capacity: '',
          addr: '',
          content:'',
          openstate: '',
          userid: '',
          value1: [],
          number: '',
          startdate: '',
          enddate: ''
        },
        rules2: {
          user: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          number: [
            { required: true, message: '请输入工号', trigger: 'blur' }
          ],
          value1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          startdate: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          enddate: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        alert(formName.value1)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      drawpie() {

        var worldMapContainer = document.getElementById('main')
        var myChart = this.$echarts.init(worldMapContainer)
        var option = {
          title: {
            text: '会议室预约情况',
            x: 'center',
            padding: 30,
            textStyle: {
              fontSize: 24,
              fontWeight: 400,
              color: '#2dbce7'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '60%',
              center: ['50%', '60%'],
              data: [
                { value: 335, name: '直接访问' },
                { value: 310, name: '邮件营销' },
                { value: 234, name: '联盟广告' },
                { value: 135, name: '视频广告' },
                { value: 1548, name: '搜索引擎' }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        myChart.setOption(option)

        var roomId = this.$route.params.roomId
        console.log(roomId)
        var self = this
        $.ajax({
          type: 'get',
          async: true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
          url : "http://localhost:9001/room/"+roomId,    //请求发送到TestServlet处
          data: {},
          dataType: 'json',        //返回数据形式为json
          success: function(result) {
            self.form = result.data
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
      this.drawpie()
    }
  }
</script>

<style scoped>
  .sub-title {
    color: #d13f2d;
    height: 18px;
  }
</style>
