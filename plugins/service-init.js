import { Service } from '@/services/service';
export default ({ app: { $axios } }) => {
    Service.prototype.$axios = $axios;
}