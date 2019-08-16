<template>
  <div><router-view></router-view>
    <Bread-Crumb></Bread-Crumb>
    <div id="content2" style="margin:20px 10px;border:1px solid #005BAC">
      <img src="../../../../assets/images/floor/tu2.jpg" alt="B楼" usemap="#Map2"/>
      <map name="Map2" id="Map2">
      <area alt="" title="" href="/floor13" shape="poly" coords="4,0,0,119,299,116,292,2" />
      </map>
    </div>
  </div>
</template>

<script>
  import BreadCrumb from '../../Breadcrumb'
  export default {
    name: "floor12",
    components:{
      BreadCrumb
    },
  }
</script>

<style scoped>

</style>
