import { GET, POST, LOAD, http } from './request.js';

export let url = 'http://127.0.0.1:3001';
// 获取token
function getTempToken(params) {
  return POST(params, '/crm/auth/getToken.do')
}
//获取登录用户信息
function getPageHeaderInfo(params) {
  return POST(params, '/crm/auth/getPageHeaderInfo.do')
}

//更改版本号
function getDictList(params) {
  return POST(params, '/crm/common/getDictList.do')
}

function getCaptcha(params) {
  return GET(params, url + '/getCaptcha')
} 

function upload(params) {
  return LOAD(params, url + '/uploadImg', {'Content-Type': 'multipart/form-data'})
} 

function uploadcoverImg(params) {
  return LOAD(params, url + '/uploadcoverImg', {'Content-Type': 'multipart/form-data'})
} 


// 登录验证码验证
function verifyCaptcha(params) {
  return GET(params, url + '/verifyCaptcha')
}

// 注册验证码发送
function getEmailCode(params) {
  return POST(params, url + '/getEmailCode')
} 

export default {
  url,
  getTempToken,
  getPageHeaderInfo,
  getDictList,
  getCaptcha,
  upload,
  uploadcoverImg,
  verifyCaptcha,
  getEmailCode
}



