//获取url
const app = getApp()
const baseURI = app.globalData.baseURI

const request = (url,method='GET',options={}) => {
    return new Promise((resolve , reject)=>{
        if (method == 'PATCH') {
            method = 'POST'
            options = {
                ...options,
                data:{
                    ...options.data,
                    '_method': 'PATCH'
                }
            }
        }
        wx.showLoading( {
            title: '加载中',
        })
        wx.request({
            url: baseURI + url, //仅为示例，并非真实的接口地址,
            method:method,
            data: options.data,
            header: {
              ...options.header,
                Authorization: 'Bearer ' + wx.getStorageInfoSync('token') || '',
            },
            timeout: 10000,
            success (res) {
                if (res.statusCode < 400) {
                    resolve(res.data)
                }  else {
                    let msg = '请求出错'
                    if (res.statusCode === 400){
                        msg = res.data.message
                        wx.request({
                            title:msg,
                            icon:'error',
                            duration: 2000,
                        })
                    }else if (res.statusCode === 401){
                        msg = '登录失效，请重新登录'
                        //TODO 跳转到登录页面
                    }else if (res.statusCode === 422){
                        msg = res.data.errors[Object.keys(res.data.errors)[0]][0]
                    }else if (res.statusCode === 404){
                        msg = '请求资源不存在'
                    }
                    wx.showToast({
                        title:msg,
                        icon:'error',
                        duration: 2000,
                    })
                }
            },
            fail(res){
                reject(res)
                wx.showToast({
                  title:'网络错误',
                    icon:'error',
                    duration: 2000,
                })
            },
            complete(){
                wx.hideLoading()
            },

        })
    })
}

const e = {
    request,
    get(url,options={}){
        return request(url, 'GET',options)
    },
    patch(url,options={}){
        return request(url, 'PATCH',options)
    },
    post(url,options={}){
        return request(url, 'POST',options)
    },
    put(url,options={}){
        return request(url, 'PUT',options)
    },
    delete(url,options={}){
        return request(url, 'DELETE',options)
    }
}

module.exports = e