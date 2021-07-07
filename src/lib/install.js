const store = require('../store/index2')
const consolePlatform = require('./consolePlatform');
const domEvent =  require('./domEvent');
const httpRequest = require('./httpRequest');
const Navigator = require('./navigator')
const plugin = {
    install(vue, params) {
        store.outerVue = vue;
        vue.prototype.$interceptLog = {
            start: this.start,
            stop: this.stop,
            clear: this.clear,
            download: this.download
        }
        store.router = params.router;
        this.init(vue,params);
    },
    init(vue,params) {
        const {router, isDefaultRecord} = params;
        if(router){
            
            let {routePath} = params;
            routePath = routePath || '/vue-intercept-log';
            //  routePath ??= '/vue-log';
            if(!window.opener){
                const {href} = router.resolve(routePath)
                window.open(href)
                return
            }
            router.addRoutes([{
                path: routePath,
                name: routePath,
                component: () => import('../components/Log.vue'),
            }]);
            store.outWindow = window.opener
        }else{
            const logComponent = require('../components/Log.vue')
            vue.component('vue-intercept-log', logComponent.default)
            store.outWindow = window
        }
       
        store.navigatorInfo = new Navigator(navigator.userAgent);

        if (isDefaultRecord) {
            this.start();
        }
    },
    start() { // 开始统计
        consolePlatform.init();
        domEvent.init();
        httpRequest.init();
    },
    stop() { // 停止统计
        consolePlatform.destory();
        domEvent.destory();
        httpRequest.destory();
    },
    clear() { // 清空
        store.logs.splice(0)
    },
    download(el) { // 下载
        const blob = new Blob([el.innerText], {type: 'text/plain'})
        const aLink = document.createElement('a')
        aLink.href = URL.createObjectURL(blob)
        aLink.setAttribute('download','日志.txt')
        aLink.style.display = 'none'
        aLink.click()
    }
};

// if(typeof window !== 'undefined' && window.Vue){
    // plugin.install(window.Vue)
// }

module.exports =  plugin;

