<template>
 <div>
   <comonhead></comonhead>
   <div class="lgincontent el_tab-padding">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="账号密码登录" name="user">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="username">
            <el-input type="text" placeholder="2到10位的用户名" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input :show-password="true" placeholder="6位以上的密码" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <div class="box">
              <div>
              <el-input placeholder="验证码" v-model="ruleForm.code"></el-input> 
              </div>
              <div class="code">
                <div @click="changeCode" v-html="code"></div>   
              </div>
            </div>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="手机号码登录" name="phone">
        <el-form :model="phoneForm" status-icon :rules="phonerules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="phone">
            <el-input type="text" placeholder="11位合格的电话" v-model="phoneForm.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <div class="box">
              <div>
                <el-input placeholder="6位验证码" type="text" v-model="phoneForm.code" autocomplete="off"></el-input>
              </div>
              <div class="but">
                <el-button v-if="num===0" @click="getMsg">验证码</el-button>  
                <el-button v-else-if="num===1" disabled>{{time}}s后再次发送</el-button>  
                <el-button v-else @click="getMsg">再次发送</el-button>  
              </div>
            </div>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div class="forgetbox box space-between">
      <div>
        <el-checkbox @click="changeSelect" v-model="checked">记住我</el-checkbox>              
      </div>
      <div @click="goto('/findback')" class="forget">
        忘记密码？
      </div>
    </div>
    <div class="forgetbox">
      <el-button type="primary" @click="submitForm">登录</el-button>
    </div>
    <div class="forgetbox box space-between">
      <div class="box">
        <div class="way">其他方式登录</div>
        <img src="../../assets/github.svg" alt="">
      </div>
      <div @click="goto('/register')" class="forget">
        注册账号
      </div>
    </div>     
   </div>  
 </div>
</template>

<script>
import comonhead from '../../components/loginhead'
import {createNamespacedHelpers} from 'vuex'
const loginModule = createNamespacedHelpers('login')
const {mapActions:loginActions,mapState:loginState} = loginModule
 export default {
   data () {
     return {
       activeName:'user',
       checked:false,
       type:'password',
       num:0,
       time:60,
       ruleForm:{
         username:'',
         password:'',
         code:'',
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
         code:[
           {required:true, message: '请输入验证码', trigger: 'blur'}
         ]
       },
       phoneForm:{
         phone:'',
         code:''
       },
       phonerules:{
         phone:[
           {required:true, message: '请输入电话号码', trigger: 'blur'},
           {pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码'}
         ],
         code:[
           {required:true, message: '请输入验证码', trigger: 'blur'}
         ]
       }
     }
   },
   components: {
     comonhead
   },
   methods: {
     ...loginActions(['getCaptcha','sendMsg','login','phoneLogin']),
     submitForm(){
       if(this.activeName === 'user'){
         this.login(this.ruleForm).then(()=>{
            localStorage.setItem('user',JSON.stringify(this.ruleForm))
          if(this.checked === true){
            localStorage.setItem('checked',true)
          }else{
            localStorage.removeItem('checked')
          }           
         })
       }else if(this.activeName === 'phone'){
         console.log(this.phoneForm);
         this.phoneLogin(this.phoneForm).then(()=>{
            localStorage.setItem('phone',JSON.stringify(this.phoneForm))
          if(this.checked === true){
            localStorage.setItem('checked',true)
          }else{
            localStorage.removeItem('checked')
          }           
         })
       }
     },
     handleClick(tab) {
      this.activeName = tab.name
     },
     changeSelect(){

     },
     changeCode(){
       this.getCaptcha()
     },
     goto(path){
       this.$router.push(path)
     },
     getMsg(){
       if(this.phoneForm.phone !==''){
        this.sendMsg(this.phoneForm.phone).then(()=>{
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
     }
   },
   mounted() {
     this.getCaptcha()
     if(localStorage.checked){
       this.checked = JSON.parse(localStorage.getItem('checked'))
       this.ruleForm.username = JSON.parse(localStorage.getItem('user')).username
       this.ruleForm.password = JSON.parse(localStorage.getItem('user')).password
     }
     if(localStorage.checked){
       this.checked = JSON.parse(localStorage.getItem('checked'))
       this.phoneForm.phone = JSON.parse(localStorage.getItem('phone')).phone
     }
   },
   watch: {

   },
   computed: {
     ...loginState(['code'])
   }
 }
</script>

<style scoped lang='scss'>
.lgincontent{
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
.code{
  margin-left:20px;
}
::v-deep svg{
  width: 93px;
  height: 35px;
}
.but{
  margin-left: 20px;
}
</style>