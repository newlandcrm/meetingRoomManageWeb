<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>已预订会议室列表</span>
      </div>
      <div>
        <el-table
          :data="roomReserve"
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}"
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
          <el-table-column property="state" label="状态" width="150"
                           align="center">
            <template slot-scope="scope">
              <el-tag type effect="dark" v-if="scope.row.state==0">未审核</el-tag>
              <el-tag type="success" effect="dark" v-if="scope.row.state==1">已通过</el-tag>
              <el-tag type="danger" effect="dark" v-if="scope.row.state==2">未通过</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="daohang(scope.$index, scope.row)">位置导航
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="addpeople(scope.$index, scope.row) "
              >参会人员
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog
          title="添加参加会议室的人员名单"
          :visible.sync="dialogVisible"
          width="40%"
          margin-top="20vh"
          :before-close="AllClose">
          <div style="margin-bottom:30px">
          <el-tag
            :key="tag.id"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
            style="margin: 6px">
            {{tag.name}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
            style="margin: 6px"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small"  @click="showInput" style="margin: 6px" type="danger">点击添加</el-button>
          </div>
          <el-button @click="dialogVisible = false" style="">取 消</el-button>
          <el-button type="primary" @click="sure()">确 定</el-button>
        </el-dialog>
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
                dialogVisible: false,
                dynamicTags: [],
                inputVisible: false,
                inputValue: '',
                reserveid:''
            };
        },
        methods: {
            getRoomReserve() {
                if(this.$store.state.userid){
                var timestamp=new Date().getTime()
                let params = {
                    userid:this.$store.state.userid
                }
                axios.post('http://localhost:9001/roomReserve/search', params)
                    .then((res) => {
                        if (res.data.code === 20000) {
                            // this.roomReserve = res.data.data
                            for (var i=0;i<res.data.data.length;i++){
                                if(timestamp<res.data.data[i].startdate){
                                    this.roomReserve = res.data.data
                                }else{
                                    return false
                                }
                            }
                        } else {
                            this.$message({
                                message: '网络连接失败！',
                                type: 'danger'
                            })
                        }
                    }).catch((error) => {
                    console.log(error)
                })
                }
            },
            getRelaPerson(){
                let params = {
                    reserveid: this.reserveid
                }
                axios.post('http://localhost:9001/relatePerson/search', params)
                    .then((res) => {
                        if (res.data.code === 20000) {
                            this.dynamicTags=[]
                            for (var i=0;i<res.data.data.length;i++){
                                this.dynamicTags.push({name:res.data.data[i].name,id:res.data.data[i].id})
                            }
                        } else {
                            this.$message({
                                message: '网络连接失败！',
                                type: 'danger'
                            })
                        }
                    }).catch((error) => {
                    console.log(error)
                })
            },
            formatter(row, column) {
                return row.address;
            },
            daohang(index, row) {
                this.$router.push({
                    path: '/floor21',
                    params: {roomId: row.room.id},
                })
            },
            addpeople(index, row) {
                this.dialogVisible = true
                this.reserveid = row.id
                this.getRelaPerson()
            },
            AllClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            handleClose(tag) {
                axios.delete('http://localhost:9001/relatePerson/'+tag.id)
                    .then((res) => {
                        if (res.data.code === 20000) {
                            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push({name:inputValue});
                }
                this.inputVisible = false;
                this.inputValue = '';
            },

            sure(){
                var namearray=[]
                for(var i=0;i<this.dynamicTags.length;i++){
                    namearray.push(this.dynamicTags[i].name)
                }
                let params = {
                    reserveid:this.reserveid,
                    relatePerson: namearray
                }
                axios.post('http://localhost:9001/relatePerson/addlist', params)
                    .then((res) => {
                        if (res.data.code === 20000) {
                            this.$message({
                                message: '添加人员成功！',
                                type: 'danger'
                            })
                            this.dialogVisible = false
                        } else {
                            this.$message({
                                message: '添加失败！',
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
        mounted() {
            this.getRoomReserve()
        }

    }
</script>
<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .container
    padding 15px
    width: 90%;
    .list
      padding 0 100px
      textStyle()

      .title
        color $bgColor
        font-size 15px

      .el-timeline
        margin-top 10px

  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
