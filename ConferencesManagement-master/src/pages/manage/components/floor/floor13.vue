<template>
  <div>
    <router-view></router-view>
    <Bread-Crumb></Bread-Crumb>
    <div id="content3" style="margin:20px 10px;border:1px solid #005BAC">
    <img src="../../../../assets/images/floor/tu3.jpg" alt="B楼" usemap="#Map3"/>
    <map name="Map3" id="Map3">
    <area alt="" title="" href="#" shape="poly" coords="798,966,1062,1994,3522,1166,2750,458" />
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

<style scoped>

</style>

