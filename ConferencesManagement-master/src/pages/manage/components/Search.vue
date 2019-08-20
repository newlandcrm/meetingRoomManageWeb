<template>
  <div>
    <router-view></router-view>
    <Floor11></Floor11>
  </div>
</template>
<script>
  import Floor11 from './floor/floor11'

  export default {
    name: 'search',
    components:{
      Floor11,
    }
  }
</script>
<style lang="stylus" scoped>
</style>
