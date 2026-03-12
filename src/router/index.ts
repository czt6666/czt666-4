import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import ComingSoonPage from "@/views/ComingSoonPage.vue";
import FrontendWorksPage from "@/views/FrontendWorksPage.vue";
import TravelJourneyPage from "@/views/TravelJourneyPage.vue";
import PhotoWallPage from "@/views/PhotoWallPage.vue";

const pages = import.meta.glob("../views/test/**/*.vue");

// 生成路由数组
function generateRoutes() {
    const routes: RouteRecordRaw[] = [];

    Object.keys(pages).forEach((path) => {
        const routePath = path
            .replace("../views", "")
            .replace(/\.vue$/, "")
            .replace(/\/index$/, "/")
            .toLocaleLowerCase();

        routes.push({
            path: routePath === "" ? "/" : routePath, // 根路径
            component: pages[path] as () => Promise<unknown>, // 懒加载组件
            name: routePath.split("/").filter(Boolean).join("-") || "home", // 自动生成name
        });
    });

    return routes;
}

const routes = [
    {
        path: "/",
        name: "HomePage",
        component: HomePage,
    },
    {
        path: "/works",
        name: "FrontendWorksPage",
        component: FrontendWorksPage,
        meta: { title: "前端作品" },
    },
    {
        path: "/trip",
        name: "TravelJourneyPage",
        component: TravelJourneyPage,
        meta: { title: "旅游经历" },
    },
    {
        path: "/trip/:key",
        name: "TravelJourneyDetailPage",
        component: ComingSoonPage,
        meta: { title: "旅游详情" },
    },
    {
        path: "/photos",
        name: "PhotoWallPage",
        component: PhotoWallPage,
        meta: { title: "照片墙" },
    },
    {
        path: "/test",
        children: generateRoutes(),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
});

export default router;
