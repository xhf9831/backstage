<template>
 <div class="allcontent">
   <div class="bg"></div>
   <div class="container">
     <div class="title">
       XiaoAi Admin
     </div>
     <div class="content">
       这是一个炫酷的管理系统
     </div>
   </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
       
     }
   },
   components: {

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
.allcontent{
  margin: 0 auto;
  .bg{
    background: url('../assets/back.svg');
    width: 300px;
    height: 120px;
    margin: 0 auto;
  }
  .container{
    text-align: center;
    .title{
      font-size: 32px;
      color: #333;
      font-weight: 700;
    }
    .content{
      margin-top: 10px;
    }  
  }
}
</style>