<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding: 10px;" >
      <el-form :inline="true" :model="filters" size="mini">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="按标题搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUserList">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="list"
      highlight-current-row
      v-loading="listLoading"
      @selection-change="selsChange"
      style="width: 100%;"
    >
      <el-table-column type="selection" width="70"></el-table-column>
      <el-table-column prop="id" label="id" width="70" sortable></el-table-column>
      <el-table-column prop="title" label="标题" width="250" sortable></el-table-column>
      <el-table-column prop="time" label="上传时间" width="100" sortable></el-table-column>

      <el-table-column prop="summary" label="摘要" width="250"></el-table-column>
      <el-table-column prop="tags" label="标签" width="100"></el-table-column>
      <el-table-column prop="type" label="类型" width="50"></el-table-column>
      <el-table-column prop="coverImage" label="封面" width="200" style="padding: 5px;overflow:hidden;">
        <template slot-scope="scope">
          <img :src="scope.row.coverImage" max-width="50" height="50" style="padding: 5px" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="user-page">
      <el-pagination
        layout="prev, pager, next"
        @current-change="currentPage"
        :page-size="10"
        :total="total"
        background
      ></el-pagination>
    </el-col>
  </section>
</template>

<script>
import api from '../../utils/api';  
export default {
  data() {
    return {
      filters: {
        name: ""
      },
      list: [],
      total: 1,
      page: 1,
      listLoading: false,
      sels: [], //列表选中列
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    currentPage(val) {
      this.page = val;
      this.getUserList();
    },
    //获取用户列表
    getUserList() {
      let params = { page: this.page, pagesize:10, userid: this.$store.getters.getuserId};
      this.listLoading = true;
      api.getRecommendList(params).then(res => {
        if (res && res.code == 0) {
          this.list = res.data;
          this.total = res.total;
          this.listLoading = false;
        }
      });
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
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editLoading = true;
      this.$router.push({ path: "/admin/add", query: { row: row } });
      this.editLoading = false;
    },
    selsChange: function(sels) {
      this.sels = sels;
    }
  }
};
</script>

<style slot-scope>
.set-hot {
  line-height: 100%;
  text-align: center;
}
.user-page {
  margin: 15px auto;
  text-align: right;
}
.el-table .cell{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
