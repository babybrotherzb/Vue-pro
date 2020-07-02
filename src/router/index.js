import Vue from 'vue'
import Router from 'vue-router'
import echarts from '@/module/ShowEcharts'
import Login from '@/module/login/login'
import vuex from '@/module/vuex_demo/vuex'
// 主页
import home from '../components/base_m/Home'
import homelist from '@/module/home/index'
import statistics from '../module/home/statics/statistics.vue'
import owner from '../module/home/owner/owner.vue'
import pic from '../module/home/pic/pic.vue'

// 数据
import data from '@/module/data/data' // 设置
// import dataanalysis from '@/module/data/dataanalysis/DataAnalysis.vue' //数据分析
// import admaster from '@/module/data/dataanalysis/module/admaster.vue' //数据分析广告主
// import mediamaster from '@/module/data/dataanalysis/module/mediamaster.vue' //数据分析媒体主
import Monthly from '@/module/data/Monthly/index' // 月报
import pre_month from '@/module/data/module/per_month' // 业绩月报

// 设置
import set from '@/module/set/set' // 设置
import user_con from '@/module/set/module/user_con' // 用户管理
import organization from '@/module/set/module/organization' // 组织架构
import pre_set from '@/module/set/module/pre_set' // 权限配置
import operate_set from '@/module/set/module/operate_set' // 操作权限
import exit_branch from '@/module/set/module/exit_branch' // 编辑部门
// 财务
// import finance from '@/module/finance/finance'  //财务
// import customerback from '@/module/finance/module/customerback'  //客户回款
// import cancelback from '@/module/finance/cancelback/index'  //回款核销
// import cancelbackList from '@/module/finance/cancelback/list'  //回款核销列表
// import cancelbackDetail from '@/module/finance/cancelback/detail'  //回款核销详情
// import cancelbackDetailStay from '@/module/finance/cancelback/model/detail_stay'  //回款核销详情
// import cancelbackDetailRecord from '@/module/finance/cancelback/model/detail_record'  //回款记录详情
// import cancelbackDetailCancel from '@/module/finance/cancelback/model/detail_cancel'  //回款记录详情

let user = sessionStorage.getItem('user')
let routes = []
if (user) {
  routes = [{
      path: '/',
      component: home,
      redirect: '/home',
      children: [{
          path: '/home',
          component: homelist,
          redirect: '/home/statistics',
          children: [{
              path: '/home/statistics',
              component: statistics
            },
            {
              path: '/home/owner',
              component: owner
            },
            {
              path: '/home/pic',
              component: pic
            }
          ]
        },
        {
          path: '/echarts',
          component: echarts
        },
        {
          path: '/vuex',
          component: vuex
        },
        // 设置
        {
          path: '/set',
          component: set,
          redirect: '/set/user_con',
          children: [{
              path: 'user_con',
              component: user_con
            },
            {
              path: 'organization',
              component: organization
              // redirect:'/set/orgaization/org_list',
              // children:[
              //     {
              //         path:'org_list',
              //         component:org_list
              //     }
              // ]
            },
            {
              path: 'pre_set',
              component: pre_set,
              redirect: '/set/pre_set/operate_set',
              children: [{
                path: 'operate_set',
                component: operate_set
              }]
            },
            {
              path: 'exit_branch',
              component: exit_branch
            }
          ]
        },
        // 数据
        {
          path: '/data',
          component: data,
          redirect: '/data/monthly',
          children: [{
              path: 'monthly',
              component: Monthly,
              redirect: '/data/monthly/pre_month',
              children: [{
                path: 'pre_month',
                component: pre_month
              }]
            }
            // {
            //     path: 'dataanalysis',
            //     component: dataanalysis,
            //     redirect: '/data/dataanalysis/admaster',
            //     children: [{
            //             path: 'admaster',
            //             component: admaster
            //             },
            //             {
            //                 path: 'mediamaster',
            //                 component: mediamaster
            //             }
            //         ]
            // }
          ]
        }
        //核销
        //   {
        //     path:'/finance',
        //     component:finance,
        //     redirect:'/finance/customerback',
        //     children:[
        //         {
        //             path:'customerback',
        //             component:customerback
        //         },
        //         {
        //             path:'cancelback',
        //             component:cancelback,
        //             redirect: '/finance/cancelback/list',
        //             children: [{
        //                     path: 'list',
        //                     component: cancelbackList
        //                 },
        //                 {
        //                     path: 'detail',
        //                     component: cancelbackDetail,
        //                     redirect: '/finance/cancelback/detail/stay',
        //                     children: [{
        //                         path: 'stay',
        //                         component: cancelbackDetailStay
        //                     },
        //                     {
        //                         path: 'record',
        //                         component: cancelbackDetailRecord
        //                     },
        //                     {
        //                         path: 'cancel',
        //                         component: cancelbackDetailCancel
        //                     }
        //                 ]
        //                 }
        //             ]
        //         }
        //     ]
        // },
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
} else {
  routes = [{
      path: '/login',
      component: Login
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
}
Vue.use(Router)

export default new Router({
  routes: routes
})
