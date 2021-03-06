import axios from 'axios'
import { reNull } from "@/utils/common.js"

/**
 * 食材相关接口
 * @type {string}
 */

const baseUrl = 'http://localhost:8080';

export const materialAPI = {

    getMaterialList(params){ // 获取食材列表
        return axios({
            url:baseUrl + '/material/material_list',
            method:"get",
            params
        })
    },
    getMaterialInfo(params){ // 获取食材详情
        return axios({
            url:baseUrl + '/material/material_info',
            method:"get",
            params
        })
    },
    editMaterial(data){ // 添加编辑食材
        return axios({
            url:baseUrl + '/material/add_material',
            method:"post",
            data
        })
    },
    deleteMaterial(params){ // 批量删除食材
        return axios({
            url:baseUrl + '/material/material',
            method:"delete",
            params
        })
    },

    getNutritionIds(){ // 营养类型下拉框
        return axios({
            url:baseUrl + '/nutritional/nutrient_pull_down_list',
            method:"get",
        })
    },

    getMaterialChart(params){ // 食材的营养含量饼状图图
        return axios({
            url:baseUrl + '/material/material_chart',
            method:"get",
            params
        })
    }

};