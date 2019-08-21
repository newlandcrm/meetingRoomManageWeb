<template>
  <div>
    <router-view></router-view>
    <Bread-Crumb></Bread-Crumb>
    <div id="content3" style="margin:10px">
    <img src="../../../../assets/images/floor/3ceng1.jpg" alt="三楼" usemap="#Map3"/>
    <map name="Map3" id="Map3">
      <area alt="会议室1" title="会议室1" @click="goPage" shape="poly" coords="20,409,98,319,157,332,70,440" />
      <area alt="会议室2" title="会议室2" @click="goPage" shape="poly" coords="982,308,1114,326,1106,402,969,392" />
    </map>
  </div>
  </div>
</template>

<script>
  import BreadCrumb from '../../Breadcrumb'
  export default {
    name: "floor13",
    components:{
      BreadCrumb
    },
      data(){
          return{
              flag:false
          }
      },
      methods:{
          goPage(){
              this.$message({
                  message: '导航结束,如有疑问请联系管理员！',
                  type: 'danger'
              })
          },
      }
  }
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .header
    textStyle()
    font-size 24px
    font-weight 700
    margin-bottom 10px
</style>

