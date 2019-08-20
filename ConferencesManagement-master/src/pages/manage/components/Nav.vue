<template>
  <div style="padding-top:60px;margin-left:60px">
  <el-container>
                <el-row class="tac">
                    <el-menu
                    class="el-menu-vertical-demo"
                    active-text-color="#005BAC"
                    router :default-active="$route.path">
                    <el-menu-item index="/reserve" >
                        <span slot="title">会议室查询</span>
                    </el-menu-item>
                    <el-menu-item index="/search">
                        <span slot="title">会议室预定</span>
                    </el-menu-item>
                    <el-menu-item index="/already">
                        <span slot="title">已预定列表</span>
                    </el-menu-item>
                    </el-menu>
                </el-row>
                    <router-view></router-view>
        </el-container>
  </div>
</template>
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<script>

export default {
    name: 'ManageNav',
    data() {
      return {

      };
    },
    methods: {

    },
    mounted(){

    }
}
</script>
<style lang="stylus" scoped>
  .el-col-12{
    width: 15%;
  }
</style>
