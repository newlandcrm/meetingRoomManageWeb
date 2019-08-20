<template>
  <div><router-view></router-view>
    <Bread-Crumb></Bread-Crumb>
    <div id="content2" style="margin:10px;border:1px solid #005BAC">
      <img src="../../../../assets/images/floor/Blou.jpg" alt="B楼" usemap="#Map2"/>
      <map name="Map2" id="Map2">
      <area alt="" title="" @click="goPage" shape="poly" coords="262,264,264,393,1250,403,1244,300" />
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
      data(){
        return{}
      },
      methods:{
          goPage(){
              this.$router.push({
                  name: 'Floor13',
                  params: { },
              })
          },
      }
  }
</script>

<style scoped>

</style>
