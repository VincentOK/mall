/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = '';
let imgBaseUrl = '';

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == 'development') {
    baseUrl = 'http://192.168.154:8080/timestore/';
    imgBaseUrl = '/img/';
} else if (process.env.NODE_ENV == 'production') {
}

export {
    baseUrl,
    imgBaseUrl,
}
