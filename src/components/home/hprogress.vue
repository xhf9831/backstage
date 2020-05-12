<template>
 <div class="content a-center box space-between">
    <div class="item box space-center" v-for="(item, index) in countdata" :key="index">
      <div class="desc box space-center a-center" :class="{'bor-top': active === index}" :style="{borderColor: item.barColor}"
           @click="active=index">
        <div class="con box space-center">
          <div class="c-title">
            {{ $t(`commons.${item.enTitle}`)}}({{ $t(`commons.dollar`)}})
          </div>
          <div class="money">
            <div v-if="active === index">
              ￥
              <count-to :startVal='startVal' :endVal='item.money'></count-to>
            </div>
            <div v-else>
              ￥{{item.money | tmoney}}
            </div>
          </div>
        </div>
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
     tmoney(money){
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
.content {
  width: 100%;
  background: #fff;
  .item {
    flex: 1;
    .desc {
      width: 100%;
      height: 120px;
      position: relative;
      font-size: 12px;
      .line {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        height: 24px;
        background: #ccc;
      }
      .con {
        position: absolute;
        height: 120px;
        width: 200px;
        left: 10%;
        flex-direction: column;
        font-size: 20px;
        .c-title {
          margin: 10px 0;
          font-size: 14px;
          color: #ccc;
        }
        .money {
          position: relative;
          right: 4px;
          margin: 10px 0;
        }
      }
      .num {
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -45%);
      }
      .p-desc {
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -60%);
      }
    }
  }
}
.bor-top {
  border-top: 8px solid;
}
</style>