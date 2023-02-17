<!-- 网站背景图 -->
<template>
  <div>
    <el-button type="primary"  size="mini" @click="handleEdit" style="padding: 7px 22px;margin-bottom: 10px">新增</el-button>
    <el-table
      :data="list"
      highlight-current-row
      v-loading="listLoading"
      @selection-change="selsChange"
      style="width: 100%;"
      header-row-class-name="splice-header"
    >
      <el-table-column type="selection" width="30"></el-table-column>
      <el-table-column prop="navname" label="导航菜单" width="100"></el-table-column>
      <el-table-column prop="site" label="菜单英文名" width="100"></el-table-column>
      <el-table-column prop="introduction" label="菜单简介" width="200"></el-table-column>

      <el-table-column prop="isswitch" label="是否切换背景" width="120"></el-table-column>
      <el-table-column prop="switchtime" label="切换背景时间" width="120"></el-table-column>
      <el-table-column prop="filelist" label="背景图"  style="padding: 5px;overflow:hidden;">
        <template slot-scope="scope">
          <span v-for="item in scope.row.filelist" :key="item.url">
            <img :src="item.url" max-width="50" height="50" style="margin-right: 5px; border-radius: 6px;" />
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog custom-class="custom-dialog" :title="dialogTitle" :visible.sync="dialogVisible" width="80%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" size="mini">
        <el-form-item label="菜单名称" prop="navname" style="width:50%" required>
          <el-input v-model="ruleForm.navname"></el-input>
        </el-form-item>
        <el-form-item label="菜单名称英文名" prop="site" style="width:50%" required>
          <el-input v-model="ruleForm.site"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="introduction" style="width:50%" required>
          <el-input type="textarea" v-model="ruleForm.introduction"></el-input>
        </el-form-item>
        <el-form-item label="是否切换背景" prop="isswitch" style="width:10%">
          <el-switch v-model="ruleForm.isswitch"></el-switch>
        </el-form-item>
        <el-form-item label="切换背景时间" prop="switchtime" style="width:20%">
          <el-input v-model="ruleForm.switchtime"></el-input>
        </el-form-item>
        <el-form-item class="banner-image-select clearfix" label="背景图" prop="filelist">
          <li class="pic-list" v-for="(file, index) in ruleForm.filelist" :key="file.navname">
            <img :src="file.url" alt="">
            <p class="icon-delete">
              <i class=" el-icon-delete" @click="handleRemove(file, index)"></i>
            </p>
          </li>
          <div class="add-box">
            <input id="upfile" name="upfile" type="file" accept=".jpg, .jpeg .png, .gif" @change="uploadCover()" >
            <i class="icon-plus el-icon-plus"></i>
          </div>
        </el-form-item>
        <el-form-item style="text-align: right">
          <el-button type="primary"  size="mini" round @click="submitForm('ruleForm')">保存</el-button>
          <el-button  size="mini" round @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>

</template>
<script>
import api, { url } from '../../utils/api';
export default {
  data() {
    return {
      list: [],
      listLoading: true,
      sels: [],
      dialogVisible: false,
      ruleForm:{
        navname: '',
        site: '',
        introduction: '',
        isswitch: true,
        switchtime: 8,
        filelist: [],
      },
      rules: {},
      disabled: false,
      dialogTitle: '新增',

      fileList: []
    }
  },
  mounted() {
    this.getBannerList()
  },
  methods: {
    getBannerList() {
      api.getBannerList({ userid: this.$store.getters.getuserId }).then(res => {
        if (res && res.code == 0) {
          this.list = res.data.map((item)=> {
            return Object.assign({}, item, {filelist: JSON.parse(item.filelist)}, {isswitch: JSON.parse(item.isswitch)})
          });
          this.listLoading = false;
        } else {
          this.$message({
            type: "error",
            message: "获取失败"
          })
        }
      })
    },
    
    selsChange: function(sels) {
      this.sels = sels;
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.ruleForm));
          params.filelist = JSON.stringify(this.ruleForm.filelist);
          params.userid = this.$store.getters.getuserId;
          api.setBannerImage(params).then(res => {
            if(res && res.code==0){
              this.$refs['ruleForm'].resetFields()
              this.dialogVisible = false;
              this.getBannerList();
              this.$message({
                type: "success",
                message: "添加成功"
              });
            }
          })
        } else {
          return false;
        }
      });
    },
    uploadFile(){
        document.getElementById("#upfile").click();            
    },
    // 上传图片
    uploadCover() {
      let file = document.getElementById("upfile").files[0]
      if (file.size / 1024 / 1024 > 2) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
        return
      }
      if(file.name && !/\.(?:jpg|jpeg|png|gif)$/.test(file.name)){ 
        this.$message.error('上传的图片格式只能是：jpg, png, gif');
        return; 
      } 
      var formData = new FormData();
      formData.append("cover",file);
      formData.append("uploadType", 1);
      api.uploadImg(formData).then(res => {
        if(res && res.code == 0){
          this.ruleForm.filelist.push({
            name: file.name,
            url: url + res.data
          })
          this.$message({
            type: "success",
            message: res.message
          });
        } else {
          this.$message({
            type: "error",
            message: file.message
          });
        }
      })
    },
    
    //显示编辑界面
    handleEdit: function(index, row) {
      var t = this;
      if(row) {
        this.dialogTitle = '编辑'
        this.ruleForm = row;
        this.dialogVisible = true;
      } else {
        this.dialogVisible = true;
        this.dialogTitle = '新增';
        this.$nextTick(function(){
          this.$refs['ruleForm'].resetFields();
        })
      }
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        api.delArticle({ articleId: row.articleId }).then(res => {
          if (res && res.code == 0) {
            this.list.splice(index, 1);
            this.$message({
              type: "success",
              message: "删除成功"
            });
          } else {
            this.$message({
              type: "error",
              message: "删除失败"
            })
          }
        })
      }).catch(() => {});
    },
    handleRemove(file, index) {
      var path = file.url.split('3001')[1];
      api.delImg({path}).then((res)=> {
        if(res.code == 0) {
          this.ruleForm.filelist.splice(index, 1);
          // 删除后更新数据
          api.undateImg({site: this.ruleForm.site,userid: this.$store.getters.getuserId, filelist: JSON.stringify(this.ruleForm.filelist)}).then((res)=>{
            if(res.code == 0) {
              this.$message({
                type: "succsee",
                message: res.message
              })
            } else {
              this.$message({
                type: "error",
                message: res.message
              })
            }
          })
          
        } else {
          this.$message({
            type: "error",
            message: res.message
          })
        }
      })
    }
  }
}
</script>
<style>
.el-table__header .splice-header th {
  padding: 6px 0 !important;
}

.el-table__header .splice-header .cell {
  text-overflow: clip;
}

.custom-dialog {
  margin-top: 5vh !important;
}

.banner-image-select .pic-list {
  width: 150px;
  border: 1px dashed #409EFF;
  border-radius: 6px;
  margin: 0 10px 10px 0;
  position: relative;
  float: left;
}

.banner-image-select .pic-list img{
  width: 100%;
  height: 100%;
  display: block;
}

.banner-image-select .pic-list .icon-delete {
  width: 100%;
  height: 100%;
  font-size: 22px;
  line-height: 90px;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255,255,255, 0.8);
  opacity: 0;
}

.banner-image-select .pic-list .icon-delete>i {
  cursor: pointer;
}

.banner-image-select .pic-list .icon-delete:hover {
  opacity: 1;
}

.banner-image-select .add-box {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  cursor: pointer;
  line-height: 100px;
  position: relative;
  float: left;
}

.banner-image-select .add-box .icon-plus {
  position: absolute;
  top: 50%;
  font-size: 26px;
  left: 50%;
  transform: translate(-50%, -50%);
}

.banner-image-select input {
  width: 100%;
  height: 100%;
  display: inline-block;
  opacity: 0;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
</style>