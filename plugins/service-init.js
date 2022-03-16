import { Service } from '@/services/service';
export default ({ app: { $axios, $auth } }) => {
    Service.prototype.$axios = $axios;
    Service.prototype.$auth = $auth;
}