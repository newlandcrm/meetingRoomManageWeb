<!--<template>-->
<!--  <div class="main">-->
<!--    <el-breadcrumb separator-class="el-icon-arrow-right">-->
<!--      <el-breadcrumb-item v-for="item in accountList"><span @click="nav(item)">{{item}}</span></el-breadcrumb-item>-->
<!--    </el-breadcrumb>-->
<!--    </Breadcrumb>-->
<!--    <button @click="dianji('楼')">我是楼</button>-->
<!--    <button @click="dianji('层')">我是层</button>-->
<!--    <button @click="dianji('房间')">我是房间</button>-->
<!--    <div id="content1">-->
<!--      <img src="./yuanqu.jpg" alt="园区" usemap="#Map1"/>-->
<!--      <map name="Map1" id="Map1">-->
<!--        &lt;!&ndash;<area alt="宏卓楼" title="宏卓楼" href="https://www.baidu.com/" shape="poly"&ndash;&gt;-->
<!--              &lt;!&ndash;coords="359,259,425,245,482,304,486,333,407,364,363,292"/>&ndash;&gt;-->
<!--        <area alt="B楼" title="B楼" href="/manage" shape="poly"-->
<!--              coords="424,363,584,317,639,369,640,409,474,472,426,395"/>-->
<!--        &lt;!&ndash;<area alt="" title="" href="https://www.baidu.com/" shape="poly"&ndash;&gt;-->
<!--              &lt;!&ndash;coords="791,381,754,397,746,434,877,551,912,528,934,486"/>&ndash;&gt;-->
<!--        &lt;!&ndash;<area alt="" title="" href="https://www.baidu.com/" shape="poly"&ndash;&gt;-->
<!--              &lt;!&ndash;coords="923,268,864,290,834,385,976,487,1029,458,1089,349"/>&ndash;&gt;-->
<!--        &lt;!&ndash;<area alt="" title="" href="https://www.baidu.com/" shape="poly"&ndash;&gt;-->
<!--              &lt;!&ndash;coords="493,255,570,223,632,271,545,318,492,271"/>&ndash;&gt;-->
<!--        &lt;!&ndash;<area alt="" title="" href="#" shape="poly" coords="616,300,723,264,823,328,821,342,708,383,616,316"/>&ndash;&gt;-->
<!--      </map>-->
<!--    </div>-->
<!--    <div id="content2">-->
<!--      <img src="./Bhome.jpg" alt="B楼" usemap="#Map2"/>-->
<!--      <map name="Map2" id="Map2">-->
<!--        <area alt="" title="" href="#content3" shape="poly" coords="31,422,22,609,1440,681,1435,415" />-->
<!--        &lt;!&ndash;<area alt="" title="" href="#" shape="poly" coords="32,412,1437,413,1437,236,37,242" />&ndash;&gt;-->
<!--      </map>-->
<!--    </div>-->
<!--    <div id="content3">-->
<!--      <img src="./3ceng.jpg" alt="B楼" usemap="#Map3"/>-->
<!--      <map name="Map3" id="Map3">-->
<!--        <area alt="" title="" href="#content1" shape="poly" coords="798,966,1062,1994,3522,1166,2750,458" />-->
<!--      </map>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<!--<script src="../../js/jquery.rwdImageMaps.js"></script>-->
<!--<script>-->

<!--  export default {-->
<!--    data() {-->
<!--      return {-->
<!--        accountList: []-->
<!--      };-->
<!--    },-->
<!--    methods: {-->
<!--      dianji(name) {-->
<!--        if (this.accountList.indexOf(name) == -1) {  // 判断这个账号在不在账号数组里面，不在的情况下-->
<!--          this.accountList.push(name) // 就push到账号数组-->
<!--        }-->
<!--      },-->
<!--      nav(item) {-->
<!--        let end = this.accountList.indexOf(item); // 定义一个变量等于传入的下标-->
<!--        this.accountList = this.accountList.slice(0, end + 1); // 利用这个下标对数组进行更新-->
<!--        // this.search(account)-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--</script>-->


<!--<style scoped>-->
<!--</style>-->
