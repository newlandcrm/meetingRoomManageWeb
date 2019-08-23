<template>
  <div>
    <router-view></router-view>
    <Bread-Crumb></Bread-Crumb>
    <div id="content3" style="margin:10px;position: absolute">
      <img src="../../../../assets/images/floor/3ceng.jpg" alt="三楼" usemap="#Map3" width=100% height=100%/>
      <img src="./cute.gif" id="room1" v-if="flag"/>
      <img src="./cute.gif" id="room2" v-if="show"/>
      <map name="Map3" id="Map3">
        <area alt="会议室1" title="这里就是会议室1" @click="goPage1" shape="poly" coords="0,203,144,212,92,432,0,419"/>
        <area alt="会议室2" title="这里就是会议室2" @click="goPage()" shape="poly" coords="840,155,1002,174,967,368,828,358"/>
      </map>
    </div>
  </div>
</template>

<script>
    import BreadCrumb from '../../Breadcrumb'

    export default {
        name: "floor13",
        components: {
            BreadCrumb
        },
        data() {
            return {
                flag: false,
                show: false
            }
        },
        methods: {
            start() {
                if (this.$route.params.roomId) {
                    if (this.$route.params.roomId === '1164730606500843520') {
                        this.flag = true
                        setTimeout(() => {
                            this.$alert('本次导航已结束，功能未完善请谅解', {
                                confirmButtonText: '确定',
                            });
                        }, 3000);
                    } else {
                        this.show = true
                        setTimeout(() => {
                            this.$alert('本次导航已结束，功能未完善请谅解', {
                                confirmButtonText: '确定',
                            });
                        }, 3000);
                    }
                }
            },
            goPage1() {
                this.$router.push({
                    name: 'Order',
                    params: {roomId: '1164730606500843520'},
                })
            },
            goPage() {
                this.$router.push({
                    name: 'Order',
                    params: {roomId: '1164730709752025088'},
                })
            },
        },
        mounted() {
            this.start()
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

  #room1 {
    z-index: 10;
    margin-top: -67%;
    position: relative;
  }

  #room2 {
    z-index: 10;
    margin-top: -72%;
    margin-left: 67%;
    position: relative;
  }
</style>

