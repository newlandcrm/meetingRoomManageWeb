<template>
    <div class="content">
        <div class="container">
          <span class="title" style="font-size:27px;">注册</span>
            <div class="basicInfo">
                <el-form ref="form" :model="form" :rules="rules"  label-width="80px" class="demo-ruleForm">
                    <el-form-item label="姓名" prop="nickname">
                        <el-input v-model="form.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="工号" prop="username">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="mobile">
                        <el-input v-model="form.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                      <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item  label="部门" prop="value">
                      <el-select v-model="select.value">
                        <el-option
                          v-for="item in department"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="密码" prop="password"  autocomplete="off">
                        <el-input type="password" v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass"  autocomplete="off">
                        <el-input type="password" v-model="form.checkPass"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <el-button style="margin-left: 9vw;" @click="register('form')">提交</el-button>
        </div>
    </div>
</template>
<script>

import axios from 'axios'
export default {
    name: 'SignSignup',
     data() {
        // var checkContact = (rule, value, callback) => {
        //      if(!value) {
        //          return callback(new Error('联系方式不能为空'))
        //      }
        //       setTimeout(() => {
        //         if (!value.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)) {
        //             callback(new Error('请输入正确的手机号'));
        //         } else {
        //             callback()
        //         }
        //     }, 1000);
        // }
        // var checkName = (rule, value, callback) => {
        //     if(!value){
        //         return callback(new Error('名字不能为空'))
        //     }
        //     setTimeout(() => {
        //         if(value.length<=1 || value.length>4){
        //             callback(new Error('请输入正确的名字'))
        //         }else{
        //             callback();
        //         }
        //     })
        // }
        // var checkId = (rule, value, callback) => {
        //     var data = value
        //     if(!value){
        //         return callback(new Error('工号不能为空'))
        //     }
        //
        // }
        // var checkPassword = (rule, value, callback) => {
        //     if(!value){
        //         return callback(new Error('密码不能为空'))
        //     }
        //     setTimeout(() => {
        //         if(!value.match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/)){
        //             callback(new Error('密码至少包含英文和数字两种字符'))
        //         }else {
        //             if(value.length < 8){
        //                 callback(new Error('密码至少8位'))
        //             }else{
        //                 callback()
        //             }
        //         }
        //     },1000)
        // }
        var checkPass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.form.password) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        }
        // var checkDepartment = (rule, value, callback) =>{
        //     if(!value){
        //         return callback(new Error('请选择部门'))
        //     }else{
        //         callback()
        //     }
        //
        // }
      return {
        department:[],
        img:'',
        form: {
          nickname: '',
          username: '',
          mobile: '',
          email: '',
          password:'',
          checkPass: '',
        },
        select:{value:''},
        rules: {
        //     mobile:[
        //         {validator: checkContact, trigger: 'blur' }
        //     ],
        //     nickname:[
        //         {validator: checkName, trigger: 'blur' }
        //     ],
        //     username:[
        //         {validator:checkId, trigger:'blur'}
        //     ],
        //     pass:[
        //         {validator:checkPassword, trigger:'blur'}
        //     ],
            checkPass:[
                {validator:checkPass, trigger:'blur'}
            ],
        //     value:[
        //         {validator:checkDepartment, trigger:'change'}
        //     ]
        }

      };
    },
    methods: {
      getDepartment(){
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
      register(form){
        let myData = this.form
        let department={id:this.select.value}
        var key = "department";
        var value = department
        myData[key] = value;
        this.$refs[form].validate((valid) => {
          if (valid) {
            axios.post('http://localhost:9001/user/register',myData)
              .then(res => {
                if(res.data.code === 20000){
                    this.$message({
                        message:'注册成功!',
                        type:'success'
                    })
                    this.$router.push({
                        path: '/log'
                    })
                }
                else if(res.data.message === '该用户已存在!'){
                  this.$message({
                    message:'该用户已存在!',
                    type:'danger'
                  })
                }else{
                  this.$message({
                    message:'注册失败!',
                    type:'danger'
                  })
                }
              }).catch(error => {
              this.$message({
                message:'网络异常!',
                type:'danger'
              })
              console.log(error)
            })
          } else {
            return false;
          }
        });

      }
    },
  mounted(){
    this.getDepartment()
  },

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
        .container
            position absolute
            width 600px
            height 80%
            left 0
            right 0
            top 0
            bottom 0
            margin auto
            padding 50px
            background-color rgba(255,255,255,.7)
            border-radius 4px
            .basicInfo
                padding 50px
                height 420px
</style>
