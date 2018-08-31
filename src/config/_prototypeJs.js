export default (Vue) => {
  Vue.prototype._protypeJs = {
    /**
     * 字符长度最长20
     */
    maxSlice20:(item) =>{
      if(Boolean(item)){
        return item.length > 20 ? item.slice(0, 20) + "..." : item;
      }
    },
    /**
     * 字符长度最长13
     */
    maxSlice13:(item) =>{
      if(Boolean(item)){
        return item.length > 13 ? item.slice(0, 13) + "..." : item;
      }
    },
    /**
     * 字符长度最长10
     */
    maxSlice10:(item) =>{
      if(Boolean(item)){
        return item.length > 10 ? item.slice(0, 10) + "..." : item;
      }
    },
    /**
     * 右滑返回
     */
    touchRight: () => { window.history.back() },
    /**
     * 计算vue-scroller高度
     */
    getScrollerHeight:(number) =>{
      let height = document.documentElement.clientHeight;
      let scroller_a = height - parseInt(number)
      return scroller_a.toString();
    },
    /**
     * 弹框出现固定body高度
     */
    addBodyHeight: () => {
      console.log(document.documentElement.clientWidth)
      console.log(document.documentElement.clientHeight)
      let height = document.documentElement.clientHeight
      let width = document.documentElement.clientWidth
      document.body.style.height = height+'px';
      document.body.style.width = '100%';
      document.body.style.position = 'fixed';
      document.body.style.zIndex = '99';
      // document.body.style.top = '0';
      document.body.style.overflow = 'hidden';

      },
    /**
     * 弹框取消body高度自适应
     */
    removeBodyHeight:() => {
      console.log(document.documentElement.clientWidth)
      console.log(document.documentElement.clientHeight)
      document.body.style.height = '';
      document.body.style.width = '';
      document.body.style.position = '';
      document.body.style.zIndex = '0';
      // document.body.style.top = '0';
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.overflow = '';},
    /**
     * 获取本地缓存用户uid
     */
    getUserId:() =>{
      return localStorage.getItem('user');
    },
    /**
     * 关闭webview
     */
    JScloseWebView:() =>{
      console.log("环境："+process.env.NODE_ENV);
      if(process.env.NODE_ENV == 'development'){
        JS.closeWebView();
      }
    },
    /**
     * 确认支付
     */
    appSurePayMoney:(obj) =>{
      console.log("环境："+process.env.NODE_ENV)
      if(process.env.NODE_ENV == 'development'){
       let aa = JS.sendPayMsg(obj);
       alert("返回支付状态："+aa)
      }
    }
  }
}
