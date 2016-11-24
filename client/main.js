require('babel-polyfill')

import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueResource from 'vue-resource'
import Index from './components/index.vue'
import {routerConfig} from './router'

Vue.use(ElementUI);
Vue.use(VueResource);

Vue.use(VueRouter);

const router = new VueRouter({
    //mode: 'history',
    //scrollBehavior: () => ({ y: 0 }),
    routes:routerConfig
});

new Vue({
    router:router,
    render: h => {
        return h(Index,{
            props: {
                me: 'liuwill',
                email: 'liuwill@live.com',
                appData: {},
            }
        })
    }
}).$mount("#app");

// let vm = new Vue({
//     el: '#app',
//     data: {
//         seen: true
//     }
// });