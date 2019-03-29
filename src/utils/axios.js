/**
 * 基于axios的ajax方法
 */
import axios from 'axios'
import { common as i18n } from "../i18n/"

const instance = axios.create();
instance.defaults.headers.common['merchantId'] = window.storage.getItem("merchantId");
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    if (response.data.success === true) {
        return response.data.data;
    } else {
        return Promise.reject(response.data.message);
    }
}, (error) => {
        return Promise.reject(i18n.badRequest);
});
export default instance;