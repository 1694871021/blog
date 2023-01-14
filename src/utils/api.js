import { GET, POST, LOAD, http } from './request.js';

export let url = 'http://127.0.0.1:3001';
// 获取token
function getTempToken(params) {
  return POST(params, '/crm/auth/getToken.do')
}

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
function upload(params) {
  return LOAD(params, url + '/uploadImg', {'Content-Type': 'multipart/form-data'})
} 
// 上传封面图片
function uploadcoverImg(params) {
  return LOAD(params, url + '/uploadcoverImg', {'Content-Type': 'multipart/form-data'})
} 
function uploadHeadSculpture(params) {
  return LOAD(params, url + '/uploadHeadSculpture', {'Content-Type': 'multipart/form-data'})
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
  return POST(params, 'https://api.codelife.cc/api/top/list',{'csrtoken': 'vjHT4afrsEr6owsTHwRKJ0VwE05JpsrVHLOpdbmbeTwsmF8n6rnQPzS0HdI64WBB'});
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
  setUserInfo,
  getUserInfo,
  setBannerImage,
  getBannerList,
  login,
  register,

  getCaptcha,
  upload,
  uploadcoverImg,
  uploadHeadSculpture,
  verifyCaptcha,
  getEmailCode,
  getnewList
}



