import axios from 'axios'

/**
 * 食物冲突相关接口
 */

const baseUrl = 'http://localhost:8080';

export const foodConflictAPI = {

    getConflictList(params){ // 获取食物冲突列表
        return axios({
            url:baseUrl + '/knowledge/food_conflict_list',
            method:"get",
            params
        })
    }

};