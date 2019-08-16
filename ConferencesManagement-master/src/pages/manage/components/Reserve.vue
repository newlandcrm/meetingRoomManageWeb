<template>
  <div>
    <router-view></router-view>
    <Meetingroom></Meetingroom>
  </div>
</template>
<script>
  import Meetingroom from './echarts/meetingroom'

  export default {
    name: 'reserve',
    components:{
      Meetingroom,
    }
  }
</script>
<style lang="stylus" scoped>
</style>
