<template>
 <div>
   <commonhead></commonhead>
   <div class="registercontent el_tab-padding">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" placeholder="2到10位的用户名" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input prefix-icon="el-icon-message" placeholder="合法邮箱" v-model="ruleForm.email"></el-input>
        </el-form-item> 
      </el-form>
      <div class="forgetbox">
        <el-button type="primary" @click="submitForm">找回密码</el-button>
      </div>
      <div class="forgetbox box space-between">
        <div class="box">
          <div class="way">其他方式登录</div>
          <img src="../../assets/github.svg" alt="">
        </div>
        <div @click="goto('/login')" class="forget">
          立即登录
        </div>
      </div> 
   </div>
 </div>
</template>

<script>
import commonhead from '../../components/loginhead'
import {createNamespacedHelpers} from 'vuex'
const loginModule = createNamespacedHelpers('login')
const {mapActions:loginActions,mapState:loginState} = loginModule
 export default {
   data () {
     return {
       ruleForm:{
         username:'',
         email:''
       },
       rules:{
         username:[
           {required:true, message: '请输入用户名', trigger: 'blur'},
           { min: 2, max: 10, message: "长度在 2 到 10 个字符" }
         ],
         email:[
           {required:true, message: '请输入邮箱', trigger: 'blur'},
           {type:'email', message: '请输入正确的邮箱',trigger: ['blur', 'change']}
         ],
       }
     }
   },
   components: {
     commonhead
   },
   methods: {
     ...loginActions(['findPwd']),
     goto(path){
       this.$router.push(path)
     },
     submitForm(){
       this.findPwd(this.ruleForm)
     }
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
.registercontent{
  padding-top: 50px;
  width: 30%;
  margin: 0 auto;
}
.forgetbox{
  margin: 15px 35px;
  font-size: 14px;
  img{
    width: 20px;
    height: 20px;
    margin-left: 8px;
    cursor: pointer;
  }
  .forget{
    color: rgb(45, 140, 240);
    cursor: pointer;
    z-index: 10;
  }
  .way{
    line-height: 20px;
    cursor: pointer;
  }
}
</style>