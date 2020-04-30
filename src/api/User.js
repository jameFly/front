import axios from 'axios'
import { reNull } from "@/utils/common.js"

/**
 * 用户相关
 * @type {string}
 */
const baseUrl = 'http://localhost:8080';

export const UserAPI = {

    login(data){ // 登录
        return axios({
            url:baseUrl + '/user/login',
            method:"post",
            data
        })
    }

};