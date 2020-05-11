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
     <el-dropdown @command="selectAction">
      <div class="box">
        <div class="box headimg space-center" v-if="user.avatar">
          <img class="header" :src="user.avatar" alt="">
        </div>
        <div v-else>
          <img class="header" src="../../assets/userhead.png" alt="">
        </div>
        <div class="username">
          亲爱的{{user.username}}
        </div>
        <div class="username">
          <i class="el-icon-caret-bottom"></i>
        </div>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-upload
        action="api/upload/image"
        :headers="headers"
        :before-upload="beforeupload"
        :multiple="false"
        :show-file-list="false"
        :on-success="successAvatar">
        <el-dropdown-item command="upload">{{$t('commons.uploadAvatar')}}</el-dropdown-item>
        </el-upload>
        <el-dropdown-item command="editPwd">{{$t('commons.editPwd')}}</el-dropdown-item>
        <el-dropdown-item command="logout">{{$t('commons.logout')}}</el-dropdown-item>
      </el-dropdown-menu>       
     </el-dropdown>
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
  <el-dialog title="修改密码" :visible.sync="editpwd" :modal-append-to-body="false" width="30%">
    <el-form :model="editform" :rules="editrules">
      <el-form-item label="请输入原密码" prop="password" :label-width="formLabelWidth">
        <el-input show-password v-model="editform.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="请输入新密码" prop="newPwd" :label-width="formLabelWidth">
        <el-input show-password v-model="editform.newPwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="请确认新密码" prop="relPwd" :label-width="formLabelWidth">
        <el-input show-password v-model="editform.relPwd" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editpwd = false">取 消</el-button>
      <el-button type="primary" @click="submitNewpwd">确 定</el-button>
    </div>
  </el-dialog>    
 </div>
</template>

<script>
import screenfull from 'screenfull'
import {createNamespacedHelpers} from 'vuex'
const loginModule = createNamespacedHelpers('login')
const {mapActions:loginActions,mapState:loginState} = loginModule
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
        user:'',
        editpwd:false,
        editform:{
          password: '',
          newPwd: '',
          relPwd: ''
        },
        editrules:{
          password: [
            { required: true, message: '请输入原密码', trigger: 'blur' },
            { min: 6, message: '密码至少6位', trigger: 'blur' }
          ],
          newPwd: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { min: 6, message: '密码至少6位', trigger: 'blur' }
          ],
          relPwd: [
            { required: true, message: '请确认密码', trigger: 'blur' },
            { min: 6, message: '密码至少6位', trigger: 'blur' }
          ],
        },
        formLabelWidth:'110px'
     }
   },
   components: {

   },
   methods: {
     ...loginActions(['updatePwd']),
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
     },
     selectAction(command){
       if(command === 'logout'){
        this.$message.success('欢迎下次光临')
        localStorage.removeItem('adminToken')
        this.$router.push('/login')         
       }else if(command === 'editPwd'){
         this.editpwd = true
       }
     },
     beforeupload(file){
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
     },
     successAvatar(res){
       if(res){
        this.user.avatar = res.url
        localStorage.setItem('adminUser', JSON.stringify(this.user))
        this.$message.success('上传成功')
       }
     },
     submitNewpwd(){
       if(this.editform.newPwd !== this.editform.relPwd){
         this.$message.error('两次密码输入不一致,请重新输入')
         return
       }else{
         let id = {id:this.user._id}
         let username = {username:this.user.username}
         let password = {password:this.user.password}
         let newPwd = {newPwd:this.editform.newPwd}
         let parmas ={}
         Object.assign(parmas,username,password,id,newPwd)
        //  console.log(parmas);
         this.updatePwd(parmas)
       }
     }
   },
   mounted() {
     this.user = JSON.parse(localStorage.getItem('adminUser'))
   },
   watch: {

   },
   computed: {
     headers(){
       let token = 'Bearer ' + localStorage.getItem('adminToken')
       return{
         "Authorization": token
       }
     }
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
  line-height: 35px;
}
.box{
  .header{
    width: 30px;
    margin:0 5px;
  }
  .username{
    line-height: 30px;
  }
}
.headimg{
  width: 30px;
  height: 30px;
  align-items: center;
  text-align: center;
  overflow: hidden;
  margin: 0 5px;
  border-radius: 50%;
}
</style>