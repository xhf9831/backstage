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
    <div class="box">
      <el-button type="primary" size="small" v-if="!flag" @click="change(true)">批量转正申请</el-button>
      <el-button type="primary" size="small" v-if="flag" @click="sure">确认</el-button>
      <el-button type="primary" size="small" v-if="flag" @click="change(false)">取消</el-button>
      <el-button type="primary" size="small">导出</el-button>
    </div>
  </div>
 </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
const userModule = createNamespacedHelpers('userInfo')
const {mapActions:userActions,mapState:userState} = userModule
 export default {
   data () {
     return {
       icon:'',
       title:'',
       flag:false
     }
   },
   components: {

   },
   methods: {
     ...userActions(['getInfo']),
     change(data){
       this.flag = data
     },
     sure(){

     }
   },
   mounted() {
    this.icon = this.$route.meta.icon
    this.title = this.$route.meta.enTitle
    this.getInfo()
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