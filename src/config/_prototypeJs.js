export default (Vue) => {
  Vue.prototype._protypeJs = {
    /**
     * 字符长度最长20
     */
    maxSlice20:(item) =>{
      return item.length > 20 ? item.slice(0, 20) + "..." : item;
    },
    /**
     * 字符长度最长10
     */
    maxSlice13:(item) =>{
      return item.length > 13 ? item.slice(0, 13) + "..." : item;
    },
    /**
     * 右滑返回
     */
    touchRight: () => { window.history.back() },
    /**
     * 弹框出现固定body高度
     */
    addBodyHeight: () => {
      console.log(document.documentElement.clientWidth)
      console.log(document.documentElement.clientHeight)
      let height = document.documentElement.clientHeight
      document.body.style.height = height+'px';
      // document.body.style.position = 'fixed';
      // document.body.style.top = '0';
      document.body.style.overflow = 'hidden';

      },
    /**
     * 弹框取消body高度自适应
     */
    removeBodyHeight:() => {document.body.style.height = '';document.body.style.overflowY = '';},
    /**
     * 弹框消失事件
     */
    removeDialog:() =>{
      document.getElementById("loading").style.display = 'none'
    },
    /**
     * 弹框显示事件
     */
    addDialog:() =>{
      document.getElementById("loading").style.display = 'block'
    }

  }
}
