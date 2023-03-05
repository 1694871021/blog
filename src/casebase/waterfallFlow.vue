<template>
  <div  class="page-main">
    <div class="card">
        <div class="coloum1" >
          <div class="card-item" v-for="(item,index) in cardList1" :key="index">
              <p class="title">{{item.detailTitle}}</p>
              <p class="text">{{item.content}}</p>
          </div>
        </div>
        <div class="coloum2">
           <div class="card-item" v-for="(item,index) in cardList2" :key="index">
            <p class="title">{{item.detailTitle}}</p>
              <p class="text">{{item.content}}</p>
          </div>
        </div>
         <div class="coloum3">
           <div class="card-item" v-for="(item,index) in cardList3" :key="index">
            <p class="title">{{item.detailTitle}}</p>
              <p class="text">{{item.content}}</p>
          </div>
        </div>
    </div>
    <div class="visible-div">
      <div class="card-item"  v-for="(item,index) in loadCardList" :key="index">
        <p class="title">{{item.detailTitle}}</p>
        <p class="text">{{item.content}}</p>
      </div>
    </div>
  </div>
</template>
<script>
let heightTotal_1 = 0; // 第一列的卡片高度
let heightTotal_2 = 0; // 第二列的卡片高度
let heightTotal_3 = 0; // 第二列的卡片高度
let valid = true;
export default {
  data() {
    return {
      cardList: [],
      cardList1: [],
      cardList2: [],
      cardList3: [],
      loadCardList: [], // 加载的列表
      isVisibility: true,
      pageNum: 1
    }
  },
  mounted() {
    var _this = this;
    // 初始化数据
    this.getData().then((res)=> {
      _this.loadCardList = [res, res, res].flat();
      _this.handleData();
    })
    // 监听滚动事件 加载数据
    document.addEventListener('scroll',
      this.scrollEvent
    )
  },
  methods: {
    scrollEvent() {
      var _this = this;
      /*判断是否触底*/
      //滚动条距离顶部距离
      let s1 = document.documentElement.scrollTop;
      //页面可视区域高度
      let s2 = document.documentElement.clientHeight;
      // 页面总高度
      let s3 = document.documentElement.scrollHeight;
      //页面可视区域高度 + 滚动条距离顶部距离，大于页面总高度的99%则表示触底
      var delay = null;
      if(Math.round(s1 + s2) >= s3 - 1) {
        // 页面滑动过程又肯会请求多次，用防抖函数限制
        this.debounce(_this.getData().then((res)=> {
          _this.loadCardList = res;
          _this.handleData();
        }), 300)
        
      }
    },
    // 防抖函数
    debounce(fn, delay){
      let timer = null;
      return function(){
        clearTimeout(timer);
        timer = setTimeout(()=> {
          fn.apply(this, arguments);
        }, delay)
      }
    },
    getData() {
      return new Promise((resolve, reject)=> {
        fetch( 'https://my-json-server.typicode.com/1694871021/test/posts' + '/', {
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
          resolve(res)
        }).catch(e =>
          console.log("error")
        ) //执行结果是 reject就调用catch方法
      })
    },
    // 数据加载
    handleData() {
      var _this = this;
      this.$nextTick(()=> {
        // 获取所有的loadCardList在页面渲染的DOM元素
        if(valid) {
          setTimeout(()=> {
            //调用加载数据方法
            var num = 0;
            var addTimer = null;
            var doc = document.querySelectorAll('.visible-div .card-item');
            addTimer = setInterval(()=> {
              _this.loadData(num, doc[num]);
              if( num == _this.loadCardList.length - 1) {
                clearInterval(addTimer);
                _this.loadCardList = [];
              }
              num++; 
            }, 150)
            valid = true;
          }, 300)
          valid = false;
        }
      })
    },
    // 页面滚动加载
    loadData(index, item) {
      // const heightTotal_1 = heightTotal_1.length ? Array.from(heightTotal_1).reduce(( acc, cur ) => acc + cur) : 0 // 第一列的总高度
      // const heightTotal_2 = heightTotal_2.length ? Array.from(heightTotal_2).reduce(( acc, cur ) => acc + cur) : 0 // 第二列的总高
      // const heightTotal_3 = heightTotal_3.length ? Array.from(heightTotal_3).reduce(( acc, cur ) => acc + cur) : 0 // 第三列的总高度
      // 找到最小值
      if (!item) return;
      let minNumber = Math.min(heightTotal_1,heightTotal_2,heightTotal_3)
      switch (minNumber) {
        case heightTotal_1:
            heightTotal_1 = parseInt(heightTotal_1 + item.offsetHeight);
            this.cardList1.push(this.loadCardList[index])
          break
        case heightTotal_2:
            heightTotal_2 = parseInt(heightTotal_2 + item.offsetHeight);
          this.cardList2.push(this.loadCardList[index])
          break
        case heightTotal_3:
            heightTotal_3 = parseInt(heightTotal_3 + item.offsetHeight);
          this.cardList3.push(this.loadCardList[index])
          break
      }
    }
  },
  destroyed() {
    document.removeEventListener('scroll', this.scrollEvent)
  }
}
</script>
<style lang="scss" scoped>
.page-main{
    background: #ffffff;
    overflow: hidden;
    padding: 30px 30px 0;
    .card{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        .card-item{
          margin-bottom: 20px;
          text-align: left;
          width: 300px;
          border-radius: 16px;
          font-size: 16px;
          color: grey;
          .title {
            font-size: 18px;
            line-height: 30px;
          }
        }
    }
    .visible-div {
      background: transparent;
      position: fixed;
      top: 0;
      .card-item{
        opacity: 0;
        margin-bottom: 20px;
        text-align: left;
        width: 300px;
        border-radius: 16px;
        font-size: 16px;
        color: grey;
        .title {
          font-size: 18px;
          line-height: 30px;
        }
      }
    }
}
</style>