<template>
  <div>
    <router-view></router-view>
    <Bread-Crumb></Bread-Crumb>
    <div id="content3" style="margin:10px;border:1px solid #005BAC">
    <img src="../../../../assets/images/floor/3ceng.jpg" alt="三楼" usemap="#Map3"/>
    <map name="Map3" id="Map3">
      <area alt="会议室1" title="会议室1" href="/floor131?id=1159352944550875136" shape="poly" coords="294,576,357,718,454,678,475,671,447,541" />
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

