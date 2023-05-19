import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/home/Home'),

    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '../views/login/Login'),

    },
    {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "register" */ '../views/register/Register'),

    },
    {
        path: '/article',
        name: 'CreateArticle',
        component: () => import(/* webpackChunkName: "createArticle" */ '../views/createArticle/CreateArticle'),

    },
    {
        path: '/article-list',
        name: 'HandleArticle',
        component: () => import(/* webpackChunkName: "handleArticle" */ '../views/handleArticle/HandleArticle'),

    },
    {
        path: '/aboutme',
        name: 'AboutMe',
        component: () => import(/* webpackChunkName: "aboutMe" */ '../views/aboutMe/AboutMe'),

    }, {
        path: '/comments',
        name: 'LeaveComments',
        component: () => import(/* webpackChunkName: "leaveComments" */ '../views/leaveComments/LeaveComments'),

    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router