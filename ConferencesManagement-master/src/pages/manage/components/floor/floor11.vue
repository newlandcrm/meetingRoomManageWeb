<template>
  <div>
    <router-view></router-view>
    <Bread-Crumb></Bread-Crumb>
    <div id="content1" style="margin:20px 10px;border:1px solid #005BAC">
      <img src="../../../../assets/images/floor/tu1.jpg" alt="园区" usemap="#Map1"/>
      <map name="Map1" id="Map1">
      <area alt="" title="" href="/floor12" shape="poly" coords="2,3,4,119,299,118,298,2" />
      </map>
    </div>
  </div>
</template>
 <script>
  import axios from 'axios'
  import BreadCrumb from '../../Breadcrumb'
  export default {
    name: 'floor11',
    components:{
      BreadCrumb
    },
    data() {
      return {

      };
    },
    methods: {

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
