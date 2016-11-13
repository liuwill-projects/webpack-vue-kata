import Starter from './components/Starter.vue';
import App from './components/App.vue';
import ListView from './components/ListView.vue';

export const routerConfig = [
    //{ path: '/', redirect: '/start' },
    { name: 'starter', path: '/', component: Starter },
    { name: 'dashboard', path: '/dashboard', component: App ,children:[
        { name: 'list', path: '/dashboard/list', component: ListView },
    ]},
    { path: '*', redirect: '/' },
];
