import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

var state = {
  content: {
    id: '',
    title: '',
    content: ''
  },
  userInfo: {
    username: '',
    avatar: '',
    userid: '',
  }
};
var getters = {
  getCount(state) {
    return state.content
  }
};

// 同步调用
var mutations = {
  increment(state, payload) {
    if (payload) {
      for(item in payload) {
        state.userInfo[item] = payload[item]
      }
    }
  },
  setuserInfo(state, payload) {
    state.userInfo = payload
  }
};

// 异步调用
// https://my-json-server.typicode.com/ 网站可连接github仓课上的数据 如(bd.json)
var url = 'https://my-json-server.typicode.com/1694871021/test/posts';

var actions = {
  increment1({ commit }, payload) {
    fetch(url + '/' + payload, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded'
        // "content-type": "application/json;charset=UFT-8"
      },
      method: 'GET'
    }).then(response => {
      if (response.ok) {
        return response.json() // 解析为可读数据
      } else {
        return Promise.reject('请求失败')
      }
    }).then((res) => {  //执行结果是 resolve就调用then方法，，第二个then是真正的数据 
      commit('increment', res)
    })
      .catch(e =>
        console.log("error")
      ) //执行结果是 reject就调用catch方法
  }
};
var modules = {};
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules
});