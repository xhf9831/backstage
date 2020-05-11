<template>
 <div class="box space-arround">
   <div class="item box" v-for="(item,index) in countdata" :key="index" @click="changeActive(index)">
     <div class="left">
       <div class="title">
         {{ $t(`commons.${item.enTitle}`)}}({{ $t(`commons.dollar`)}})
       </div>
       <div class="money">
         <div v-if="active === index">
           ￥<countTo :startVal='startVal' :endVal='item.money'></countTo>
         </div>
         <div v-else>￥{{item.money | tmoeny}}</div>
       </div>
     </div>
     <div class="right">
        <div v-show="active !== index">
          <circle-progress
              :id="item.id"
              :width="80"
              :radius="10"
              :delay="200"
              :duration="1000"
              barColor="#9FB2BD"
              backgroundColor="#DCE2E6"
              :isRound="true"
              :isAnimation="true"
          ></circle-progress>
        </div>
        <div v-show="active === index">
          <circle-progress
              :id="item.id"
              :width="80"
              :radius="10"
              :progress="item.value"
              :delay="200"
              :duration="1000"
              :barColor="item.barColor"
              :backgroundColor="item.backgroundColor"
              :isRound="true"
              :isAnimation="true"
          ></circle-progress>
        </div>
        <div class="num" v-if="active === index">
          {{item.value}}<span v-if="item.value > 0">%</span>
        </div>
        <div class="p-desc" v-if="active === index">
          {{ $t(`commons.${item.desc}`)}}
        </div>
        <div class="line" v-if="index < 2"></div>       
     </div>
   </div>
 </div>
</template>

<script>
import countTo from 'vue-count-to';
import circleProgress from '../vue-circle-progress/circle-progress'
import {createNamespacedHelpers} from 'vuex'
const homeModule = createNamespacedHelpers('home')
const {mapActions:homeActions,mapState:homeState} = homeModule
 export default {
   data () {
     return {
       startVal:0,
       active:0
     }
   },
   components: {
     countTo,
     circleProgress 
   },
   methods: {
     ...homeActions(['getProgress']),
     changeActive(index){
       this.active = index
     }
   },
   mounted() {
     this.getProgress()
   },
   watch: {

   },
   computed: {
     ...homeState(['countdata'])
   },
   filters:{
     tmoeny(money){
       if(money && money !== null){
          money = String(money)
          let left = money.split('.')[0], right = money.split('.')[1]
          right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : ''
          let temp = left.split('').reverse().join('').match(/(\d{1,3})/g)
          return (Number(money) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('') + right
       }else if(money === 0){
         return '0'
       }else{
         return ''
       }
     }
   }
 }
</script>

<style scoped lang='scss'>
.item{
  .left{
    .title{
      margin: 10px 0;
      font-size: 14px;
      color: #ccc;
    }
    .money{
      position: relative;
      right: 4px;
      margin: 10px 0;
    }
  }
}
</style>