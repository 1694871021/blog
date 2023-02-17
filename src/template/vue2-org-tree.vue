<template>
  
</template>
<script>
// 安装 插件：npm i vue2-org-tree
// 安装 loader npm install --save-dev less less-loader如果不安装会报错，如果安装的less报错那就卸载原less安装稳定版本 less@3.9.0 less-loader@4.1.0
// main.js 中配置 
// import Vue from 'vue'
// import Vue2OrgTree from 'vue2-org-tree'
// Vue.use(Vue2OrgTree)

// 可cdn引入
// <link href="https://unpkg.com/vue2-org-tree@1.1.0/dist/style.css">
// <script src="https://unpkg.com/vue@2.5.17/dist/vue.js"></script>
// <script src="https://unpkg.com/vue2-org-tree@1.1.0/dist/index.js"></script>

// 基本应用 
// <vue2-org-tree :data="data"/>
// data: {
//   id: 0,
//   label: "总经理",
//   children: [
//     {
//       id: 2,
//       label: "产品研发部",
//       children: [
//         {
//           id: 5,
//           label: "研发-前端"
//         },
//         {
//           id: 6,
//           label: "研发-后端"
//         },
//         {
//           id: 9,
//           label: "UI设计"
//         },
//         {
//           id: 10,
//           label: "产品经理"
//         }
//       ]
//     },
//     {
//       id: 3,
//       label: "销售部",
//       children: [
//         {
//           id: 7,
//           label: "销售一部"
//         },
//         {
//           id: 8,
//           label: "销售二部"
//         }
//       ]
//     },
//     {
//       id: 4,
//       label: "财务部"
//     },
//     {
//       id: 9,
//       label: "HR人事"
//     }
//   ]
// }

// 属性配置
{/* <vue2-org-tree
    :data="data"
    :horizontal="true" //竖直排列
    :label-class-name="labelClassName" // 每个盒子的颜色样式设置
    collapsable //折叠
    @on-expand="onExpand" // 展开
    @on-node-click="NodeClick" //点击事件
/>
collapse(list) {
   var _this = this;
    list.forEach(function(child) {
        if (child.expand) {
          child.expand = false;
        }
        child.children && _this.collapse(child.children);
	});
},
onExpand(e,data) {
    if ("expand" in data) {
       data.expand = !data.expand;
    	if (!data.expand && data.children) {
       		this.collapse(data.children);
    	}
    } else {
        this.$set(data, "expand", true);
    }
},
// 默认展开
toggleExpand(data, val) {
    var _this = this;
    if (Array.isArray(data)) {
        data.forEach(function(item) {
          _this.$set(item, "expand", val);
          if (item.children) {
            _this.toggleExpand(item.children, val);
          }
      	});
    } else {
        this.$set(data, "expand", val);
        if (data.children) {
          _this.toggleExpand(data.children, val);
        }
    }
},
this.toggleExpand(this.data,true),

NodeClick() {} */}
export default {
  data() {
    return {

    }
  },

}
</script>