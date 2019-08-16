<template>
    <div class="container">
      <el-card class="box-card" style="width: 80%;font-size: 18px;">
        <div slot="header" class="clearfix">
          <span>{{nickname}}</span>
          <el-button style="float: right; padding: 3px 0;font-size:18px" type="text" @click="editor">编辑</el-button>
        </div>
        <div>
          <el-form :label-position="labelPosition" label-width="120px" v-model="form" :inline="true">
            <el-form-item label="工号">
              <el-input v-model="form.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
              <el-input v-model="form.mobile"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="所属部门">
              <el-select v-model="select.value">
                <el-option
                  v-for="item in department"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <el-button  @click="sure('')" v-if="flag==1">确认</el-button>
      </el-card>
    </div>
</template>
<script>
  import axios from 'axios'
export default {
  name: 'CenterPerson',
  data() {
    return {
      flag:0,
      nickname:'',
      labelPosition: 'right',
      form: {
        username: '',
        mobile: '',
        email: ''
      },
      department:[],
      select:{value:''},
    }
  },
  computed:{

  },
  methods:{
    getUserInfo(){
      this.nickname = this.$store.state.nickname
      let params = this.$store.state.userid
      axios.get('http://localhost:9001/user/'+params)
        .then((res) => {
          if (res.data.code === 20000) {
            this.form = res.data.data
            this.select.value = res.data.data.department.name
          } else {
            this.$message({
              message: '网络连接失败！',
              type: 'danger'
            })
          }
        }).catch((error) => {
        console.log(error)
      })
    },
    getDepartmentInfo(){
      axios.get('http://localhost:9001/department')
        .then(res => {
          if(res.data.code === 20000){
            this.department=res.data.data
          }else{
            this.$message({
              message:'网络连接失败',
              type:'danger'
            })
          }
        }).catch(error => {
        this.$message({
          message:'连接异常',
          type:'danger'
        })
      })
    },
    editor(){
      this.flag = 1
    },
    sure(){
      let params = this.form
      let department={id:this.select.value}
      var key = "department";
      var value = department;
      params[key] = value;
      var userid = this.$store.state.userid
      axios.put('http://localhost:9001/user/'+userid,params)
        .then((res) => {
          if (res.data.code === 20000) {
            this.$message({
              message: '修改成功！',
              type: 'success'
            })
             this.flag = 0
          } else {
            this.$message({
              message: '修改失败！',
              type: 'danger'
            })
          }
        }).catch((error) => {
        console.log(error)
      })
    }
  },
  mounted(){
    this.getDepartmentInfo();
    this.getUserInfo();

  }
}
</script>
<style lang="stylus" scoped>
    @import '~styles/varibles.styl'
    .container
        padding 0 20px
    .text {
      font-size: 14px;
    }

    .item {
      margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }

    .box-card {
      width: 480px;
    }
</style>
