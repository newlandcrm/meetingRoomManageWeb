<template>
    <div>
      <home-header></home-header>
      <manage-nav ></manage-nav>
    </div>
</template>
<script>
  import HomeHeader from '../home/components/Header'
import ManageNav from './components/Nav'

export default {
    name: 'Manage',
    components:{
        ManageNav,
        HomeHeader,
    }
}
</script>
<style lang="stylus" scoped>
</style>
