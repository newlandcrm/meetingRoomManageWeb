<template>
    <div class="content">
        <home-header></home-header>
        <home-Time :list="list"></home-Time>
        <keep-alive>
            <!--<home-number></home-number>-->
        </keep-alive>
        <home-detail></home-detail>
      <div  class="xuanfu" id="moveDiv"
           @mousedown="down" @touchstart="down"
           @mousemove="move" @touchmove="move"
           @mouseup="end" @touchend="end"
      >
        这里是待办事项
      </div>
    </div>
</template>
<script>
import HomeHeader from './components/Header'
import HomeDetail from './components/Detail'
import HomeNumber from './components/Number'
import HomeTime from './components/Time'
import HomeFooter from './components/Footer'
import axios from 'axios'
export default {
    name: 'Home',
    components: {
        HomeHeader,
        HomeDetail,
        HomeNumber,
        HomeTime,
        HomeFooter
    },
    data () {
        return{
            list:[],
          flags: false,
          position: { x: 0, y: 0 },
          nx: '', ny: '', dx: '', dy: '', xPum: '', yPum: '',
            // number:{},
        }
    },
    methods:{
        getHomeInfo(){
            // axios.get('static/mock/room.json')
            // axios.post('/getBoardroom')
            // .then(this.getHomeInfoSucc)
        },
        getHomeInfoSucc (res) {
            res = res.data
            if(res.code == 200)
            {
                const data= res.data
                this.list = data
            }
        },
      // 实现移动端拖拽
      down(){
        this.flags = true;
        var touch;
        if(event.touches){
          touch = event.touches[0];
        }else {
          touch = event;
        }
        this.position.x = touch.clientX;
        this.position.y = touch.clientY;
        this.dx = moveDiv.offsetLeft;
        this.dy = moveDiv.offsetTop;
      },
      move(){
        if(this.flags){
          var touch ;
          if(event.touches){
            touch = event.touches[0];
          }else {
            touch = event;
          }
          this.nx = touch.clientX - this.position.x;
          this.ny = touch.clientY - this.position.y;
          this.xPum = this.dx+this.nx;
          this.yPum = this.dy+this.ny;
          moveDiv.style.left = this.xPum+"px";
          moveDiv.style.top = this.yPum +"px";
          //阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
          document.addEventListener("touchmove",function(){
            event.preventDefault();
          },false);
        }
      },
//鼠标释放时候的函数
      end(){
        this.flags = false;
      },
    },
        // getNumInfo(){
        //     axios.get('static/mock/number.json')
        //     .then(this.getNumInfoSucc)
        // },
        // getNumInfoSucc(res){
        //      res = res.data
        //      console.log(res)
        //     if(res.code == 200)
        //     {
        //         this.number = res
        //     }
        // }

    computed:{		
			userName() {
		        let localData = localStorage.username;
		        if(this.$store.state.username===undefined){
		          	this.$store.commit('changeUsername',localData)
		        }		       
		        return this.$store.state.username
             },
    },
    mounted(){
        this.getHomeInfo()
        // this.getNumInfo()
    }    
}
</script>
<style lang="stylus" scoped>
  .xuanfu {
    height: 4.5rem;
    width: 4.5rem;
    /* 如果碰到滑动问题，1.3 请检查 z-index。z-index需比web大一级*/
    z-index: 999;
    position: fixed;
    top: 4.2rem;
    right: 0.2rem;
    border-radius: 0.2rem;
    background-color: rgb(204, 228, 250);
  }
</style>
