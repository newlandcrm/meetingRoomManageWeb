<template>
  <div>
    <router-view></router-view>
    <Bread-Crumb></Bread-Crumb>
    <div id="content3" style="margin:10px;border:1px solid #005BAC">
    <img src="../../../../assets/images/floor/3ceng.jpg" alt="三楼" usemap="#Map3"/>
    <map name="Map3" id="Map3">
<!--      <area alt="会议室1" title="会议室1" href="/order?id=111" shape="poly" coords="340,630,405,792,497,756,422,598" />-->
      <area alt="会议室1" title="会议室1" @click="goPage" shape="poly" coords="20,409,98,319,157,332,70,440" />
      <area alt="会议室2" title="会议室2" @click="goPage" shape="poly" coords="982,308,1114,326,1106,402,969,392" />
      <!--<area alt="" title="" href="#" shape="poly" coords="1022,401,1079,478,1213,425,1146,345" />-->
      <!--<area alt="" title="" href="#" shape="poly" coords="907,359,1073,294,1019,219,873,245,849,254" />-->
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
          return{}
      },
      methods:{
          goPage(){
              this.$router.push({
                  name: 'Order',
                  params: { },
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

