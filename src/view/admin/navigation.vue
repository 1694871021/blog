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
      <el-table-column prop="navname1" label="菜单英文名" width="100"></el-table-column>
      <el-table-column prop="introduction" label="菜单简介" width="200"></el-table-column>

      <el-table-column prop="isswitch" label="是否切换背景" width="120"></el-table-column>
      <el-table-column prop="switchtime" label="切换背景时间" width="120"></el-table-column>
      <el-table-column prop="filelist" label="背景图"  style="padding: 5px;overflow:hidden;">
        <template slot-scope="scope">
          <span v-for="item in scope.row.filelist" :key="item.url">
            <img :src="item.url" max-width="50" height="50" style="padding: 0 5px 2px 0; border-radius: 6px;" />
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
        <el-form-item label="菜单名称英文名" prop="navname1" style="width:50%" required>
          <el-input v-model="ruleForm.navname1"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="introduction" style="width:50%" required>
          <el-input type="textarea" v-model="ruleForm.introduction"></el-input>
        </el-form-item>
        <el-form-item label="是否切换背景" prop="isswitch" style="width:10%" required>
          <el-switch v-model="ruleForm.isswitch"></el-switch>
        </el-form-item>
        <el-form-item label="切换背景时间" prop="switchtime" style="width:20%" required>
          <el-input v-model="ruleForm.switchtime"></el-input>
        </el-form-item>
        <el-form-item class="banner-image-select" label="背景图" prop="filelist" required>
          <ul class="el-upload-list el-upload-list--picture-card">
            <li :tabindex="index" class="el-upload-list__item is-ready" v-for="(file, index) in ruleForm.filelist" :key="file.navname">
              <div>
                <span>
                  <img :src="file.url" alt="" class="el-upload-list__item-thumbnail">
                  <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </span>
              </div>
            </li>
          </ul>
          <el-upload action="" list-type="picture-card" :http-request="uploadCover1" :before-upload="beforeAvatarUpload">
            <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                <span class="el-upload-list__item-actions">
                  <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item style="text-align: right">
          <el-button type="primary"  size="mini" round @click="submitForm('ruleForm')">保存</el-button>
          <el-button  size="mini" round>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>

</template>
<script>
import api from '../../utils/api';
export default {
  data() {
    return {
      list: [],
      listLoading: false,
      sels: [],
      dialogVisible: false,
      ruleForm:{
        navname: '',
        navname1: '',
        introduction: '',
        isswitch: true,
        switchtime: 8,
        filelist: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
      },
      rules: {},
      disabled: false,
      dialogTitle: '新增',

      fileList: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ]
    }
  },
  mounted() {
    api.getBannerList({ userid: this.$store.getters.getuserId }).then(res => {
      if (res && res.code == 0) {
        this.list = res.data.map((item)=> {
          return Object.assign({}, item, {filelist: JSON.parse(item.filelist)})
        });
      } else {
        this.$message({
          type: "error",
          message: "获取失败"
        })
      }
    })
  },
  methods: {
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
    //显示编辑界面
    handleEdit: function(index, row) {
      if(index) {
        this.dialogTitle = '编辑'
      } else {
        this.dialogTitle = '新增'
      }
      this.dialogVisible = true; 
    },
    selsChange: function(sels) {
      this.sels = sels;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = this.ruleForm;
          // 生成导航栏
          if(this.fileList.length) {
            params.filelist = JSON.stringify(this.fileList);
          }
          params.userid = this.$store.state.userInfo.userid;
          api.setBannerImage(params).then(res => {
            if(res && res.code==0){
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
    uploadCover1(file) {
      var formData = new FormData();
      formData.append("cover",file.file);
      formData.uploadType = '2';
      api.uploadHeadSculpture(formData).then(res => {
        if(res && res.code == 0){
          this.fileList.push({
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
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    handleRemove(file) {
      console.log(file);
    }
  }
}
</script>
<style>
.el-table__header .splice-header th {
  padding: 6px 0 !important;
}

.custom-dialog {
  margin-top: 5vh !important;
}

.banner-image-select .el-form-item__content {
  display: flex;
}
</style>