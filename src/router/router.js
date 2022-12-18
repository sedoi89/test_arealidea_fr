import Main from "@/components/pages/Main";
import {createRouter, createWebHistory} from "vue-router";
import ProjectPage from '@/components/pages/ProjectPage'
import RequestPage from "@/components/pages/RequestPage";



const routes = [
    {
        path: '/',
        component: Main
    } , {
        path: '/:id',
        component: ProjectPage
    }, {
    path: '/:id/:requestId',
        component: RequestPage
    }
]

const router = createRouter({
      routes, history: createWebHistory(),
})

export default router
