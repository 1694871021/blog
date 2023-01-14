<!-- 网站导航 -->
<template>
  <div>
    <div class="banner-video">
      <!--视频来自阿里云首页，有需要请自行更换-->
      <!--video autoplay loop muted>
          <source src="https://cdn.jsdelivr.net/gh/5iux/uploads/pic/3840-banner.mp4" type="video/mp4">
      </video-->
      <!--注释掉图片可换成视频版本-->
      <img src="https://cn.bing.com//th?id=OHR.HuntsMesa_JA-JP3140979616_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp" alt="">
      <div class="bottom-cover" style="background-image: linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(244 248 251 / 0.6) 50%, rgb(244 248 251) 100%);"></div>
    </div>
    <div class="container-site" style="margin: 100px auto 0; position: relative; z-index: 1;">
      <!--搜索开始-->
      <div id="search" class="s-search">
          <form action="https://www.baidu.com/s?wd=" method="get" target="_blank" id="super-search-fm">
              <input type="text" id="search-text" placeholder="百度一下" style="outline:0" autocomplete="off">
              <button class="submit" type="submit"><svg style="width: 20px; height: 20px; margin:7px 0; color: #29f;" class="icon" aria-hidden="true">
                      <use xlink:href="#icon-sousuo"></use>
                  </svg>
              </button>
              <ul id="word" style="display: none;"></ul>
          </form>
          <div class="set-check hidden-xs">
              <input type="checkbox" id="set-search-blank" class="bubble-3" autocomplete="off">
          </div>
      </div>
      <!--搜索结束-->
      <el-row class="mylist">
        <li class="title"><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-remen"></use>
            </svg> 热门常用</li>
        <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://airzyw.com/" target="_blank"><svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-tengxunshipin"></use>
                </svg><span>AIR源码站</span></a></li>
        <li :xs="6" :sm="6" :md="6" :lg="3" :xl="2"><a rel="nofollow" href="https://www.youku.com/" target="_blank"><svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youku"></use>
                </svg><span>优酷</span></a></li>
        <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://www.iqiyi.com/" target="_blank"><svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-aiqiyi"></use>
                </svg><span>爱奇艺</span></a></li>
        <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://www.taobao.com" target="_blank"><svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-taobao"></use>
                </svg><span>淘宝网</span></a></li>
        <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://www.pinterest.com/" target="_blank"><svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-pinterest"></use>
                </svg><span>Pinterest</span></a></li>
        <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://huaban.com/" target="_blank"><svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-huaban"></use>
                </svg><span>花瓣</span></a></li>
        <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://www.weibo.com" target="_blank"><svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-weibo"></use>
                </svg><span>微博</span></a></li>
        <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://www.nfmovies.com/" target="_blank"><svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-netflix"></use>
                </svg><span>奈非影视</span></a></li>
      </el-row>
      <el-row class="mylist">
          <li class="title"><svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-shipin"></use>
              </svg> 视频媒体</li>
          <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://tv.cctv.com/live/index.shtml" target="_blank"><svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-cctv"></use>
                  </svg><span>CCTV直播</span></a></li>
          <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://www.youtube.com/" target="_blank"><svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-youtube"></use>
                  </svg><span>Youtube</span></a></li>
          <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="http://www.acfun.cn/index.html" target="_blank"><svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-acfun"></use>
                  </svg><span>ACFUN</span></a></li>
          <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://www.bilibili.com/" target="_blank"><svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-bili"></use>
                  </svg><span>哔哩哔哩</span></a></li>
          <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://k1080.net/" target="_blank"><svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-yingshi"></use>
                  </svg><span>K1080</span></a></li>
          <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://yunbtv.com/" target="_blank"><svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-yunbo"></use>
                  </svg><span>云播TV</span></a></li>
          <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://www.lyys8.com/" target="_blank"><svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-yingshi06"></use>
                  </svg><span>凌云影视</span></a></li>
        </el-row>
        <el-row class="mylist">
            <li class="title"><svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gouwuche"></use>
                </svg>购物</li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://temai.m.taobao.com/index.htm?pid=mm_30753570_11166349_39936732&union_lens=lensId%3APUB%401609381375%400b092c84_0de3_176b69aecf8_03eb%4001" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-temai"></use>
                    </svg><span>淘宝特卖</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2">
                <a rel="nofollow" href="https://mobile.yangkeduo.com/duo_cms_mall.html?pid=8742514_71211367&cpsSign=CM_190605_8742514_71211367_92fdd9f7fb637fec599bf556f263ed1f&duoduo_type=2&launch_wx=1" title="拼多多手机端专属商城，超低价商品火热抢购中，更有超多大额优惠券持续发放，一键立抢>>" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-99"></use>
                    </svg><span>拼多多</span></a>
            </li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://www.jd.com" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-jingdong"></use>
                    </svg><span>京东</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://www.suning.com/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-suning"></use>
                    </svg><span>苏宁易购</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="http://you.163.com/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-yanxuan"></use>
                    </svg><span>网易严选</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://www.amazon.com/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-amazon"></use>
                    </svg><span>亚马逊</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="http://www.dangdang.com/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-dangdang"></use>
                    </svg><span>当当</span></a></li>
        </el-row>
        <el-row class="mylist">
            <li class="title"><svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sheji"></use>
                </svg>设计视觉</li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://hao.5iux.cn/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-daohang1"></use>
                    </svg><span>设计导航</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://www.behance.net/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-behance"></use>
                    </svg><span>Behance</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://www.dribbble.com/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-dribbble"></use>
                    </svg><span>Dribbble</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://www.zcool.com.cn/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-zhanku"></use>
                    </svg><span>站酷</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://www.iconfont.cn/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-iconfont"></use>
                    </svg><span>阿里图标</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://www.iconfinder.com/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-eye"></use>
                    </svg><span>IconFinder</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://uiiiuiii.com/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-jiaocheng"></use>
                    </svg><span>优设教程</span></a></li>
        </el-row>
        <el-row class="mylist">
            <li class="title"><svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-msg"></use>
                </svg>社交资讯</li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://www.zhihu.com/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-zhihu"></use>
                    </svg><span>知乎</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://www.douban.com/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-douban"></use>
                    </svg><span>豆瓣</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://www.jianshu.com/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-jianshu"></use>
                    </svg><span>简书</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://www.v2ex.com/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-v2ex"></use>
                    </svg><span>V2EX</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://www.instagram.com" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-instagram"></use>
                    </svg><span>Instagram</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://www.twitter.com" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-twitter"></use>
                    </svg><span>Twitter</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://www.facebook.com" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-facebook"></use>
                    </svg><span>Facebook</span></a></li>
        </el-row>
        <el-row class="mylist">
            <li class="title"><svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youxiang"></use>
                </svg>邮箱</li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://mail.google.com/mail/u/0/#inbox" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-gmail"></use>
                    </svg><span>Gmail</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://outlook.live.com/mail/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-windows"></use>
                    </svg><span>Hotmail</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://mail.163.com/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-wangyi"></use>
                    </svg><span>网易邮箱</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://mail.sina.com.cn/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xinlangwang"></use>
                    </svg><span>新浪邮箱</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://mail.qq.com/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-QQ"></use>
                    </svg><span>QQ邮箱</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://qiye.aliyun.com/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-yunyouxiang"></use>
                    </svg><span>阿里邮箱</span></a></li>
        </el-row>
        <el-row class="mylist">
            <li class="title"><svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-ai-tool"></use>
                </svg>工具</li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://tools.miku.ac/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-ai-tool"></use>
                    </svg><span>Miku工具</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="/ip/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-wangluo"></use>
                    </svg><span>IP查询</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://translate.google.cn/?hl=zh-CN" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-fanyi"></use>
                    </svg><span>谷歌翻译</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="http://www.slimego.cn/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shilaimu"></use>
                    </svg><span>史莱姆</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://feedly.com" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-feedly"></use>
                    </svg><span>Feedly</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="http://www.mdeditor.com/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-md"></use>
                    </svg><span>MD编辑器</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="http://cubic-bezier.com" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-quxian"></use>
                    </svg><span>贝赛尔曲线</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://5iux.cn/base64/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-base64"></use>
                    </svg><span>Base64</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://javascriptobfuscator.com/Javascript-Obfuscator.aspx" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-jshunxiao"></use>
                    </svg><span>JS混淆器</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://ping.pe" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-wangluo1"></use>
                    </svg><span>Ping.pe</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://ping.chinaz.com/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-pingup"></use>
                    </svg><span>站长Ping</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://apkdl.in/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-anzhuo"></use>
                    </svg><span>APK下载</span></a></li>
        </el-row>
        <el-row class="mylist">
            <li class="title"><svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-kongzhitai"></use>
                </svg>开发</li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="http://www.w3school.com.cn/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-h5"></use>
                    </svg><span>W3school</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://github.com/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-github"></use>
                    </svg><span>Github</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://codepen.io/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-codepen"></use>
                    </svg><span>Codepen</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://www.52pojie.cn/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-theater-masks"></use>
                    </svg><span>吾爱破解</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://segmentfault.com/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-msg"></use>
                    </svg><span>SF思否</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://cdnjs.com/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-cdnjs"></use>
                    </svg><span>CdnJs</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://fontawesome.com/icons?d=gallery&m=free" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-font-awesome"></use>
                    </svg><span>Font A.</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://msdn.itellyou.cn/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-windows"></use>
                    </svg><span>MSDN下载</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://dash.cloudflare.com/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-cloudflare"></use>
                    </svg><span>C. flare</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://www.swiper.com.cn/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-S"></use>
                    </svg><span>Swiper</span></a></li>
        </el-row>
        <el-row class="mylist">
            <li class="title"><svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sousuo"></use>
                </svg>搜索引擎</li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://www.google.com/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-google"></use>
                    </svg><span>Google</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https:/m.baidu.com/?pu=sz%401321_480&wpo=btmfast" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-icon_baidulogo"></use>
                    </svg><span>百度</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://duckduckgo.com/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-duck"></use>
                    </svg><span>DuckGo</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://www.bing.com/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-bing"></use>
                    </svg><span>Bing</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://www.sogou.com/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-sougou"></use>
                    </svg><span>搜狗</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://www.naver.com/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-icon-test"></use>
                    </svg><span>NAVER</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://mijisou.com/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-miji"></use>
                    </svg><span>秘迹</span></a></li>
            <li :xs="6" :sm="6" :md="4" :lg="3" :xl="2"><a rel="nofollow" href="https://www.dogedoge.com/" target="_blank"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-gougou"></use>
                    </svg><span>多吉</span></a></li>
        </el-row>
    </div>
  </div>  
</template>
<script>
import $ from '../static/js/jquery-3.6.3.min.js';
export default {
  data() {
    return {

    }
  },
  mounted() {
    //当键盘键被松开时发送Ajax获取数据
    $('#search-text').keyup(function() {
        var keywords = $(this).val();
        if (keywords == '') { $('#word').hide(); return };
        $.ajax({
            url: 'https://suggestion.baidu.com/su?wd=' + keywords,
            dataType: 'jsonp',
            jsonp: 'cb', //回调函数的参数名(键值)key
            // jsonpCallback: 'fun', //回调函数名(值) value
            beforeSend: function() {
                // $('#word').append('<li>正在加载。。。</li>');
            },
            success: function(data) {
                $('#word').empty().show();
                if (data.s == '') {
                    //$('#word').append('<div class="error">Not find  "' + keywords + '"</div>');
                    $('#word').empty();
                    $('#word').hide();
                }
                $.each(data.s, function() {
                    $('#word').append('<li>' + this + '</li>');
                })
            },
            error: function() {
                $('#word').empty().show();
                //$('#word').append('<div class="click_work">Fail "' + keywords + '"</div>');
                $('#word').hide();
            }
        })
    })
    //点击搜索数据复制给搜索框
    $(document).on('click', '#word li', function() {
        var word = $(this).text();
        $('#search-text').val(word);
        $('#word').empty();
        $('#word').hide();
        //$("form").submit();
         $('.submit').trigger('click');//触发搜索事件
    })
    $(document).on('click', '.container,.banner-video,nav', function() {
        $('#word').empty();
        $('#word').hide();
    })
    this.$parent.onSend(false);
  },
  methods: {
    
  },
  beforeDestroy() {
    this.$parent.onSend(true);
  }
}
</script>
<style>
/*
作者:D.Young
主页：https://blog.5iux.cn/
github：https://github.com/5iux/5iux.github.io
日期：2020-09-24
版权所有，请勿删除
*/
body {
    font-size: 14px;
    background: #f4f8fb;
    overflow-x: hidden;
}

svg.icon {
    width: 14px;
    height: 14px;
    margin: 0 5px 0 8px;
    vertical-align: baseline;
    fill: currentColor;
    overflow: hidden;
}

/*menu*/
.navbar-light .navbar-nav .nav-link {
    color: #fff;
}

.navbar-light .navbar-nav .active .nav-link {
    color: #fff;
}

.navbar-light .navbar-nav .nav-link:hover {
    color: #fff;
}

/* --- search --- */
#search {
    width: 100%;
    margin: 0;
    padding: 0 0 10px;
    position: relative;
    z-index: 2000;
    border-radius: 5px;
}

#search form {
    position: relative
}

#search-text {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-indent: 10px;
    font-size: 16px;
    border-radius: 5px;
    background-color: #fff;
    border: none;
    box-shadow: 0 0.5rem 0.625rem #d4d4d44d;
    transition: 0.3s all linear;
}

#search-text:focus {
    background: #fff;
    box-shadow: 0 0px 24px 0 rgba(50, 50, 50, 0.08);
    border-color: #fff;
}

#search button {
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    border: 0;
    border-radius: 20px;
    width: 60px;
    height: 36px;
    margin: 7px 0 0;
    line-height: 36px;
    border-radius: 3px;
    outline: none;
}

#search button:hover {
    cursor: pointer
}

#search button i {
    color: #ddd;
    font-size: 18px
}

.search-group {
    display: none;
    padding-left: 75px
}

.s-current .search-type {
    padding-left: 0;
    display: block
}

.s-current {
    display: block
}

#search-list {
    position: relative
}

.s-type {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 13;
    width: 75px
}

.s-type:hover {
    height: auto
}

.s-type>span {
    display: block;
    height: 31px;
    width: 75px
}

.s-type-list {
    display: none;
    position: absolute;
    top: 31px;
    padding: 9pt 0;
    width: 70px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 9px 20px rgba(0, 0, 0, .16)
}

.s-type-list:before {
    position: absolute;
    top: -1pc;
    left: 20px;
    content: '';
    display: block;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom-color: #fff
}

.s-type-list label {
    display: block;
    font-size: 15px;
    text-align: center;
    font-weight: normal;
    margin-bottom: 0;
    padding: 2px 0;
    cursor: pointer;
    transition: .3s
}

.s-type-list label:hover {
    background: rgba(136, 136, 136, .1)
}

.s-type-list .tile-lg {
    color: #fff;
    width: 3pc;
    height: 3pc;
    font-size: 1.25rem;
    line-height: 3rem;
    border-radius: .3rem;
    display: block;
    margin: auto
}

.s-type:hover .s-type-list {
    display: block
}

.type-text {
    position: absolute;
    left: 0;
    width: 75px;
    padding-left: 9pt;
    font-size: 1pc;
    line-height: 31px
}

.search-type {
    white-space: nowrap;
    margin: 0
}

.search-type label {
    margin: 0
}

.search-type li {
    display: inline-block;
    background: rgb(255 255 255 / 0.4);
    border-radius: 3px 3px 0 0;
}

.search-type li label {
    display: inline-block;
    padding: 0 11px;
    font-size: 14px;
    line-height: 31px;
    border-radius: 3px 3px 0 0;
    cursor: pointer
}

.search-type input:checked+label,
.search-type input:hover+label {
    background-color: #fff;
}

#search-text::-webkit-input-placeholder {
    color: #bbb;
}

#word {
    position: absolute;
    list-style: none;
    top: 55px;
    left: 0px;
    width: 100%;
    background: rgba(259, 259, 259, 0.9);
    border-radius: 5px;
    padding: 15px 10px;
    box-shadow: 0 0 10px #aaa;
    box-sizing: border-box;
    z-index: 20000;
}

#word li {
    height: 35px;
    padding: 0 5px;
    text-indent: 30px;
    background: url(../static/images/sou.svg) no-repeat 5px;
    background-size: 20px;
    line-height: 35px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
}

#word li:hover {
    background-color: #ddd;
}

.set-check {
    margin-top: 3px;
    font-size: 9pt
}

.set-check label {
    margin-left: 3px
}

.set-check input,
.set-check label {
    opacity: 0;
    transition: all .3s ease
}

.search-type li {
    list-style: none;
    display: inline-block
}

.mylist {
    list-style: none;
    padding: 10px 20px;
    position: relative;
    z-index: 1000;
    margin: 20px 0;
    border-radius: 15px;
    background: #fff;
    box-shadow: 0 0.5rem 0.625rem #d4d4d44d;
    display: flex;
    flex-wrap: wrap;
}

.mylist li:nth-child(n+2) {
    margin: 5px 0 5px;
}

.mylist li:nth-child(n+2) svg {
    width: 30px;
    height: 30px;
    padding: 5px;
    border-radius: 5px;
}

.mylist li:nth-child(n+2) span {
    font-size: 12px;
}

.mylist li:nth-child(n+2) {
    width: 100px;
    transition: 0.3s all linear;
    font-size: 14px;
    overflow: hidden;
    padding: 10px 0;
    border-radius: 10px;
}

.mylist li:nth-child(n+2) svg {
    width: 45px;
    height: 45px;
    padding: 8px;
    margin: 0 auto;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 10px;
    display: block;
    box-sizing: border-box;
}

.mylist li:nth-child(n+2):hover {
    background: #eee;
}

.mylist li:nth-child(n+2) span {
    width: 100%;
    display: block;
    height: 26px;
    line-height: 26px;
    text-align: center;
    font-size: 13px;
}

.mylist li a {
    color: #555;
    display: block;
}

.mylist li.title {
    width: 100%;
    min-width: auto;
    margin: 0;
    height: 35px;
    font-size: 16px;
    line-height: 33px;
    padding: 0 20px 0 10px;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
}

.banner-video {
    position: absolute;
    width: 100%;
    overflow: hidden;
    left: 0;
    top: 0;
    max-height: 750px;
}

.banner-video video {
    width: 2048px;
    float: left;
}

.banner-video img {
    width: 1920px;
    float: left;
}

.bottom-cover {
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0px;
    z-index: 1;
}

@media screen and (min-width:1200px) {
    .mylist li:nth-child(n+2) {
        min-width: 12.5%;
    }
}

@media screen and (min-width:992px) and (max-width:1200px) {
    .mylist li:nth-child(n+2) {
        min-width: 16.6%;
    }
}

@media screen and (max-width: 992px) {
    .mylist li:nth-child(n+2) {
        min-width: 25%;
    }
    #he-plugin-simple {
        display: none !important;
    }

    .banner-video video {
        width: 1200px;
    }

    .banner-video img {
        width: 1200px;
    }

    div#navbarsExample05 {
        background: rgba(0, 0, 0, 0.8);
        padding: 10px 30px;
        border-radius: 20px;
    }
}

@media screen and (max-width:767px) {
    .banner-video video {
        width: 960px;
    }

    .banner-video img {
        width: 960px;
    }

    .s-type-list label {
        padding: 5px 0
    }

    .search-type {
        overflow: hidden
    }

    .search-list {
        height: 30px;
        overflow-y: hidden;
        overflow-x: scroll;
        white-space: nowrap
    }
}

@media screen and (max-width:560px) {

}

@media (min-width: 576px) {
  .container-site, .container-sm {
      max-width: 540px;
  }
}

@media (min-width: 768px) {
  .container-site, .container-md, .container-sm {
      max-width: 720px;
  }
}

@media (min-width: 992px) {
  .container-site, .container-lg, .container-md, .container-sm {
      max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .container-site, .container-lg, .container-md, .container-sm, .container-xl {
      max-width: 1140px;
  }
}

</style>