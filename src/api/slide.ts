import request from "@/utils/request";

export function slide (params:any) {
    return request({
        url: `/api/admin/slides`,
        method: 'get',
        params
    })
}

export function addSlide (data:any) {
    return request({
        url: `/api/admin/slides`,
        method: 'post',
        data
    })
}