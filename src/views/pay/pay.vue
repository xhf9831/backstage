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
  <div class="header">
    <div class="h-con box a-center space-between">
      <div class="h-title">
        {{month}} 薪酬预算
      </div>
      <div class="h-time">
        <el-date-picker
            :editable="false"
            v-model="selectMonth"
            type="month"
            :picker-options="pickerOptions"
            @change="changeMonth"
            placeholder="请选择月份">
        </el-date-picker>
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
       title:'',
       month:'',
       selectMonth:'',
       pickerOptions: {
          shortcuts: [{
            text: '本月',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '上月',
            onClick(picker) {
              const start = new Date();
              start.setMonth(start.getMonth() - 1);
              picker.$emit('pick', start);
            }
          }]
        },
     }
   },
   components: {

   },
   methods: {
     changeMonth(val){
       this.month = this.$dayjs(val).format('YYYY年MM月')
       console.log(this.month);
     }
   },
   mounted() {
     this.icon = this.$route.meta.icon
     this.title = this.$route.meta.enTitle
     this.selectMonth = this.month = this.$dayjs(new Date()).format('YYYY年MM月')
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
  .header {
  margin-top: 24px;
  background: #fff;
  .h-con {
    .h-title {
      font-size: 24px;
      font-weight: 700;
      padding-left: 15px;
      height: 80px;
      line-height: 80px;
    }
    .h-time {
      position: relative;
      right: 30px;
    }
  }
  .h-desc {
    background: #E5F2E1;
    height: 50px;
    line-height: 50px;
    padding-left: 15px;
    font-size: 14px;
  }
}
}
</style>