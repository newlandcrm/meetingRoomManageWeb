<template>
    <div  class="container">
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
          <span>我的预定列表</span>
        </div>
        <div>
      <el-table
        :data="roomReserve"
        v-loading="loading"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          prop="startdate"
          label="开始时间"
          sortable
          width="160"
          :formatter="formatDate"
        align="center"
        >
        </el-table-column>
        <el-table-column
          prop="enddate"
          label="结束时间"
          width="160"
          align="center"
          :formatter="formatDate">
        </el-table-column>
        <el-table-column
          prop="room.name"
          label="会议室名称"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="room.addr"
          label="会议室地址"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="content"
          label="主题"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            v-if="roomReserve[scope.$index].startdate>today">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
        </div>
      </el-card>
      <div style="margin-top:13px"></div>
    </div>
</template>
<script>
  import axios from 'axios'
export default {
    name: 'CenterProcess',
    data() {
      return {
        roomReserve: [],
          today:'',
          loading:true
      };
    },
  methods:{
    getRoomReserve(){
        if(this.$store.state.userid) {
            this.today = new Date().getTime()
            let params = {
                userid: this.$store.state.userid
            }
            axios.post('http://localhost:9001/roomReserve/search', params)
                .then((res) => {
                    if (res.data.code === 20000) {
                        this.loading = false
                        this.roomReserve = res.data.data
                    } else {
                        this.$message({
                            message: '网络连接失败！',
                            type: 'danger'
                        })
                    }
                }).catch((error) => {
                console.log(error)
            })
        }else{
            this.loading = false
            this.$confirm('请先登录', '提示', {
                confirmButtonText: '直接登录',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$router.push({
                    name: 'Log',
                    params: { },
                })
            })
        }
    },
    formatter(row, column) {
      return row.address;
    },
    handleEdit(index, row) {
        this.$confirm('此操作将重新开始预定，是否确定?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$router.push({
                name: 'Meetingroom',
                params: {}
            })
            axios.delete('http://localhost:9001/roomReserve/'+row.id)
                .then((res) => {
                    if (res.data.code === 20000) {
                        this.$message({
                            message: '删除成功！！',
                            type: 'success'
                        })
                    } else {
                        this.$message({
                            message: '删除失败！',
                            type: 'danger'
                        })
                    }
                }).catch((error) => {
                console.log(error)
            })
        })
    },
    handleDelete(index, row) {
        axios.delete('http://localhost:9001/roomReserve/'+row.id)
            .then((res) => {
                if (res.data.code === 20000) {
                    this.$message({
                        message: '删除成功！！',
                        type: 'success'
                    })
                } else {
                    this.$message({
                        message: '删除失败！',
                        type: 'danger'
                    })
                }
            }).catch((error) => {
            console.log(error)
        })
    },

    //时间格式化
    formatDate(row, column) {
      let moment = require("moment");
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    }

  },
  mounted(){
      this.getRoomReserve()
  }

}
</script>
<style lang="stylus" scoped>
     @import '~styles/varibles.styl'
    .container
        padding 0 0 0 10px
        width 90%
        .list
            padding 0 100px
            textStyle()
            .title
                color $bgColor
                font-size 15px
            .el-timeline
                margin-top 10px
</style>
