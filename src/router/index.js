import Vue from 'vue'
import Router from 'vue-router'
const Popup = () => import(/* webpackChunkName: "popup" */ '@/page/Popup')
const Main = () => import(/* webpackChunkName: "main" */ '@/page/Main')
const SyncInfo = () => import(/* webpackChunkName: "main" */ '@/page/main/SyncInfo')
const Options = () => import(/* webpackChunkName: "main" */ '@/page/main/Options')
const About = () => import(/* webpackChunkName: "main" */ '@/page/main/About')
const ImportExport = () => import(/* webpackChunkName: "main" */ '@/page/main/ImportExport')
const DetailList = () => import(/* webpackChunkName: "main" */ '@/page/main/DetailList')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/popup',
      component: Popup,
      name: 'popup',
    },
    {
      path: '/app',
      component: Main,
      children: [
        {
          path: 'options/sync',
          component: SyncInfo,
          name: 'syncInfo',
        },
        {
          path: 'options',
          component: Options,
          name: 'options',
        },
        {
          path: 'about',
          component: About,
          name: 'about',
        },
        {
          path: 'import-export',
          component: ImportExport,
          name: 'import-export',
        },
        {
          path: '*',
          component: DetailList,
          name: 'detailList',
        },
      ],
    },
  ]
})

if (PRODUCTION) {
 import(
   /* webpackChunkName: "tracker", webpackMode: "lazy" */
   '@/common/tracker'
 ).then(({tracker}) => {
   tracker()
   router.beforeEach((to, from, next) => {
     ga('set', 'page', to.name)
     ga('send', 'pageview')
     next()
   })
 })
}

export default router
