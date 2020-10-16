import VueRouter from 'vue-router';

import Account from './pages/Account.vue';
import Home from './pages/Home.vue';
import Login from './pages/Login.vue';
import { isAuthenticate } from './services/authentication';

const routes = [
    {   
        path: '/compte', 
        component: Account, 
        props: { isLogged: true },
        beforeEnter: (to, from, next) => {
            if(!isAuthenticate()){ next({ path: '/connexion' }); }
            else { next(); }
        }

    },
    {   path: '/connexion', 
        component: Login,
        props: { isLogged: false },
        beforeEnter: (to, from, next) => {
            if(isAuthenticate()){ next({ path: '/compte' }); }
            else { next(); }
        }
    },
    { path: '', component: Home },
]

const router = new VueRouter({
    routes
})

export default router;