import request from "@/utils/request";

export function upLoadToken () {
    return request({
        url: `/api/auth/oss/token`,
        method: 'get',
    })
}