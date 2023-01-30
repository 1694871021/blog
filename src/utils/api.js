import { GET, POST, LOAD, http } from './request.js';

export let url = 'http://127.0.0.1:3001'; //开发环境

// export let url = 'http://47.243.61.198:3001'; //生成环境

// 添加文章
const addArticle = (params) =>{
  return POST(params,url + '/addArticle')
}
// 删除文章
const delArticle = (params) =>{
  return POST(params,url + '/delArticle')
}
// 文章列表
const getRecommendList = (params) =>{
  return POST(params,url + '/getArticleList')
}
// 文章详情
const getArticleInfo = (params) =>{
  return POST(params,url + '/getArticleInfo')
}
// 文章详情
const addRecord = (params) =>{
  return POST(params,url + '/addRecord')
}

// 评论
const postComments = (params) =>{
  return POST(params,url + '/users/postComments')
}
const getCommentsList = (params) =>{
  return POST(params,url + '/users/getCommentsList')
}
const commentstTumbsup = (params) =>{
  return POST(params,url + '/users/commentstTumbsup')
}
const commentsDel = (params) =>{
  return POST(params,url + '/users/commentsDel')
}
const postdianzan = (params) =>{
  return POST(params,url + '/users/postdianzan')
}
const postshoucang = (params) =>{
  return POST(params,url + '/users/postshoucang')
}


// 用户信息
const setUserInfo = (params) =>{
  return POST(params,url + '/setUserInfo')
}
const getUserInfo = (params) =>{
  return POST(params,url + '/getUserInfo')
}
const setBannerImage = (params) =>{
  return POST(params,url + '/setBannerImage')
}
const getBannerList = (params) =>{
  return POST(params,url + '/getBannerList')
}


// 登录
const login = (params) =>{
  return POST(params,url + '/userLogin')
}
// 注册
const register = (params) =>{
  return POST(params,url + '/register')
}

// 上传文章图片
function uploadImg(params) {
  return LOAD(params, url + '/uploadImg', {'Content-Type': 'multipart/form-data'})
} 

// 获取验证码
function getCaptcha(params) {
  return GET(params, url + '/getCaptcha')
} 
// 验证码验证
function verifyCaptcha(params) {
  return POST(params, url + '/verifyCaptcha')
}

// 注册邮箱验证码发送
function getEmailCode(params) {
  return POST(params, url + '/getEmailCode')
}

// 新闻列表
function getnewList(params) {
  // https://api.iwyu.com/API/weibo/ 微博热搜接口
  return GET(params, '/api/hotnews/all');
}

// 法定节日列表
function getFestivals(params) {
  // http://opendata.baidu.com/api.php?query=2020年&resource_id=6018&format=json 百度数据 节假日数据接口
  // https://apis.tianapi.com/jiejiari/index?key=7e78d6ba1d8af5438c42d2f3ffcbb366&date=2021-01-01 天行数据 节假日数据接口
  return GET(params, 'https://apis.tianapi.com/jiejiari/index');
}
export default {
  url,
  addArticle,
  delArticle,
  getRecommendList,
  getArticleInfo,
  addRecord,
  postComments,
  getCommentsList,
  commentstTumbsup,
  commentsDel,
  postdianzan,
  postshoucang,
  setUserInfo,
  getUserInfo,
  setBannerImage,
  getBannerList,
  login,
  register,

  getCaptcha,
  uploadImg,
  verifyCaptcha,
  getEmailCode,
  getnewList,
  getFestivals
}



