<template>
<div class="container box a-center space-center">
    <div class="card">
      <el-card>
        <div slot="header">
          账单详情
        </div>
        <div>
          <div class="desc box space-center" id="printContet">
            <div class="item">
              付款账户 : {{formInfo.payment}}
            </div>
            <div class="item">
              收款账户 : {{formInfo.collection}}
            </div>
            <div class="item">
              收款人姓名 : {{formInfo.name}}
            </div>
            <div class="item">
              收款金额 : {{formInfo.money}}元
            </div>
          </div>
          <div class="box spce-center">
            <el-button type="primary" @click="back">返回首页</el-button>
            <el-button v-print="'#printContet'" type="success">打印</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
 export default {
   data () {
     return {
       form:[]
     }
   },
   components: {

   },
   methods: {
     back(){
       this.$router.go('/')
     }
   },
   mounted() {
      this.form = JSON.parse(localStorage.formInfo)
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.container {
  height: 100vh;
  .card {
    width: 400px;
    height: 400px;
    .desc {
      background: #FAFAFA;
      width:400px;
      height: 200px;
      flex-direction: column;
      .item {
        margin: 10px;
      }
    }
  }
}
</style>