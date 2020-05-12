<template>
 <div>
   <el-scrollbar style="height:100%">
     <div class="content">
       <el-card>
         <div slot="header" class="box space-between a-center clearfix">
            <div>
              <div>{{$t('commons.personal dynamic')}}</div>
            </div>
            <div>
              <el-button type="primary" size="mini" @click="adddynamic = true">添加动态</el-button>
            </div>
         </div>
         <div class="date">
            <el-date-picker
              @change="changeDate"
              v-model="value"
              type="date"
              :editable="false"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            ></el-date-picker>
         </div>
         <div>
          <div class="i-desc" v-if="filterReports.length > 0">
            <div v-for="(item, index) in filterReports" :key="index">
              <div :class="{back: index % 2 === 0}" class="c-desc">
                <div class="c-item">
                  <div class="name box space-between a-center">
                    <div>类型: {{item.classification}}</div>
                    <div>发布人: {{item.username}}</div>
                  </div>
                  <div class="c-report box a-center">
                    <div v-if="item.reportUsers.length > 0">
                      <div class="re-item">汇报人:&nbsp;</div>
                    </div>
                    <el-tooltip placement="top-start" effect="light">
                      <div slot="content">
                        <div v-if="item.reportUsers.length > 0" class="r-name">
                          <span
                            v-for="(item1, index1) in item.reportUsers"
                            :key="index1"
                          >{{item1}}</span>
                        </div>
                      </div>
                      <div v-if="item.reportUsers.length > 0" class="r-name" ref="reportuser">
                        <span v-for="(item1, index1) in item.reportUsers" :key="index1" style="margin-right:4px">{{item1}}</span>
                      </div>
                    </el-tooltip>
                  </div>
                  <div class="t-name box space-between a-center">
                    <div class="text">动态: {{item.dynamic}}</div>
                    <div class="time">发布于{{item.time}}</div>
                  </div>
                </div>                
              </div>
            </div>
          </div>
          <div v-else class="noThing">暂无动态</div>
         </div>
       </el-card>
     </div>
   </el-scrollbar>
   <el-dialog title="添加动态" :show-close="false" :visible.sync="adddynamic">
      <div class="item home__tags">
        <el-form :model="ruleForm" ref="ruleForm" label-width="110px" class="demo-ruleForm">
          <el-form-item label="动态类型">
            <el-select v-model="ruleForm.classification" placeholder="请选择动态类型">
              <el-option label="个人心情" value="个人心情"></el-option>
              <el-option label="工作汇报" value="工作汇报"></el-option>
              <el-option label="公司相关" value="公司相关"></el-option>
              <el-option label="其他事物" value="其他事物"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="相关汇报人" v-if="ruleForm.classification === '工作汇报'">
            <el-select v-model="ruleForm.reportUsers" multiple placeholder="请选择汇报人">
              <el-option
                v-for="item in reportuser"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详情内容">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="ruleForm.dynamic"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="sureAdd">确 定</el-button>
      </div>
    </el-dialog>
 </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
const homeModule = createNamespacedHelpers('home')
const {mapActions:homeActions,mapState:homeState} = homeModule
 export default {
   data () {
     return {
       value:'',
       username:'',
       filterReports:[],
       pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
       },
       adddynamic:false,
       ruleForm: {
        classification: '',
        dynamic: '',
        reportUsers: []
      },
     }
   },
   components: {

   },
   methods: {
     ...homeActions(['getDynamic','getReport','addDynamic']),
     sureAdd(){
       let date = {date:this.value}
       let username = {username:this.username}
       let parmas = {} 
       Object.assign(parmas,date,username,this.ruleForm)
       console.log(parmas);
       this.addDynamic(parmas).then(()=>{
        this.getDynamic().then(()=>{
          this.getFilterreport()
        })
        this.getReport()
        this.adddynamic = false         
       })
     },
     changeDate(){
      this.value = this.$dayjs(this.value).format('YYYY-MM-DD')
      this.getDynamic().then(()=>{
        this.getFilterreport()
      })
     },
     getFilterreport(){
       this.filterReports = this.reports.filter(item => item.date === this.value)
     },
     cancelDialog(){
       this.adddynamic = false
       this.ruleForm.classification =''
       this.ruleForm.dynamic =''
       this.ruleForm.reportUsers =[]
     }
   },
   mounted() {
    if (localStorage.adminUser) this.username = JSON.parse(localStorage.adminUser).username
    this.value = this.$dayjs(new Date()).format('YYYY-MM-DD')
    this.$nextTick(() => {
      this.getDynamic().then(()=>{
        this.getFilterreport()
      })
      this.getReport()
    })
   },
   watch: {

   },
   computed: {
     ...homeState(['reports','reportuser'])
   }
 }
</script>

<style scoped lang='scss'>
.content {
  height: 400px;
  .clearfix {
    height: 16px;
  }
  .c-desc {
    background: #fafafa;
    margin: 15px 0;
    padding: 20px;
    &:hover {
      background: #f2f3f7;
    }
    .c-item {
      .name {
        width: 100%;
      }
    }
    .t-name {
      margin-top: 20px;
      div {
        display: flex;
        align-items: center;
      }
      .time {
        color: #ccc;
      }
    }
    .c-report {
      margin-top: 20px;
      .re-item{
        width: 60px;
      }
      .r-name {
        overflow: hidden;
        width: 400px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

.noThing {
  margin-top: 30px;
}

.el-select {
  width: 100%;
}

.back {
  background: #eee !important;

  &:hover {
    background: #f2f3f7 !important;
  }
}

::-webkit-scrollbar {
  width: 10px; /* 滚动条宽度， width：对应竖滚动条的宽度  height：对应横滚动条的高度*/
}
</style>