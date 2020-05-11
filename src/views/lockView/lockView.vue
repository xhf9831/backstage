<template>
  <div class="container box a-center space-center">
    <div :class="{'bounceOut': correct}" class="animated">
      <div class="content">
        <h2>admin</h2>
        <div class="box a-center desc animated" :class="{'shake':flag}">
          <el-input type="password" placeholder="请输入锁屏密码" v-model="unlock">
            <el-button slot="append" icon="el-icon-right" @click="unlockPage"></el-button>            
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 export default {
   data () {
     return {
       unlock:'',
       flag:false,
       correct:false
     }
   },
   components: {

   },
   methods: {
     unlockPage(){
       console.log(this.unlock);
        let pass = localStorage.getItem('lockpass')
        console.log(pass);
        if (this.unlock !== pass) {
          this.$message.error('密码不正确,请重新输入')
          this.flag = true
          this.unlock = ''
          setTimeout(() => {
            this.flag = false
          }, 500)
        }else {
          this.correct = true
          localStorage.removeItem('lockpass')
          localStorage.removeItem('isLock')
          setTimeout(() => {
            this.$message.success('欢迎回来')
            this.$router.go(-1)
          }, 800)
        }
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
  .container {
    height: 100vh;
    .content {
      animation: down .8s linear;
      h2 {
        margin-bottom: 5px;
      }
      .desc {
        height: 40px;
      }
    }
  }
  @keyframes down {
    0% {
      transform: translateY(-1000px);
    }
    50% {
      transform: translateY(-50px);
    }
    60% {
      transform: translateY(50px);
    }
    70% {
      transform: translateY(-20px);
    }
    80% {
      transform: translateY(-20px);
    }
    90% {
      transform: translateY(20px);
    }
    100% {
      transform: translateY(-20px);
    }
  }
</style>