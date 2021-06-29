const store = require('../store/index2')
const consolePlatform = require('./consolePlatform');
const domEvent =  require('./domEvent');
const httpRequest = require('./httpRequest');
const plugin = {
    install(vue, params) {
        console.log(params)
        store.outerVue = vue;
        store.router = params.router;
        this.init(vue,params);
    },
    init(vue,params) {
        const {router, isDefaultRecord} = params;
        if(router){
            let {routePath} = params;
            routePath = routePath || '/vue-intercept-log';
            //  routePath ??= '/vue-log';
            router.addRoutes([{
                path: routePath,
                name: routePath,
                component: () => import('../components/Log.vue'),
            }]);
        }else{
            const logComponent = require('../components/Log.vue')
            console.log(logComponent)
            vue.component('vue-intercept-log', logComponent.default)
        }
        
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

module.exports =  plugin;
