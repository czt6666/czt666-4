import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import ComingSoonPage from '@/views/ComingSoonPage.vue'

const pages = import.meta.glob('../views/test/**/*.vue')

// 生成路由数组
function generateRoutes() {
  const routes: RouteRecordRaw[] = []

  Object.keys(pages).forEach((path) => {
    const routePath = path
      .replace('../views', '')
      .replace(/\.vue$/, '')
      .replace(/\/index$/, '/')
      .toLocaleLowerCase()

    routes.push({
      path: routePath === '' ? '/' : routePath, // 根路径
      component: pages[path] as () => Promise<unknown>, // 懒加载组件
      name: routePath.split('/').filter(Boolean).join('-') || 'home', // 自动生成name
    })
  })

  return routes
}

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/portfolio',
    name: 'PortfolioPage',
    component: ComingSoonPage,
    meta: { title: '作品集' },
  },
  {
    path: '/frontend-works',
    name: 'FrontendWorksPage',
    component: ComingSoonPage,
    meta: { title: '前端作品' },
  },
  {
    path: '/travel-journey',
    name: 'TravelJourneyPage',
    component: ComingSoonPage,
    meta: { title: '旅游经历' },
  },
  {
    path: '/photo-wall',
    name: 'PhotoWallPage',
    component: ComingSoonPage,
    meta: { title: '照片墙' },
  },
  {
    path: '/test',
    children: generateRoutes(),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
