<template>
  <div class="content">
    <home-header></home-header>
    <keep-alive>
      <home-number></home-number>
    </keep-alive>
    <div class="xuanfu" id="moveDiv"
         @mousedown="down" @touchstart="down"
         @mousemove="move" @touchmove="move"
         @mouseup="end" @touchend="end"
         v-if="show"
    >
      <p style="margin: 6px;color: #005BAC;font-size: 17px">代办事项</p>
      <p v-if="flag" style="font-size: 18px;text-align: center;line-height: 40px">暂无代办事项</p>
      <ul id="daiban">
        <li v-for="item in roomReserve" class="el-icon-message-solid" style="margin: 3px" @click="goto('item')">
          {{ item.starttime }}——{{item.name}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
    import HomeHeader from './components/Header'
    import HomeNumber from './components/Number'
    import HomeFooter from './components/Footer'
    import axios from 'axios'

    export default {
        name: 'Home',
        components: {
            HomeHeader,
            HomeNumber,
            HomeFooter
        },
        data() {
            return {
                roomReserve: [],
                flag: true,
                show: false
            }
        },
        methods: {
            getRoomReserve() {
                if (this.$store.state.userid) {
                    this.show = true
                    var timestamp = new Date().getTime()
                    let params = {
                        userid: this.$store.state.userid
                    }
                    axios.post('http://localhost:9001/roomReserve/search', params)
                        .then((res) => {
                            if (res.data.code === 20000) {
                                if (res.data.data) {
                                    this.flag = false
                                    for (var i = 0; i < res.data.data.length; i++) {
                                        if (timestamp < res.data.data[i].startdate) {
                                            var startdate = this.timestampToTime(res.data.data[i].startdate)
                                            this.roomReserve.push({
                                                starttime: startdate,
                                                name: res.data.data[i].room.name
                                            })
                                        } else {
                                            return false
                                        }
                                    }
                                }
                            } else {
                                this.$message({
                                    message: '网络连接失败！',
                                    type: 'danger'
                                })
                            }
                        }).catch((error) => {
                        console.log(error)
                    })
                }
            },
            goto(item) {
                this.$router.push({
                    name: 'Already',
                    params: {},
                })
            },
            // 实现移动端拖拽
            down() {
                this.flags = true;
                var touch;
                if (event.touches) {
                    touch = event.touches[0];
                } else {
                    touch = event;
                }
                this.position.x = touch.clientX;
                this.position.y = touch.clientY;
                this.dx = moveDiv.offsetLeft;
                this.dy = moveDiv.offsetTop;
            },
            move() {
                if (this.flags) {
                    var touch;
                    if (event.touches) {
                        touch = event.touches[0];
                    } else {
                        touch = event;
                    }
                    this.nx = touch.clientX - this.position.x;
                    this.ny = touch.clientY - this.position.y;
                    this.xPum = this.dx + this.nx;
                    this.yPum = this.dy + this.ny;
                    moveDiv.style.left = this.xPum + "px";
                    moveDiv.style.top = this.yPum + "px";
                    //阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
                    document.addEventListener("touchmove", function () {
                        event.preventDefault();
                    }, false);
                }
            },
//鼠标释放时候的函数
            end() {
                this.flags = false;
            },
            //时间格式化
            timestampToTime(timestamp) {
                var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D = date.getDate() + ' ';
                var h = date.getHours() + ':';
                var m = date.getMinutes() + ':';
                var s = date.getSeconds();
                return Y + M + D + h + m + s;
            }
        },


        computed: {},
        mounted() {
            this.getRoomReserve()
        }
    }
</script>
<style lang="stylus" scoped>
  .xuanfu {
    height: 2rem;
    width: 5.4rem;
    /* 如果碰到滑动问题，1.3 请检查 z-index。z-index需比web大一级*/
    z-index: 999;
    position: fixed;
    top: 3.4rem;
    right: 0.2rem;
    border-radius: 0.2rem;
    /*  background-color: rgb(204, 228, 250);*/
    border 1px solid #005BAC
  }

  .el-icon-message-solid:before {
    content: "\E799";
    color: red;
    font-size 16px
  }
</style>
