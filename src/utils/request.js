import axios from "axios";
import qs from "qs";
import { MessageBox, Message } from 'element-ui'
import NProgress from "nprogress";
import 'nprogress/nprogress.css';
import router from "../router"

NProgress.configure({ showSpinner: false })
// axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

service.interceptors.request.use(
  config => {
    NProgress.start()
    // if(store.setter.token) {
    //   config.headers['Authorization'] = store.getters.headers;
    // }
    // config.headers['Authorization'] = 'name=value; Admin-Token=admin-token; sidebarStatus=0; JSESSIONID=1BBF35D24C2718DEF6B4A77460258BA8';
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)
service.interceptors.response.use(
  response =>{
    NProgress.done()
    return response;
  },
  error => {
    if(error.response) {
      switch (error.response.status) {
        case 401: 
          Message({
            message: res.message || 'Error',
            type: 'error',
            duration: 5 * 1000
          })
          // store.commit();
          router.replace({
            path: '/login'
          })
      }
    }
    return Promise.reject(error);    
  }
)

// headers = {
//   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//   'Access-Control-Allow-Credentials':true,
//   'Access-Control-Allow-Headers': 'x-requested-with,Origin, Content-Type, Cookie, Accept',
//   'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, OPTIONS',
//   'OPTIONSAccess-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Origin': '*'
// }
export function POST(params = {}, url, headers = {}) {
  return new Promise((resolve, reject) => {
    service({
      method: 'POST',
      url: url,
      data: qs.stringify(params),
      headers: Object.assign({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}, headers)
    }).then((res) => {
      resolve(res.data)
    }).catch((error)=>{
      reject(error)
    })
  })
}

export function GET(params = {}, url, headers = {}) {
  return new Promise((resolve, reject) => {
    service({
      method: 'GET',
      url: url,
      params: params,
    }).then((res) => {
      resolve(res.data)
    }).catch((error)=>{
      reject(error)
    })
  })
}

export function LOAD(params = {}, url, headers = {}) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: url,
      data: params,
      headers: Object.assign({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}, headers)
    }).then((res) => {
      resolve(res.data)
    }).catch((error)=>{
      reject(error)
    })
  })
}
// export default {
//   POST,
//   GET,
//   http: service
// }