<template>
  <div >
    <home-header></home-header>
    <div class="content">
      <el-tabs :tab-position="tabPosition" v-model="activeName">
        <el-tab-pane label="会议室查询" name="first">
          <Center-Newsearch :list="searchRoom"></Center-Newsearch>
        </el-tab-pane>
        <el-tab-pane label="会议室预定" name="second">
          <Center-Reserve :list="reserveRoom"></Center-Reserve>
        </el-tab-pane>
        <el-tab-pane label="预定列表" name="three">
          <Center-Already :list="alreadyReserve"></Center-Already>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import HomeHeader from '../home/components/Header'
import SearchBackground from './components/Background'
import axios from 'axios'
import CenterNewsearch from './components/Newsearch'
import CenterReserve from './components/Reserve'
import CenterAlready from './components/Already'

export default {
    name: 'Search',
    components: {
        HomeHeader,
        SearchBackground,
      CenterNewsearch,
      CenterReserve,
      CenterAlready
    },
    data(){
        return{
          activeName: 'first',
          tabPosition: 'left',
            list:{},
          searchRoom:[],
          reserveRoom:[],
          alreadyReserve:[]
        }
    },
    methods:{
        getSearchInfo(){

            // axios.get('static/mock/free.json')
            // axios.post('/sortFreeRoom')
            // .then(this.getSearchInfoSucc)

        }
    },
    mounted(){
        this.getSearchInfo()
    }    
}
</script>
<style lang="stylus" scoped>
  .content
    padding 100px 100px
</style>
