<template>
  <div><router-view></router-view>
    <Bread-Crumb></Bread-Crumb>
    <div id="content2" style="margin:10px;position: absolute">
      <img src="../../../../assets/images/floor/Blou.jpg" alt="B楼" usemap="#Map2" width=100% height=100% />
      <img src="./cute.gif" id="Blou" v-if="flag"/>
      <map name="Map2" id="Map2">
      <area alt="" title="这里是3层，点击进入房间分布图" @click="goPage" shape="poly" coords="262,264,264,393,1250,403,1244,300" />
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
        return{
            flag:false
        }
      },
      methods:{
        start(){
            if(this.$route.params.roomId){
                this.flag = true
                setTimeout(() => {
                    this.$router.push({
                        name: '三楼会议室',
                        params: {roomId: this.$route.params.roomId},
                    })
                }, 3000);
            }
        },
          goPage(){
              this.$router.push({
                  name: '三楼会议室',
                  params: {roomId: this.$route.params.roomId},
              })
          },
      },
      mounted() {
        this.start()
      }
  }
</script>

<style scoped>
  #Blou {
    z-index: 10;
    margin-top: -73%;
    margin-left: 46%;
    position: relative;
  }
</style>
