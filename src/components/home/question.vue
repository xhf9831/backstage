<template>
 <div>
   <el-card>
     <div slot="header">
       <span>{{$t('commons.website questionnaire survey')}}</span>
     </div>
     <el-table
        :data="question"
        style="width: 100%">
      <el-table-column
          prop="name"
          label="问卷名称"
          align="center">
      </el-table-column>
      <el-table-column
          prop="desc"
          label="问卷描述"
          align="center">
      </el-table-column>
      <el-table-column
          prop="startTime"
          label="创建时间"
          sortable
          align="center">
      </el-table-column>
      <el-table-column
          prop="endTime"
          label="截止时间"
          sortable
          align="center">
      </el-table-column>
      <el-table-column
          label="问卷状态"
          align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0">已发布</el-tag>
          <el-tag v-if="scope.row.status === 1">未发布</el-tag>
          <el-tag v-if="scope.row.status === 2">已截止</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          label="网站名称"
          align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.url.includes('baidu')">百度</el-tag>
          <el-tag type="warning" v-if="scope.row.url.includes('juejin')">掘金</el-tag>
          <el-tag type="danger" v-if="scope.row.url.includes('douban')">豆瓣</el-tag>
          <el-tag type="info" v-if="scope.row.url.includes('git')">Github</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          label="操作"
          align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="gotoWeb(scope.row)">查看网站详情</el-button>
        </template>
      </el-table-column>
    </el-table>
   </el-card>
   <el-dialog
        title="复制地址"
        width="40%"
        :show-close="false"
        :visible.sync="webmsg"
    >
      <div>
        <div class="top box a-center">
          <div class="input">
            <el-input v-model="url" size="mini"></el-input>
          </div>
          <div>
            <el-button type="danger" size="small"
            v-clipboard:copy="url"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError">
              复制
            </el-button>
          </div>
        </div>
        <div class="desc">
          如无法使用上方复制按钮，请选中内容后，使用 Ctrl + C 复制。也可扫描下方二维码或右键保存二维码进行访问。
        </div>
      </div>
      <div class="code box space-center a-center">
        <div id='qrcode' ref="qrcode"></div>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="sureMsg">取 消</el-button>
      <el-button type="primary" @click="sureMsg">确 定</el-button>
    </span>
    </el-dialog>
 </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import {createNamespacedHelpers} from 'vuex'
const homeModule = createNamespacedHelpers('home')
const {mapActions:homeActions,mapState:homeState} = homeModule
 export default {
   data () {
     return {
       webmsg:false,
       url:'',
       qrcode:''
     }
   },
   components: {

   },
   methods: {
     ...homeActions(['getQuestion']),
     gotoWeb(row){
      this.url = row.url
      this.webmsg = true
      this.$nextTick(() => {
        this.qrcodeScan()
      })
     },
     sureMsg(){
        this.webmsg = false
        this.$refs.qrcode.innerHTML = ''
     },
     qrcodeScan() { // 生成二维码
      this.qrcode = new QRCode('qrcode', {
          text: this.url, // 二维码地址
          width: 200, // 二维码宽度
          height: 200, // 二维码高度
        })
    },
    onCopy(){
      this.$message.success('复制成功')
    },
    onError(){
      this.$message.success('复制失败')
    }
   },
   mounted() {
     this.getQuestion()
   },
   watch: {

   },
   computed: {
     ...homeState(['question'])
   }
 }
</script>

<style scoped lang='scss'>
.top {
  width: 100%;
  .input {
    flex: 1;
    margin-right: 20px;
  }
}
.desc {
  background: #EBF5FF;
  color: #657180;
  font-size: 14px;
  padding: 15px 10px;
  margin-top: 20px;
  line-height: 1.5;
  border-radius: 8px;
}
.code {
  height: 200px;
  width: 100%;
  margin-top: 20px;
  #code {
    width: 200px;
    height: 200px;
  }
}
</style>