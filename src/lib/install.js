import store from '@/store';
const consolePlatform = require('./consolePlatform');
const domEvent =  require('./domEvent');
const httpRequest = require('./httpRequest');
const plugin = {
    install(vue, params) {
        store.commit('setOuterVue', vue);
        store.commit('setRouter', params.router);
        this.init(params);
    },
    init(params) {
        const {router, isDefaultRecord} = params;
        let {routePath} = params;
        routePath = routePath || '/vue-log';
        router.addRoutes([{
            path: routePath,
            name: routePath,
            component: () => import('../components/Log.vue'),
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

// if(typeof window !== 'undefined' && window.Vue){
    // plugin.install(window.Vue)
// }

export default plugin;
