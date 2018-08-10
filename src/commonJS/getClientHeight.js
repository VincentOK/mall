export default(Vue) => {
  Vue.directive('clientHeight', {
    bind: function (el) {
      console.log(document.documentElement.clientWidth)
      console.log(document.documentElement.clientHeight)
      let height = document.documentElement.clientHeight
      el.style.height = height +'px';
      el.style.overflow = 'scroll';
      el.style.position = 'sticky';
      el.style.top = '0';
      // el.style.bottom = '0';
    }
  })
}
