import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/newIndex/index'
import detail from '@/components/detail/detail'
import myaddress from '@/components/adress/myaddress'
import snapuplist from '@/components/snapUp/snapuplist'
import luckycenter from '@/components/luckyDraw/luckycenter'
import luckylist from  '@/components/luckyDraw/luckylist'
import winning from '@/components/luckyDraw/winning'
import refundlist from '@/components/refund/refundlist'
import refundindex from '@/components/refund/refundindex'
import freight from '@/components/refund/freight'
import myorder from '@/components/refund/myorder'
import exchange from '@/components/exchange/exchange'
import cash from '@/components/cash/cash'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: detail
    },
    {
      path: '/add/myaddress',
      name: 'myaddress',
      component: myaddress
    },
    {
      path: '/snapuplist',
      name: 'snapuplist',
      component: snapuplist
    },
    {
      path: '/luckycenter',
      name: 'luckycenter',
      component: luckycenter
    },
    {
      path: '/luckylist',
      name: 'luckylist',
      component: luckylist
    },
    {
      path: '/winning',
      name: 'winning',
      component: winning
    },
    {
      path: '/refundlist',
      name: 'refundlist',
      component: refundlist
    },
    {
      path: '/refundindex/:id',
      name: 'refundindex',
      component: refundindex
    },
    {
      path: '/freight/:id',
      name: 'freight',
      component: freight
    },
    {
      path: '/myorder',
      name: 'myorder',
      component: myorder
    },
    {
      path: '/exchange',
      name: 'exchange',
      component: exchange
    },
    {
      path: '/cash',
      name: 'cash',
      component: cash
    }
  ]
})
