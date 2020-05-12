<template>
 <div>
  <div class="city">
    <el-card>
      <div slot="header">
        {{$t('commons.profit')}}({{$t('commons.tenThousand')}})
      </div>
      <ve-wordcloud :data="chartData" :settings="chartSettings"></ve-wordcloud>
    </el-card>
  </div>
 </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
const homeModule = createNamespacedHelpers('home')
const {mapActions:homeActions,mapState:homeState} = homeModule
 export default {
   data () {
     return {
        chartSettings: {
          sizeMin: 12,
          sizeMax: 20,
          color: ['#A1A5EE', '#79C7B7', '#8DC8EA', '#C4A1EE', '#96BF65', '#F5B168', '#F79C6F', '#00ffff', '#9f5f9f', '#855e42', '#ff5ec7']
        },
        chartData: {
          columns: ['city', 'value'],
          rows: []
        }
     }
   },
   components: {

   },
   methods: {
     ...homeActions(['getCityValue'])
   },
   mounted() {
     this.getCityValue().then(()=>{
       this.chartData.rows = this.citydata
     })
   },
   watch: {

   },
   computed: {
     ...homeState(['citydata'])
   }
 }
</script>

<style scoped lang='scss'>
.container {
  .city {
    overflow-y: hidden;
    height: 400px;
  }
}
.ve-wordcloud {
  top: -42px !important;
}
</style>