<template>
  <div class="add-container">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" size="mini">
      <el-form-item label="文章名称" style="width:60%" prop="title" required>
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="文章摘要" style="width:60%" prop="summary" required>
        <el-input v-model="ruleForm.summary"></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="tags" required> 
        <el-tag :key="tag" v-for="tag in tags" closable :disable-transitions="false" @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">添加标签</el-button>
      </el-form-item> 
      <el-form-item label="文章图片" prop="coverImage" required> 
        <el-upload
          class="avatar-uploader"
          action=""
          :http-request="uploadCover"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess">
          <img v-if="ruleForm.coverImage" :src="ruleForm.coverImage" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="编辑内容" prop="content" required>
        <mavon-editor ref=md :toolbars="toolbars" v-model="ruleForm.content" @imgAdd="$imgAdd" class="md"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  size="medium" round @click="onSubmit">确定</el-button>
        <el-button  size="medium" round>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import moment from 'moment';
import api, { url } from '../../utils/api'
export default {
  name: "add",
  data(){
    return{
      ruleForm:{
        title: '',
        coverImage: '',
        tags: '',
        content: '',
        time: ''
      },
      tags: [],
      inputVisible: false,
      inputValue: '',
      rules: {},

      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      }
    }
  },
  methods: {
    onSubmit:function(){
      let params = this.ruleForm;
      let menu = document.getElementsByClassName('v-note-navigation-content')[0].innerHTML; // 生成导航栏
      params.articleId = Number(Math.random().toString().substr(3,10) + Date.now()).toString(36);
      params.time = moment().format('YYYY-MM-DD HH:mm:ss');
      params.tags = this.tags.join(',');
      params.menu = menu;
      api.addArticle(params).then(res => {
        if(res && res.code==0){
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.$router.push({path: '/admin/list'});
        }
      })
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    // 上传展示图片
    handleAvatarSuccess(res, file) {
      console.log(1111111111111, res, file)
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 上传展示大图
    upLoad (req) {
      // const config = {
      //   headers: {'Content-Type': 'multipart/form-data'}
      // }
      // let filetype = ''
      // if (req.file.type === 'image/png') {
      //   filetype = 'png'
      // } else {
      //   filetype = 'jpg'
      // }
      // const keyname = 'qnly-images' + '-personal-blog' + new Date().getTime() + '.' + filetype
      // api.getToken({}).then(res => {
      //   if(res&&res.data&&res.code==0){
      //     // 从后端获取上传凭证token
      //     let token = res.data.uptoken;
      //     const formdata = new FormData()
      //     formdata.append('file', req.file)
      //     formdata.append('token', token)
      //     formdata.append('key', keyname)
      //     // 获取到凭证之后再将文件上传到七牛云空间
      //     axios.post(this.domain, formdata, config).then(res => {
      //       this.form.showImg = 'http://' + this.qiniuaddr + '/' + res.data.key
      //       this.imageUrl = this.form.showImg;
      //     })
      //   }
      // })
      
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },

    // 上传文章插图
    $imgAdd(pos, $file){
      var formData = new FormData();
      //创建formdata对象
      formData.append("cover",$file);
      formData.uploadType = 4;
      api.uploadImg(formData).then(res => {
        if(res && res.code == 0){
          var imgUrl = url + res.data;
          this.$refs.md.$img2Url(pos, imgUrl);
        }else {

        }
      })

    },

    // 处理标签
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
      let inputValue = this.inputValue;
      if (inputValue) {
        this.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },

    // 上传文章封面图
    uploadCover(file) {
      var formData = new FormData();
      formData.append("cover",file.file);
      formData.uploadType = 2;
      api.uploadImg(formData).then(res => {
        if(res && res.code == 0){
          this.$message({
            type: "success",
            message: res.message
          });
          this.ruleForm.coverImage = url + res.data;
        } else {
          this.$message({
            type: "waring",
            message: file.message
          });
        }
      })
      
    }
  }
};
</script>
<style lang="css">
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
  .avatar-uploader .el-upload--text{
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
  .el-upload-list--picture-card .el-upload-list__item{
    height: auto;
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
  .el-form-item__content .button-new-tag{
     margin-left: 10px;
  }
  .el-form-item__content .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .md{
    min-height: 500px;
  }
</style>