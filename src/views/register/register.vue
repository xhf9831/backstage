<template>
 <div>
   <commonhead></commonhead>
   <div class="registercontent el_tab-padding">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item prop="username">
        <el-input prefix-icon="el-icon-user" placeholder="2到10位的用户名" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input prefix-icon="el-icon-lock" placeholder="6位以上的密码" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input prefix-icon="el-icon-message" placeholder="合法邮箱" v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input prefix-icon="el-icon-phone" placeholder="11位合法手机号" v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item prop="sms">
        <div class="box">
          <div>
            <el-input prefix-icon="el-icon-document" placeholder="6位验证码" v-model="ruleForm.sms"></el-input>
          </div>
          <div class="but">
            <el-button v-if="num===0" @click="getMsg">验证码</el-button>  
            <el-button v-else-if="num===1" disabled>{{time}}s后再次发送</el-button>  
            <el-button v-else @click="getMsg">再次发送</el-button>  
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="box space-between">
          <div>
            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>          
          </div>
          <div @click="goto('/login')" class="text">
            <span>使用已有账号登录</span>
          </div>          
        </div>
      </el-form-item>
    </el-form>     
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
       time:60,
       num:0,
       ruleForm:{
         username:'',
         password:'',
         email:'',
         phone:'',
         sms:''
       },
       rules:{
         username:[
           {required:true, message: '请输入用户名', trigger: 'blur'},
           { min: 2, max: 10, message: "长度在 2 到 10 个字符" }
         ],
         password:[
           {required:true, message: '请输入密码', trigger: 'blur'},
           { min: 6, message: "6位以上的密码" }
         ],
         email:[
           {required:true, message: '请输入邮箱', trigger: 'blur'},
           {type:'email', message: '请输入正确的邮箱',trigger: ['blur', 'change']}
         ],
         phone:[
           {required:true, message: '请输入手机', trigger: 'blur'},
           {pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码'}
         ],
         sms:[
           {required:true, message: '请输入验证码', trigger: 'blur'},
         ]
       }
     }
   },
   components: {
     commonhead
   },
   methods: {
     ...loginActions(['sendMsg','register']),
     submitForm(){
       this.register(this.ruleForm)
     },
     getMsg(){
       if(this.ruleForm.phone !==''){
        this.sendMsg(this.ruleForm.phone).then(()=>{
          this.num = 1
          let timeout = setInterval(()=>{
            this.time = this.time - 1
            if(this.time === 0){
              clearInterval(timeout)
              this.num = 2
            }
          },1000)
        })         
       }else{
        this.$message({
          showClose: true,
          message: '电话号码未填写',
          type: 'error'
        });
       }
     },
     goto(path){
       this.$router.push(path)
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
.but{
  margin-left: 20px;
}
.text{
    font-size: 14px;
    color: #2d8cf0;
    cursor: pointer;
}
</style>