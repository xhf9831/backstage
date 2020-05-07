<template>
 <div>
   <commonhead></commonhead>
   <div class="registercontent el_tab-padding">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item prop="username">
        <el-input placeholder="2到10位的用户名" type="password" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="6位以上的密码" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input placeholder="合法邮箱" v-model.number="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input placeholder="11位合法手机号" v-model.number="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <div class="box">
          <div>
            <el-input placeholder="6位验证码" v-model.number="ruleForm.code"></el-input>
          </div>
          <div class="but">
            <el-button @click="getMsg">验证码</el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="box space-between">
          <div>
            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>          
          </div>
          <div class="text">
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
 export default {
   data () {
     return {
       ruleForm:{
         username:'',
         password:'',
         email:'',
         phone:'',
         code:''
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
         ],
         phone:[
           {required:true, message: '请输入手机', trigger: 'blur'},
         ],
         code:[
           {required:true, message: '请输入验证码', trigger: 'blur'},
         ]
       }
     }
   },
   components: {
     commonhead
   },
   methods: {
     submitForm(){
       this.$api.register({
         username:this.ruleForm.username,
         password:this.ruleForm.password,
         email:this.ruleForm.email,
         sms:this.ruleForm.code
       }).then(res=>{
         console.log(res);
       }).catch(err=>{
         console.log(err);
       })
     },
     getMsg(){
       let phone = this.ruleForm.phone
       this.$api.sendMsg(phone).then(res=>{
         console.log(res);
       }).catch(err=>{
         console.log(err);
       })
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