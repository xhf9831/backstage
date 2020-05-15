<template>
 <div class="container">
  <div class="head box space-between a-center">
    <div class="top box a-center">
      <div class="icon box space-center a-center">
        <i :class="icon"></i>
      </div>
      <div class="title">
        {{$t(`commons.${title}`)}}
      </div>
    </div>
    <div class="box">
      <el-button type="primary" size="small" v-if="!flag" @click="change(true)">批量转正申请</el-button>
      <el-button type="primary" size="small" v-if="flag" @click="sure">确认</el-button>
      <el-button type="primary" size="small" v-if="flag" @click="change(false)">取消</el-button>
      <el-button type="primary" size="small">导出</el-button>
    </div>
  </div>
  <div class="table">
    <div class="tag">
      <div class="t-item" v-for="(item, index) in tags" :key="index">
        <el-tag class="tag" :class="{active: activeIndex === index}" @click="clickTag(item, index)">{{item}}</el-tag>
      </div>      
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        align="center"
        show-overflow-tooltip
        >
      </el-table-column>
      <el-table-column
        prop="num"
        label="工号"
        align="center"
        sortable
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="机构"
        align="center"
        prop="mechanism"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="部门"
        prop="department"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="startTime"
        align="center"
        sortable
        label="试用期开始日期"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="endTime"
        align="center"
        sortable
        label="试用期结束日期"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="转正审批状态"
        align="center"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <div v-if="scope.row.state === 0" style="color: #0285DC">审核通过</div>
          <div v-if="scope.row.state === 1" style="color: #0285DC">审核未通过</div>
          <div v-if="scope.row.state === 2" style="color: #0285DC">审核中</div>
        </template>
      </el-table-column>
      <el-table-column
          label="操作"
          align="center"
          show-overflow-tooltip>
        <template>
          <el-button type="primary" size="mini">编辑试用期</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :tableData="tableData" @getPageSize="getPageSize" @getCurrentPage="getCurrentPage"
                style="margin-top:16px;">
    </pagination>
  </div>
 </div>
</template>

<script>
import pagination from '../../components/pagination/Pagination'
import {createNamespacedHelpers} from 'vuex'
const userModule = createNamespacedHelpers('userInfo')
const {mapActions:userActions,mapState:userState} = userModule
 export default {
   data () {
     return {
       icon:'',
       title:'',
       flag:false,
       currentPage: 1, // 当前页数
       pageSize: 10,
       tableData:[],
       data:[],        
       sureArr: [],
       tags: ['全部员工', '考核中员工', '已转正员工'],
       activeIndex:0
     }
   },
   components: {
     pagination
   },
   methods: {
     ...userActions(['getInfo']),
     getData(){
       this.getInfo().then(()=>{
         this.data = this.userinfo
         this.tableData = this.data
       })
     },
     change(data){
       this.flag = data
     },
      changeFlag () {
        this.flag = false
        this.tableData = this.data.filter(item => {
          return item.state !== 0
        })
      },
     getPageSize(data) {
       this.pageSize = data
     },
     getCurrentPage(data) {
       this.currentPage = data
     },
      handleSelectionChange (selection) {
        this.sureArr = selection
      },
     clickTag(item, index) {
      this.activeIndex = index
      if (index === 0) {
        this.tableData = this.data
      }
      if (index === 1) {
        this.tableData = this.data.filter(item => {
          return item.state !== 0
        })
      }
      if (index === 2) {
        this.tableData = this.data.filter(item => {
          return item.state === 0
        })
      }
     },
      sure () {
        if (this.sureArr.length === 0) {
          this.$message.warning('请选择至少一条数据')
        } else {
          this.sureArr.map(item => {
            item.state = 0
          })
          setTimeout(() => {
            this.$message.success('操作成功')
            this.flag = false
            this.tableData = this.data
          }, 1000)
      }
    }
   },
   mounted() {
    this.icon = this.$route.meta.icon
    this.title = this.$route.meta.enTitle
    this.getData()
   },
   watch: {

   },
   computed: {
    ...userState(['userinfo'])
   }
 }
</script>

<style scoped lang='scss'>
.container {
  .head {
    .top {
      .title {
        font-weight: 700;
        margin-left: 8px;
      }
      .icon {
        background: #38BA72;
        color: #fff;
        height: 24px;
        width: 16px;
        padding: 0 5px;
      }
    }
  }
  .table {
    margin-top: 30px;
    .tag {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .t-item {
        margin: 0 8px;
        .tag {
          border-radius: 20px;
          cursor: pointer;
        }
      }
    }
  }
}
.active {
  background: #1587D9 !important;
  color: #fff;
}
</style>