import store from '@/store';
import { Vue } from 'vue-property-decorator';
import consolePlatform from '@/core/consolePlatform';
import domEvent from '@/core/domEvent';
import httpRequest from '@/core/httpRequest';
interface Params {
    router: any; // 路由
    routePath?: string;
    isDefaultRecord: false; // 是否开启默认记录
}

const plugin = {
    install(vue: any, params: Params) {
        store.commit('setOuterVue', Vue);
        store.commit('setRouter', params.router);
        this.init(params);
    },
    init(params: Params) {
        const {router, isDefaultRecord} = params;
        let {routePath} = params;
        routePath ??= '/vue-log';
        router.addRoutes([{
            path: routePath,
            name: routePath,
            component: () => import('@/components/Log.vue'),
        }]);
        // new Navigator(navigator.userAgent);

        if (isDefaultRecord) {
            this.start();
        }
    },
    start() { // 开始统计
        domEvent.init();
        consolePlatform.init();
        httpRequest.init();
    },
    stop() { // 停止统计

    },
    clear() { // 清空

    },
};

export default plugin;
