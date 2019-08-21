<template>
  <div>
    <router-view></router-view>
    <Bread-Crumb></Bread-Crumb>
    <div id="content1" style="margin:10px;" >
      <img src="../../../../assets/images/floor/yuanqu1.jpg" alt="园区" usemap="#Map1" style="background-size:cover;width:100%;height: auto;"/>
      <map name="Map1" id="Map1" runat="server">
        <area alt="dalou1" title="dalou2" @click="goPage" shape="poly" coords="610,263,612,332,706,372,881,321,889,260,784,219"
              id="hot1" ref="hot1" class="hot1" />
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

        goPage(){
            this.$router.push({
                name: '产业楼B楼三层',
                params: {},
            })
        },

      adjust() {
        var timeout = null;//onresize触发次数过多，设置定时器
        window.onresize = function () {
          clearTimeout(timeout);
          timeout = setTimeout(function () { window.location.reload(); }, 100);//页面大小变化，重新加载页面以刷新MAP
        }
        var map = document.getElementById("Map1");
        var element = map.childNodes;
        var itemNumber = element.length / 2;
        for (var i = 0; i < itemNumber - 1; i++) {
          var item = 2 * i + 1;
          var oldCoords = element[item].coords;
          var newcoords = this.adjustPosition(oldCoords);
          element[item].setAttribute("coords", newcoords);
        }
        var test = element;
      },

      //调整MAP中坐标
      adjustPosition(position) {
        var pageWidth = document.body.clientWidth;//获取页面宽度
        var pageHeith = document.body.clientHeight;//获取页面高度

        var imageWidth = 1160;    //图片的长宽
        var imageHeigth = 990;

        var each = position.split(",");
        //获取每个坐标点
        for (var i = 0; i < each.length; i++) {
          each[i] = Math.round(parseInt(each[i]) * pageWidth / imageWidth).toString();//x坐标
          i++;
          each[i] = Math.round(parseInt(each[i]) * pageHeith / imageHeigth).toString();//y坐标
        }
        //生成新的坐标点
        var newPosition = "";
        for (var i = 0; i < each.length; i++) {
          newPosition += each[i];
          if (i < each.length - 1) {
            newPosition += ",";
          }
        }
        return newPosition;
      }
    },
    mounted(){
      this.adjust();
    },
  }
</script>
<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .header
    textStyle()
    font-size 24px
    font-weight 700
    margin-bottom 10px
  #container {
    left: 0px;
    bottom: 0px;
    text-align: left;
    width:293px;
    background-repeat: no-repeat;
    height: 190px;
    border: 1px solid #000000;
  }
</style>
