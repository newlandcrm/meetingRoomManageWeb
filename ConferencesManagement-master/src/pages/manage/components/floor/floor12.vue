<template>
  <div><router-view></router-view>
    <Bread-Crumb></Bread-Crumb>
    <div id="content2" style="margin:10px;border:1px solid #005BAC">
      <img src="../../../../assets/images/floor/Bhome.jpg" alt="B楼" usemap="#Map2"/>
      <map name="Map2" id="Map2">
      <area alt="" title="" href="/floor13" shape="poly" coords="31,422,22,609,1440,681,1435,415" />
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
