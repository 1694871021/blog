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




// 登录
const login = (params) =>{
  return POST(params,url + '/userLogin')
}
// 注册
const registration = (params) =>{
  return POST(params,url + 'articles/registration')
}

// 上传文章图片
function upload(params) {
  return LOAD(params, url + '/uploadImg', {'Content-Type': 'multipart/form-data'})
} 
// 上传封面图片
function uploadcoverImg(params) {
  return LOAD(params, url + '/uploadcoverImg', {'Content-Type': 'multipart/form-data'})
} 

// 获取验证码
function getCaptcha(params) {
  return GET(params, url + '/getCaptcha')
} 
// 验证码验证
function verifyCaptcha(params) {
  return GET(params, url + '/verifyCaptcha')
}

// 注册邮箱验证码发送
function getEmailCode(params) {
  return POST(params, url + '/getEmailCode')
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
  login,
  registration,

  getCaptcha,
  upload,
  uploadcoverImg,
  verifyCaptcha,
  getEmailCode
}



