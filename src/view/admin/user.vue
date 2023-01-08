<template>
  <div class="add-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
      <el-form-item label="姓名" prop="username" style="width:60%" required>
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="格言" prop="usermotto" style="width:60%" required>
        <el-input v-model="ruleForm.usermotto"></el-input>
      </el-form-item>
      <el-form-item label="技能标签"  prop="tags" required> 
        <el-tag :key="tag" v-for="tag in tags" closable :disable-transitions="false" @close="handleClose(tag)">
          {{tag}}
        </el-tag> 
        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" 
        @blur="handleInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">添加标签</el-button>
      </el-form-item> 
      <el-form-item label="头像" prop="avatar"> 
        <el-upload
          class="avatar-uploader"
          action=""
          :http-request="uploadCover"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload">
          <img v-if="ruleForm.avatar" :src="ruleForm.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="个性化banner图" prop="bannerAvatar">
        <el-upload action="" list-type="picture-card" :http-request="uploadCover1" :before-upload="beforeAvatarUpload">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)"> 
                <i class="el-icon-download"></i>
              </span>
              <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  size="medium" round @click="submitForm('ruleForm')">确定</el-button>
        <el-button  size="medium" round>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import api, { url } from '../../utils/api'
export default {
  name: "add",
  data(){
    return{
      ruleForm:{
        username: '',
        usermotto: '',
        tags: '',
        avatar: ''
      },
      tags: [],
      inputVisible: false,
      inputValue: '',
      rules: {},

      defaultAvatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: []
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = this.ruleForm;
          // 生成导航栏
          params.userid = this.$store.state.userInfo.userid;
          params.tag = this.tags.join(',');
          if(this.fileList.length) {
            params.filelist = this.fileList.join(',');
          }
          if(!params.avatar) {
            params.avatar = this.defaultAvatar;
          }
          api.setUserInfo(params).then(res => {
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

    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    
    // 添加标签
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      if (this.inputValue) {
        if(this.tags.indexOf(this.inputValue) > -1) {
          this.$message({
            type: "waring",
            message: '不能重复添加'
          });
        return
        } else {
          this.tags.push(this.inputValue);
        }
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    
    // 上传图片
    uploadCover(file) {
      var formData = new FormData();
      formData.append("cover",file.file);
      formData.uploadType = '1';
      api.uploadHeadSculpture(formData).then(res => {
        if(res && res.code == 0){
          this.$message({
            type: "success",
            message: res.message
          });
          this.ruleForm.avatar = url + res.data;
        } else {
          this.$message({
            type: "error",
            message: file.message
          });
        }
      })
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
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    }
  }
};
</script>
<style>
  .add-container{
    margin-top: 20px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    display: block;
  }

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

  .el-form-item__content .button-new-tag{
     margin-left: 10px;
  }
  .el-form-item__content .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }


</style>