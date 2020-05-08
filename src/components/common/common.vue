<template>
 <div>
  <el-container>
    <el-aside width="200px"><left></left></el-aside>
    <el-container>
      <el-header><navhead></navhead></el-header>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
 </div>
</template>

<script>
import left from '../left/left';
import navhead from '../navhead/navhead';
 export default {
   data () {
     return {

     }
   },
   components: {
     left,
     navhead
   },
   methods: {

   },
   mounted() {

   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>

</style>