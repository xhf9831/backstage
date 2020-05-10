<template>
 <div class="top box space-between">
   <div class="box">
     <div @click="changeIscoll">
      <i v-if="!isCollapse" class="iconsize el-icon-s-fold"></i> 
      <i v-else class="iconsize el-icon-s-unfold"></i> 
     </div>
     <div class="font">
       {{$t('commons.xiaoai')}}{{$t('commons.admin')}}
     </div>
   </div>
   <div class="box">
     <div class="item">
      <el-dropdown @command="changeFont">
        <span class="el-dropdown-link">
          <i class="iconsize el-icon-edit-outline"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="cn">简体中文</el-dropdown-item>
          <el-dropdown-item command="tw">繁體中文</el-dropdown-item>
          <el-dropdown-item command="en">English</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>       
     </div>
     <div class="item">
      <el-tooltip 
      effect="dark" 
      :content="fullscreen? '取消全屏' : '全屏'">
        <i class="iconsize el-icon-full-screen"  @click="handleClick"></i>
      </el-tooltip>
     </div>
     <div class="item">
      <el-tooltip 
      effect="dark" 
      content="锁屏">
        <i class="iconsize el-icon-lock" @click="lockView = true"></i>
      </el-tooltip>       
     </div>
   </div>
  <el-dialog title="锁屏" :visible.sync="lockView">
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="锁屏密码" prop="lockpass" :label-width="formLabelWidth">
        <el-input v-model="form.lockpass" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="lockView = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>   
 </div>
</template>

<script>
import screenfull from 'screenfull'
 export default {
   data () {
     return {
        fullscreen:false,
        isCollapse:false,
        lockView:false,
        formLabelWidth:'100px',
        form:{
          lockpass:''
        },
        rules:{
          lockpass:[
            {required:true, message: '请输入密码', trigger: 'blur'}
          ]
        },
        user:''
     }
   },
   components: {

   },
   methods: {
     changeFont(e){
       localStorage.setItem('lang', e)
       this.$i18n.locale = e
     },
     changeIscoll(){
       this.isCollapse = !this.isCollapse
       this.$bus.$emit('toggle', this.isCollapse)
     },
     handleClick(){
      screenfull.toggle()
      this.fullscreen = !this.fullscreen;
     },
     submit(){
      this.$refs.form.validate(valid => {
        if (valid) {
          localStorage.setItem('lockpass',this.form.lockpass)
          localStorage.setItem('isLock',0)
          this.$router.push('/lockView')
          this.lockView = false
        }else{
          this.$message.error('表单填写有误,请检查后重新填写')
        }
      })
     }
   },
   mounted() {
     this.user = JSON.parse(localStorage.getItem('adminUser'))
     console.log(this.user); 
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.top{
  align-items: center;
  padding-right: 20px;
  height: 60px;
  border-bottom: 1px solid #f0f2f5;
  color: #2e5e85;
}
.iconsize{
  font-size: 22px;
}
.font{
  font-size: 18px;
  padding-left: 30px;
  line-height: 20px;
}
.item{
  margin:0 5px;
}
</style>