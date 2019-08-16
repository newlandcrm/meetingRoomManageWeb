<template>
    <div class="content">
        <home-header></home-header>
        <step-confirm :date='date' :time='time' :boardroomId='boardroomId' ></step-confirm>
    </div>
</template>
<script>
import HomeHeader from '../home/components/Header'
import StepConfirm from './components/Confirm'
import axios from 'axios'
export default {
    name: 'Step',
    components:{
        HomeHeader,
        StepConfirm
    },
    data(){
        return{
          userName:'',
            // list:[],
            date:'',
            time:'',
            boardroomId:''
            // peopleList:[]
        }
    },
    created(){
        // this.userName = this.$store.state.username
        // var params = new URLSearchParams();
        // params.append('userName',this.userName );
        // axios.post('/getReservationEmployee',params)
        // .then(function(response){
        //     console.log(response)
        // })
        // .catch(function(error){
        //     console.log(error)
        // })
    },
    methods:{
        // getStepInfo(){
        //     // axios.get('static/mock/step.json')
        //     this.userName = this.$store.state.username
        //     var params = new URLSearchParams();
        //     params.append('userName',this.userName );
        //     axios.post('/getReservationEmployee',params)
        //     .then(this.getStepInfoSucc)
        // },
        // getStepInfoSucc(res){
        //     res = res.data
        //     if(res.code == 200){
        //         const data= res.data
        //         this.list = data.list
                // this.peopleList = data.peopleList
            // }
            
        // }

    },
    mounted(){
        // this.getStepInfo()
        this.date = this.$route.params.date
        this.time = this.$route.params.time
        this.boardroomId = this.$route.params.boardroomId
    }
}
</script>
<style lang="stylus" scoped>
</style>
