<template>
    <div class="container">
      <el-card class="box-card" style="width: 80%;font-size: 18px;">
        <div slot="header" class="clearfix">
          <span>重置密码</span>
        </div>
        <div>
          <el-form :label-position="labelPosition" label-width="120px" :model="form" ref="form" :inline="true" :rules="rules">
            <el-form-item label="原密码">
              <el-input v-model="form.oldpassword"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newpassword">
              <el-input v-model="form.newpassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="confirm">
              <el-input v-model="form.confirm" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <el-button  @click="reset('form')">确认</el-button>
      </el-card>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'reset',
     data() {
       var confirm = (rule, value, callback) => {
         if (value === '') {
           callback(new Error('请再次输入密码'));
         } else if (value !== this.form.newpassword) {
           callback(new Error('两次输入密码不一致!'));
         } else {
           callback();
         }
       }
      return {
         rules:{
           confirm: [
             {validator: confirm, trigger: 'blur'}
           ],
         },
        labelPosition: 'right',
        form:{
          newpassword:'',
          oldpassword:'',
          userid:'',
          confirm:''
        }
      }
     },
      methods: {
        reset(form) {
          if (this.form.newpassword != '') {
            this.$refs[form].validate((valid) => {
              if (valid) {
                this.form.userid = this.$store.state.userid
                let params = this.form
                axios.put('http://localhost:9001/user/password', params)
                  .then((res) => {
                    if (res.data.code === 20000) {
                      this.$message({
                        message: '重置密码成功！',
                        type: 'success'
                      })
                    }
                    else if(res.data.message === "密码错误"){
                      this.$message({
                        message: '原密码错误！',
                        type: 'warning'
                      })
                    }
                    else {
                      this.$message({
                        message: '重置密码失败',
                        type: 'danger'
                      })
                    }
                  }).catch((error) => {
                  console.log(error)
                })
              } else {
                return false;
              }
            });
          }else{
            this.$message({
              message: '密码不能为空！',
              type: 'danger'
            })
          }
        }
    }
}
</script>
<style lang="stylus" scoped>
    @import '~styles/varibles.styl'
    .container
        padding 0 100px
</style>
