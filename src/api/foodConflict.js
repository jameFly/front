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
    },
    getConflictInfo(params){ // 获取食物冲突详情
        return axios({
            url:baseUrl + '/knowledge/food_conflict_info',
            method:"get",
            params
        })
    },
    editConflict(data){ // 添加编辑食物冲突
        return axios({
            url:baseUrl + '/knowledge/add_conflict',
            method:"post",
            data
        })
    },
    deleteConflict(params){ // 批量删除食物冲突
        return axios({
            url:baseUrl + '/knowledge/conflict',
            method:"delete",
            params
        })
    }

};