<template>
  <div>
    <router-view></router-view>
    <Bread-Crumb></Bread-Crumb>
    <div id="content1" style="margin:20px 10px;border:1px solid #005BAC">
      <img src="../../../../assets/images/floor/tu1.jpg" alt="园区" usemap="#Map1"/>
      <map name="Map1" id="Map1">
        <area alt="dalou1" title="dalou2" href="/floor12" shape="poly" coords="424,363,584,317,639,369,640,409,474,472,426,395" target="_self"
              id="hot1" class="hot1" onmouseover="ahover('a1')"/>      </map>
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
      ahover(id){
        alert(document.getElementById(id).className);
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
</style>
