import {
  config,
  codeStatus
} from "./http_config.js"


function showToast(code) {
  wx.showToast({
    title: codeStatus[code] || '请求错误',
    icon: 'none',
    duration: 2000
  })
}

function Http(params) {
  return new Promise((resole, reject) => {
    if(!params.notLoading){
      wx.showLoading({
        title: '加载中',
      })
    }
    wx.request({
      url: `${config.url}${params.url}`,
      method: params.method || 'GET',
      data: params.data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        if (res.statusCode.toString().startsWith('2')) {
          resole(res.data)
        } else {
          showToast(res.statusCode)
          reject(res)
        }
      },
      fail: (err) => {
        showToast(err.statusCode)
        reject(err)
      },
      complete: () => {
        if(!params.notLoading){
          wx.hideLoading()
        }
      }
    })
  })
}

export {
  Http
}
