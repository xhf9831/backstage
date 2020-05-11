<template>
 <div>
  <el-breadcrumb separator=">" class="nav" style="padding-bottom: 30px;">
    <el-breadcrumb-item v-for="item in navs" :key="item.id" >
      {{ $t(`commons.${item.title}`)}}
    </el-breadcrumb-item>
  </el-breadcrumb>
 </div>
</template>

<script>
 export default {
   data () {
     return {
       navs:[]
     }
   },
   components: {

   },
   methods: {

   },
   mounted() {

   },
   created(){
      let matched = this.$route.matched
      if (this.$route.matched[0].meta.title !== '首页') {
        this.navs = [{
          title: 'dashboard'
        }]
      } else {
        this.navs = []
      }
      for (let i = 0; i < matched.length; i++) {
        if (matched[i].meta.title !== undefined) {
          this.navs.push({'title': matched[i].meta.enTitle})
        }
      }
   },
   watch: {
      '$route' (val, oldVal) {
        if (val.matched[0].meta.title !== '首页') {
          this.navs = [{
            title: 'dashboard'
          }]
        } else {
          this.navs = []
        }
        let matched = val.matched
        for (let i = 0; i < matched.length; i++) {
          if (matched[i].meta.title !== undefined) {
            this.navs.push({'title': matched[i].meta.enTitle})
          }
        }
      }
   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
  .el-breadcrumb__item__inner {
    cursor: default!important;
    &:hover {
      color: #48576a!important;
    }
  }
</style>