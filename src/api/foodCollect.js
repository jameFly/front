import axios from 'axios'
import { reNull } from "@/utils/common.js"

/**
 * 获取收藏夹里的菜品列表
 * @type {string}
 */
const baseUrl = 'http://localhost:8080';

export const foodCollectAPI = {

    getCollectList(params) { // 获取菜品收藏列表
        return axios({
            url: baseUrl + '/food/favorite',
            method: "get",
            params
        })
    }
};