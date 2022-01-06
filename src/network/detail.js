import { request } from "./request";

export function getDetailData(iid) {
    return request({
        url: '/detail',
        params: {iid}
    })
}

export function getRecommendData() {
    return request({
        url: '/recommend',
    })
}

export class Goods {
    constructor (itemInfo, columns, services) {
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.newPrice = itemInfo.price;
        this.realPrice = itemInfo.lowNowPrice;
        this.oldPrice = itemInfo.oldPrice;
        this.discount = itemInfo.discountDesc;
        this.columns = columns;
        this.services = services;
    }
}