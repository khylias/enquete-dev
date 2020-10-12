import axios from "axios";
import Vue from 'vue'

const httpInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.token}`
    }
});


export default {
    install() {
        Vue.prototype.$http = httpInstance
    }
};