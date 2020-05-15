<template>
 <div class="container">
  <div class="head box space-between a-center">
    <div class="top box a-center">
      <div class="icon box space-center a-center">
        <i :class="icon"></i>
      </div>
      <div class="title">
        {{$t(`commons.${title}`)}}
      </div>
    </div>
  </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
       icon:'',
       title:''
     }
   },
   components: {

   },
   methods: {

   },
   mounted() {
     this.icon = this.$route.meta.icon
     this.title = this.$route.meta.enTitle
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.container {
  .head {
    .top {
      .title {
        font-weight: 700;
        margin-left: 8px;
      }
      .icon {
        background: #38BA72;
        color: #fff;
        height: 24px;
        width: 16px;
        padding: 0 5px;
      }
    }
  }
}
</style>