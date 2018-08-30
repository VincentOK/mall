import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => require(['@/components/newIndex/index'], resolve), // 使用懒加载
      meta: {
        keepAlive: true // true 表示需要使用缓存
      }
    },
    {
      path: '/detail/:id/:type',
      name: 'detail',
      component: resolve => require(['@/components/detail/detail'], resolve), // 使用懒加载
      meta: {
        keepAlive: true // true 表示需要使用缓存
      }
    },
    {
      path: '/add/myaddress',
      name: 'myaddress',
      component: resolve => require(['@/components/adress/myaddress'], resolve), // 使用懒加载
      meta: {
        keepAlive: true // true 表示需要使用缓存
      }
    },
    {
      path: '/snapuplist',
      name: 'snapuplist',
      component: resolve => require(['@/components/snapUp/snapuplist'], resolve), // 使用懒加载
      meta: {
        keepAlive: true // true 表示需要使用缓存
      }
    },
    {
      path: '/luckycenter',
      name: 'luckycenter',
      component: resolve => require(['@/components/luckyDraw/luckycenter'], resolve), // 使用懒加载
      meta: {
        keepAlive: true // true 表示需要使用缓存
      }
    },
    {
      path: '/luckylist',
      name: 'luckylist',
      component: resolve => require(['@/components/luckyDraw/luckylist'], resolve), // 使用懒加载
      meta: {
        keepAlive: true // true 表示需要使用缓存
      }
    },
    {
      path: '/winning',
      name: 'winning',
      component: resolve => require(['@/components/luckyDraw/winning'], resolve), // 使用懒加载
      meta: {
        keepAlive: true // true 表示需要使用缓存
      }
    },
    {
      path: '/refundlist',
      name: 'refundlist',
      component: resolve => require(['@/components/refund/refundlist'], resolve), // 使用懒加载
      meta: {
        keepAlive: true // true 表示需要使用缓存
      }
    },
    {
      path: '/refundindex/:commodityId/:orderNumber',
      name: 'refundindex',
      component: resolve => require(['@/components/refund/refundindex'], resolve), // 使用懒加载
      meta: {
        keepAlive: true // true 表示需要使用缓存
      }
    },
    {
      path: '/freight/:id',
      name: 'freight',
      component: resolve => require(['@/components/refund/freight'], resolve), // 使用懒加载
      meta: {
        keepAlive: true // true 表示需要使用缓存
      }
    },
    {
      path: '/myorder',
      name: 'myorder',
      component: resolve => require(['@/components/refund/myorder'], resolve), // 使用懒加载
      meta: {
        keepAlive: true // true 表示需要使用缓存
      }
    },
    {
      path: '/exchange',
      name: 'exchange',
      component: resolve => require(['@/components/exchange/exchange'], resolve), // 使用懒加载
      meta: {
        keepAlive: true // true 表示需要使用缓存
      }
    },
    {
      path: '/cash',
      name: 'cash',
      component: resolve => require(['@/components/cash/cash'], resolve), // 使用懒加载
      meta: {
        keepAlive: true // true 表示需要使用缓存
      }
    }
  ]
})
