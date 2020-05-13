<template>
 <div class="box">
   <div class="tree">
     <el-tree :data="tree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
   </div>
   <div class="right">
     <div class="container box a-center" v-if="searchList.length>0">
       <div class="content" v-for="(item,index) in searchList" :key="index">
          <el-card class="card">
            <div slot="header" class="top box a-center">
              <div class="img">
                <img :src="item.img" alt="">
              </div>
              <div class="t-desc">
                <div class="name">
                  {{item.name}}
                </div>
                <div class="t-con">
                  <div>
                    {{item.department}} / <span v-if="item.position !== ''">{{item.position}}</span><span
                      v-else>未设置</span>
                  </div>
                </div>
                <div class="tag-con box a-center">
                  <div class="tag box a-center" v-if="item.tag.length === 0">
                    <i class="el-icon-circle-plus-outline"></i>
                    <div style="margin-left: 4px">
                      快来给Ta添加第一个标签吧
                    </div>
                  </div>
                  <div v-for="(tag, index1) in item.tag" :key="index1" v-else>
                    <div class="tag-item" :style="{background: colors[Math.abs(item.num - index1)]}">
                      {{tag.name}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="desc">
              <div class="item">
                邮箱 : {{item.email}}
              </div>
              <div class="item">
                手机号码 : {{item.phone}}
              </div>
              <div class="item">
                办公电话 : {{item.tel}}
              </div>
              <div class="item">
                性别 : {{item.gender === 0 ? '男' : "女"}}
              </div>
              <div class="item">
                QQ : {{item.qq}}
              </div>
            </div>
          </el-card>
       </div>
     </div>
     <div v-else>
      暂无数据
     </div>     
   </div>
 </div>
</template>

<script>
import config from '../../config'
import {createNamespacedHelpers} from 'vuex'
const mailModule = createNamespacedHelpers('maillist')
const {mapActions:mailActions,mapState:mailState} = mailModule
 export default {
   data () {
     return {
       defaultProps:{
          children: 'children',
          label: 'label'
       },
       colors: [],
       searchList:[]
     }
   },
   components: {

   },
   methods: {
     ...mailActions(['getMail','getTree']),
     handleNodeClick(e){
        let keywords = e.label
        this.searchList = this.mail.filter(item => {
          return JSON.stringify(item).includes(keywords)
        })
     }
   },
   mounted() {
     this.getTree()
     this.getMail().then(()=>{
       this.searchList = this.mail
       this.colors = config.colors
        this.mail.map(item => {
          item.num = parseInt(Math.random() * this.colors.length)
        })
     })
   },
   watch: {

   },
   computed: {
     ...mailState(['mail','tree'])
   }
 }
</script>

<style scoped lang='scss'>
.tag-con{
  flex-wrap: wrap;
}
.tree {
  flex: 1;
  position: relative;
  top: 6px;
  margin-right: 16px;
}
.right{
  flex: 5;
  .container {
    flex: 5;
    flex-wrap: wrap;
    .content {
      width: 32%;
      margin: 5px;
    }
  }
}
.top {
  .img {
    width: 80px;
    height: 80px;
    margin-right: 20px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
.item {
  margin-bottom: 5px;
  font-size: 14px;
}
.t-desc {
  .name {
    font-size: 18px;
    margin-bottom: 8px;
  }
  .t-con {
    font-size: 14px;
    margin-bottom: 8px;
  }
}
.tag {
  font-size: 14px;
  color: #ccc;
}
.tag-item {
  margin: 2px 0;
  font-size: 14px;
  border-radius: 20px;
  color: #fff;
  padding: 4px 10px;
  margin-right: 4px;
}
.desc {
  position: relative;
  left: 20px;
}
.noData {
  color: #0285DC;
}
</style>