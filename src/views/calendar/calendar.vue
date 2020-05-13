<template>
 <div>
   <lunar-full-calendar :events="events" :config="config"></lunar-full-calendar>
 </div>
</template>

<script>
import { LunarFullCalendar } from "vue-lunar-full-calendar";
 export default {
   data () {
     return {
      events: [],
      config: {
        defaultView: 'month',
        lunarCalendar: true, // 控制是否显示中国农历、显示的为true，隐藏为flase，默认为true(Control whether the Chinese calendar shows true, unrealistic flase, default true.)
        locale: 'en-en', // 语言
        buttonText: { // 按钮
          today: '今天',
          month: '月',
          week: '周',
          day: '日'   //(Control whether the Chinese calendar shows true, unrealistic flase, default true.)
        },
        header: { // 头部
          left: 'prev,next, today',
          center: 'title',
          right: 'hide, custom, month,agendaWeek,agendaDay'
        },
        allDaySlot: true, // agenda视图下是否显示all-day
        allDayText: '全天', // agenda视图下all-day的显示文本
        timezone: 'local', // 时区默认本地的
        slotLabelFormat: 'HH:mm', // 周视图和日视同的左侧时间显示
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        eventsource:[
          
        ]
      },
    }
   },
   components: {
     LunarFullCalendar
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

</style>