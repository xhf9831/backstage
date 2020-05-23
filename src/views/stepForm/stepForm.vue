<template>
 <div class="container">
  <div class="top box space-center">
    <div class="title">
      请填写您的转账信息
    </div>
    <div class="t-item">
      请务必是你本人操作,确认转账金额及收款人信息
    </div>
  </div>
  <div class="desc">
    <el-card>
      <el-steps :active="active" finish-status="success" align-center>
        <el-step v-for="(item,index) in list" :key="index" :title="item.info"></el-step>
      </el-steps>
      <div class="c-desc a-center space-center box" v-if="active === 0">
        <el-form :model="form" label-width="100px" :rules="rules" ref="ruleForm">
          <el-form-item label="付款账户:" prop="account1">
            <el-input v-model="form.payment"></el-input>
          </el-form-item>
          <el-form-item label="收款账户:" prop="account2">
            <div style="display: flex;align-items: center">
              <el-select v-model="value">
                <el-option
                    v-for="item in selectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
              <el-input v-model="form.collection"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="付款人姓名:" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="收款金额:" prop="money">
            <el-input v-model.number="form.money">
              <div slot="prefix" style="color: #777;font-size: 20px">￥</div>
            </el-input>
          </el-form-item>
          <el-form-item>
            <div style="text-align: center">
              <el-button type="primary" @click="next('ruleForm')">下一步</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="active === 1" class="box" style="justify-content: center">
        <div class="sure box space-center">
          <div class="alert">
            <el-alert
                title="确认转账后，资金将直接打入对方账户，无法退回。"
                type="warning"
                show-icon>
            </el-alert>
          </div>
          <div>
            <div class="s-item">
              付款账户 : {{form.payment}}
            </div>
            <div class="s-item">
              收款账户 : {{form.collection}}
            </div>
            <div class="s-item">
              收款人姓名 : {{form.name}}
            </div>
            <div class="s-item">
              收款金额 : <span style="font-size: 22px">{{form.money}}</span>元
            </div>
          </div>
          <el-divider></el-divider>
          <div class="pwd">
            <el-form :model="payform" :rules="rules" label-width="100px" ref="sendForm">
              <el-form-item label="支付密码:" prop="password">
                <el-input type="password" v-model="payform.password" style="width: 300px"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="next('sendForm')">提交</el-button>
                <el-button @click="active = 0">上一步</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div v-if="active === 2" class="box" style="justify-content: center">
        <div class="msg box a-center">
            <div class="m-icon box space-center a-center">
              <i class="el-icon-check"></i>
            </div>
          <div style="margin-top: 25px">操作成功</div>
          <div class="m-info">预计两小时到账</div>
          <div class="m-desc box space-center">
            <div class="m-item">
              付款账户 : {{form.payment}}
            </div>
            <div class="m-item">
              收款账户 : {{form.collection}}
            </div>
            <div class="m-item">
              收款人姓名 : {{form.name}}
            </div>
            <div class="m-item">
              收款金额 : <span style="font-size: 22px">{{form.money}}</span>元
            </div>
          </div>
          <div class="m-btn box a-center">
            <div>
              <el-button type="primary" @click="aglin">再转一笔</el-button>
            </div>
            <div>
              <el-button @click="check">查看账单</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
      active:0,
      list:[
        {
          id: 1,
          info: '填写转账信息'
        },
        {
          id: 2,
          info: '确认转账信息'
        },
        {
          id: 3,
          info: '完成'
        }
      ],
      selectOptions: [
        {
          value: '0',
          label: '支付宝'
        },
        {
          value: '1',
          label: '银行卡'
        }
      ],
      form: {
        payment: '',
        collection: '', 
        name: '', 
        money: '', 
      },
      payform: {
        password: '', 
      },
      rules: {
        payment: [
          {required: true, message: '请输入付款人账户', trigger: 'blur'}
        ],
        collection: [
          {required: true, message: '请输入收款人账户', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入收款人姓名', trigger: 'blur'},
        ],
        money: [
          {required: true, message: '请输入转账金额', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '输入正确的支付密码才能支付', trigger: 'blur'},
        ]
      },
      value: ''
     }
   },
   components: {

   },
   methods: {
      next(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.active++;
            if (this.active === 2) return
          } else {
            this.$message.error('表单未填写完整')
            return false;
          }
        })
      },
      aglin () {
        this.active = 0
        this.form.payment = ''
        this.form.collection = ''
        this.form.password = ''
        this.form.name = ''
        this.form.money = ''
      },
      check () {
        localStorage.setItem('formInfo',JSON.stringify(this.form))
        window.open('/form/checkForm')
      },
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
  .title{
    margin-bottom: 10px;
  }
  .top {
    background: #fff;
    flex-direction: column;
    height: 60px;
    padding-left: 10px;
    .t-item {
      color: #ccc;
      font-size: 14px;
    }
  }
  .desc {
    margin-top: 30px;
    .c-desc {
      margin-top: 60px;
      .el-form {
        width: 40%;
      }
    }
    .sure {
      margin-top: 30px;
      width: 40%;
      flex-direction: column;
      .alert {
        width: 100%;
      }
      .s-item {
        margin: 15px 0;
        color: #272727;
        font-size: 14px;
      }
    }
    .msg {
      width: 100%;
      flex-direction: column;
      margin-top: 30px;
      .m-icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #52C41A;
        font-size: 32px;
        color: #fff;
      }
      .m-info {
        margin: 5px 0;
        color: #ccc;
        font-size: 14px;
      }
      .m-desc {
        background: #FAFAFA;
        width:400px;
        height: 200px;
        flex-direction: column;
        .m-item {
          margin: 10px;
        }
      }
      .m-btn {
        margin-top: 25px;
        div {
          margin: 0 6px;
        }
      }
    }
  }
}
</style>