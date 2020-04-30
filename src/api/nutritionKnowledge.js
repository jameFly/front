import axios from 'axios'

/**
 * 营养知识相关接口
 */

const baseUrl = 'http://localhost:8080';

export const nutritionKnowledgeAPI = {

    getKnowledgeList(params){ // 获取食物冲突列表
        return axios({
            url:baseUrl + '/knowledge/nutrition_knowledge_list',
            method:"get",
            params
        })
    }

};