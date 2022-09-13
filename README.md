
git上传远程仓库

1.git init首先新建一个文件夹在当前文件夹下初始化一个git仓库

2.git add . （将当前工作区的所有文件存放到暂存区）

3.git commit -m “我的第一提交”

4.git remote add origin 远程仓库地址

5.git push -u origin master

webpack工作原理

Webpack 启动后，会根据我们的配置，找到项目中的某个指定文件（一般这个文件都会是一个 JS 文件）作为入口。然后顺着入口文件中的代码，根据代码中出现的 import（ES Modules）或者是 
require（CommonJS）之类的语句，解析推断出来这个文件所依赖的资源模块，然后再分别去解析每个资源模块的依赖，周而复始，最后形成整个项目中所有用到的文件之间的依赖关系树

有了这个依赖关系树过后， Webpack 会遍历（递归）这个依赖树，找到每个节点对应的资源文件，然后根据配置选项中的 Loader 配置，交给对应的 Loader 去加载这个模块，最后将加载的结果放入 bundle.js
（打包结果）中，从而实现整个项目的打包

  一、Webpack CLI 启动打包流程；
  二、载入 Webpack 核心模块，创建 Compiler 对象；
  三、使用 Compiler 对象开始编译整个项目；
  四、从入口文件开始，解析模块依赖，形成依赖关系树；
  五、递归依赖树，将每个模块交给对应的 Loader 处理；
  六、合并 Loader 处理完的结果，将打包结果输出到 dist 目录。

项目启动:
  npm run dev
项目打包:
  npm run build

!!! 最后在引入npm包时候一定要注意包的版本，某些包版本不一致就会一直报错，找不到原因

引入vue2 npm i vue@2 vue-loader@15 vue-template-compiler@2
引入vue3 npm i vue@3 vue-loader@16 vue-template-compiler@3

122133

