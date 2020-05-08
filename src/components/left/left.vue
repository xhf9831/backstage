<template>
 <div>

 </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
const loginModule = createNamespacedHelpers('login')
const {mapActions:loginActions,mapState:loginState} = loginModule
 export default {
   data () {
     return {

     }
   },
   components: {

   },
   methods: {
     ...loginActions(['getMenus'])
   },
   mounted() {
     this.getMenus()
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>

</style>