<template>
  <div class="content">
    <div class="bgBlack"></div>
    <div class="container">
      <span class="title">登录</span>
      <div style="margin: 20px;"></div>
      <el-form class="demo-ruleForm" :label-position="labelPosition" label-width="80px" :model="formLabelAlign"
               ref="formLabelAlign">
        <el-form-item label="工号" prop="username">
          <el-input v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formLabelAlign.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('formLabelAlign')">登录</el-button>
          <router-link class="infor" to="/sign" tag="span">没有账号？立即注册</router-link>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    name: 'LogLogin',
    data() {
      return {
        labelPosition: 'left',
        formLabelAlign: {
          username: '',
          password: '',
        }
      };
    },
    methods: {
      login(formLabelAlign) {
        let myData = this.formLabelAlign
        axios.post('http://localhost:9001/user/login', myData)
          .then(res => {
            if (res.data.code == 20000) {
              this.$message({
                message: '登录成功',
                type: 'success'
              })
              this.$store.commit('changeUserId', res.data.data.userid)
              this.$store.commit('changeToken', res.data.data.token)
              this.$store.commit('changeNickName', res.data.data.nickname)
                this.$router.push('/')
            } else {
              this.$message({
                message: '密码错误',
                type: 'warning'
              })
            }
          }).catch(error => {
          this.$message({
            message: '登录异常',
            type: 'warning'
          })
          console.log(error)
        })
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .content
    position relative
    height 100vh
    width 100vw
    background-image url('room.png')
    background-size 100% 100%
    background-attachment fixed
    .bgBlack
      height 100vh
      width 100vw
      background-color rgba(0, 0, 0, .4)
    .container
      position absolute
      height 200px
      width 400px
      left 0
      right 0
      top 0
      bottom 0
      margin auto
      padding 50px
      background-color rgba(255, 255, 255, .7)
      border-radius 4px
      .title
        textStyle()
        font-size 28px
      .demo-ruleForm
        .infor
          float right
          display inline-block
          cursor pointer

</style>
