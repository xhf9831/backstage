<template>
 <div class="el_border">
  <el-menu
    :default-active="active"
    class="el-menu-vertical-demo"
    background-color="#ffffff"
    text-color="#9EB2BD"
    active-text-color="#0FA0F8"
    :collapse="isCollapse">
    <template v-for="(item,idx) in menu">
      <el-menu-item @click="goto(item.url)" v-if="item.children.length === 0"  :key="idx" :index="item.index">
        <i :class="item.icon"></i>
        <span slot="title">{{$t(`commons.${item.enName}`)}}</span>
      </el-menu-item>
      <el-submenu v-if="item.children.length !== 0" :index="item.index" :key="item.index">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{$t(`commons.${item.enName}`)}}</span>
        </template>
        <el-menu-item
        v-for="(itemx,indexx) in item.children"
        :key="indexx"
        :index="itemx.index"
        @click="goto(itemx.url)"
        >
          <i :class="itemx.icon"></i>
          <span>{{$t(`commons.${itemx.enName}`)}}</span>
        </el-menu-item>
      </el-submenu>      
    </template>
  </el-menu>
 </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
const loginModule = createNamespacedHelpers('login')
const {mapActions:loginActions,mapState:loginState} = loginModule
 export default {
   data () {
     return {
       isCollapse:false,
       active: '1',
     }
   },
   components: {

   },
   methods: {
     ...loginActions(['getMenus']),
     goto(path){
       this.$router.push(path)
     }
   },
   mounted() {
    this.getMenus()
    this.$bus.$on('toggle', data => {
      this.isCollapse = data
    })
    let path = this.$route.path
    if (path === '/') {
      this.active = '1'
    }
    if (path === '/calendar') {
      this.active = '2'
    }
    if (path === '/mailList') {
      this.active = '3'
    }
    if (path === '/organization/offer') {
      this.active = '4-1'
    }
    if (path === '/organization/userInfo') {
      this.active = '4-2'
    }
    if (path === '/organization/pay') {
      this.active = '4-3'
    }
    if (path === '/form/stepForm') {
      this.active = '5-1'
    }
   },
   watch: {

   },
   created(){
 
   },
   computed: {
     ...loginState(['menu'])
   }
 }
</script>

<style scoped lang='scss'>

</style>