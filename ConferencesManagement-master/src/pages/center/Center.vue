<template>
    <div >
        <home-header></home-header>
        <div class="content">
            <el-tabs :tab-position="tabPosition">
                <el-tab-pane label="个人中心">
                    <center-person :list="list"></center-person>
                </el-tab-pane>
                <el-tab-pane label="我的预定">
                    <center-process :list="processList"></center-process>
                </el-tab-pane>
              <el-tab-pane label="密码重置">
                <center-reset :list="resetList"></center-reset>
              </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import HomeHeader from '../home/components/Header'
import CenterPerson from './components/Person'
import CenterProcess from './components/Process'
import CenterReset from './components/Reset'
import axios from 'axios'
export default {
    name: 'Center',
    components:{
        HomeHeader,
        CenterPerson,
        CenterProcess,
        CenterReset
    },
    data() {
      return {
        tabPosition: 'left',
        list:[],
        processList:[],
        resetList:[],
        userid:''
      };
    },
    // methods:{
    //     getUserInfo(){
    //       this.userid = this.$store.state.userid
    //         // this.userName = this.$store.state.username
    //         // var params = new URLSearchParams();
    //         // params.append('userName',this.userName);
    //         // axios.get('static/mock/center.json')
    //         //  axios.post('/privateCenter')
    //         // .then(this.getCenterInfoSucc)
    //     },
    //     getCenterInfoSucc(res){
    //         res = res.data
    //         if(res.code == 200)
    //         {
    //             const data= res.data
    //             this.list = data.list
    //         }
    //     },
    //     getDeleteInfo(){
    //         //  axios.get('static/mock/delete.json')
    //         //  axios.post('/deleteReservation')
    //         // .then(this.getDeleteInfoSucc)
    //     },
    //     getDeleteInfoSucc(res){
    //          res = res.data
    //         if(res.code == 200)
    //         {
    //             const data= res.data
    //             this.cancelList = data.tableData
    //         }
    //     }
    // },
    // mounted(){
    //     this.getUserInfo()
    //     this.getDeleteInfo()
    // },
}
</script>
<style lang="stylus" scoped>
    .content
        padding 100px 160px
</style>
