import axios from 'axios'

/**
 * 营养标准参考相关接口
 */

const baseUrl = 'http://localhost:8080';

export const nutritionStandardAPI = {

    getStandardList(params){ // 获取营养标准列表
        return axios({
            url:baseUrl + '/knowledge/nutrition_standard_list',
            method:"get",
            params
        })
    }

};