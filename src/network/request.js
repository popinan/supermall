import axios from "axios"

export function request(config) {
    // 1.创建axios实例
    const instance1 = axios.create({
        baseURL : 'http://123.207.32.32:8000',
        timeout : 5000})
    // 2.axios拦截器
    // 2.1 拦截请求
    instance1.interceptors.request.use(config => {
        // console.log(config);
        return config
    }, err => {
        console.log(err)
    })
    // 2.2 拦截相应
    instance1.interceptors.response.use(res => {
        // console.log(res);
        return res.data
    }, err => {
        console.log(err)
    })
    return instance1(config)
}