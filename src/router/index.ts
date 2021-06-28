import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'hash',
    routes: [{
        path: '/',
        component: () => import('@/components/Log.vue'),
    }],
});
export default router;
