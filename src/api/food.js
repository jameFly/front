import axios from 'axios'
import { reNull } from "@/utils/common.js"
/**
 * 菜品相关接口
 * @type {{var: string, getFoodList(): *, getFoodInfo(), editFood(), deleteFood(), collectFood()}}
 */

const baseUrl = 'http://localhost:8080';

export const foodAPI = {

    getFoodList(params){ // 获取菜品列表
        return axios({
            url:baseUrl + '/food/food_list',
            method:"get",
            params
        })
    },
    getFoodInfo(params){ // 获取菜品详情
        return axios({
            url:baseUrl + '/food/food_info',
            method:"get",
            params
        })
    },
    editFood(data){ // 添加编辑菜品
        return axios({
            url:baseUrl + '/food/add_food',
            method:"post",
            data
        })
    },
    deleteFood(params){ // 批量删除菜品
        return axios({
            url:baseUrl + '/food/delete_food',
            method:"delete",
            params
        })
    },
    collectFood(data){ // 菜品收藏(移除收藏)
        return axios({
            url:baseUrl + '/food/collect_food',
            method:"post",
            data
        })
    },

    getMaterialIds(){ // 食材下拉框
        return axios({
            url:baseUrl + '/material/material_pull_down_list',
            method:"get",
        })
    },

    getFoodChart(params){ // 菜品的食材含量柱状图，营养含量饼状图(返回的是个长度为2的列表，第一个是柱状图，第二个是饼状图)
        return axios({
            url:baseUrl + '/food/food_chart',
            method:"get",
            params
        })
    }

};