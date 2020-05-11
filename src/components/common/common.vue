<template>
 <div>
  <el-container>
    <el-aside width="200px" :class="isCollapse? 'col':''"><left></left></el-aside>
    <el-container>
      <el-header><navhead></navhead></el-header>
      <el-main>
        <navcommon></navcommon>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
 </div>
</template>

<script>
import left from '../left/left';
import navhead from '../navhead/navhead';
import navcommon from '../navcommon/navcommon';
 export default {
   data () {
     return {
       isCollapse:false
     }
   },
   components: {
     left,
     navhead,
     navcommon
   },
   methods: {

   },
   mounted() {
    this.$bus.$on('toggle', data => {
      this.isCollapse = data
    })
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.col{
  width: auto !important;
  transition: width 1.5s !important;
}
</style>