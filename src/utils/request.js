import axios from "axios";
import {message} from "antd";

export const request = axios.create({
    baseURL:"http://81.70.216.18:4000",
})

request.interceptors.response.use(
    function(response){
        if(response.data.code === "20000"){
//          message.success(response.data.message);
            return response;
        }
        else{
            message.error(response.data.message);
            return Promise.reject(new Error(response.data.message || "未知错误"));
        }
    },
    function(error){
        message.error("未知错误");
        return Promise.reject(error);
    }
);