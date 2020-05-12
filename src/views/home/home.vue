<template>
 <div>
  <hprogress class="progress"></hprogress>
  <div class="box content">
    <div>
      <wordcloud></wordcloud>      
    </div>
    <div>
      <personaldynamic></personaldynamic>      
    </div>
  </div>
  <div>
    <question></question>
  </div>
 </div>
</template>

<script>
import hprogress from '../../components/home/hprogress'
import wordcloud from '../../components/home/wordcloud'
import personaldynamic from '../../components/home/personaldynamic'
import question from '../../components/home/question'
 export default {
   data () {
     return {

     }
   },
   components: {
     hprogress,
     wordcloud,
     personaldynamic,
     question
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
.progress {
  margin: 10px 0 50px 0;
}
.content{
  div {
    flex: 1;
    &:first-child {
      margin-right: 10px;
    }
  }
}
</style>