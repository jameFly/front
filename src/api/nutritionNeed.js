import axios from 'axios'
import { reNull } from "@/utils/common.js"

/**
 * 营养需求表接口
 * @type {string}
 */

const baseUrl = 'http://localhost:8080';

export const nutritionalNeedAPI = {

    getNeedList(params){ // 获取营养需求列表
        return axios({
            url:baseUrl + '/nutritional/nutrient_need_list',
            method:"get",
            params
        })
    },
    getNeedInfo(params){ // 获取营养表详情
        return axios({
            url:baseUrl + '/nutritional/need_info',
            method:"get",
            params
        })
    },
    editNeed(data){ // 添加编辑营养需求表
        return axios({
            url:baseUrl + '/nutritional/add_need',
            method:"post",
            data
        })
    },
    deleteNeed(params){ // 批量删除营养需求表
        return axios({
            url:baseUrl + '/nutritional/delete_need',
            method:"delete",
            params
        })
    },

    getNeedFoods(params){ // 查询符合需求表的菜品和克重(出来个弹框，里面是列表，菜品名+克重)
        return axios({
            url:baseUrl + '/food/need_food_list',
            method:"get",
            params
        })
    }

};