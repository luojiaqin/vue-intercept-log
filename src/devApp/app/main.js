import Vue from 'vue'
import App from './App.vue'
const plugin = require('../../index.js')
Vue.use(plugin, {
    isDefaultRecord: true
})

new Vue({
    el: '#app',
    render: h => h(App)
})