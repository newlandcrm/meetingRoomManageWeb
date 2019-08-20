import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home/Home'
import Center from '../pages/center/Center'
import Log from '../pages/log/Log'
import Sign from '../pages/sign/Sign'
import Manage from '../pages/manage/Manage'
import Search from '../pages/manage/components/Search'
import Reserve from '../pages/manage/components/Reserve'
import Already from '../pages/manage/components/Already'
import Floor11 from '../pages/manage/components/floor/floor11'
import Floor12 from '../pages/manage/components/floor/floor12'
import Floor13 from '../pages/manage/components/floor/floor13'

import Meetingroom from '../pages/manage/components/echarts/meetingroom'
import Order from '../pages/manage/components/echarts/Order'
Vue.use(Router)

export default new Router({
  mode:'history',
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },{
      path: '/center',
      name: 'Center',
      component: Center
    },{
      path: '/log',
      name: 'Log',
      component: Log
    },{
      path: '/sign',
      name: 'Sign',
      component: Sign
    }, {
      path: '/manage',
      name: 'Manage',
      component: Manage,
      children: [
        {
          path: '/search',
          name: 'Search',
          component: Search,
          meta: 'search',
        },
        {path: '/floor11', name: 'Floor11', component: Floor11,meta:{breadNumber:1}},
        {path: '/floor12', name: 'Floor12', component: Floor12,meta:{breadNumber:2}},
        {path: '/floor13', name: 'Floor13', component: Floor13,meta:{breadNumber:3}},

        {path: '/already', name: 'Already', component: Already},

        {path: '/reserve', name: 'Reserve', component: Reserve},
        {path: '/meetingroom', name: 'Meetingroom', component: Meetingroom,meta:{breadNumber:1}},
        {path: '/order', name: 'Order', component: Order,meta:{breadNumber:2}},
      ]
    }
    ]
})
