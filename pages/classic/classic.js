// pages/classic.js
import {
  getClassicLatest,
  postLikeStatus,
  getClassic,
  getLikeStatus
} from '../../api/classic'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    classic: '',
    NavLeft: true,
    NavRight: false,
    likeStatus:false,
    likeCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getClassicLatest().then(res => {
      //保存最新一期的index
      wx.setStorageSync('index', res.index)
      wx.setStorageSync('classic',[res])
      this.setData({
        classic: res,
        likeCount:res.fav_nums,
        likeStatus:res.like_status
      })
    })
    // wx.request({
    //   method:"GET",
    //   url: 'http://bl.talelin.com/v1/classic/latest',
    //   header:{
    //     appkey:"TnDoGWCVJzGWGxlr"
    //   }
    // })
  },
  like_status({detail}) {
    let {
      id,
      type
    } = this.data.classic
    postLikeStatus(detail.Like, id, type)
  },
  _put_like_status(id,type){
    getLikeStatus(id,type).then(res=>{
      this.setData({
        likeStatus:res.like_status,
        likeCount:res.fav_nums
      })
    })
  },
  ifNaviBtnDisable(res) {
    this.setData({
      classic: res,
      NavRight: res.index === 1,
      NavLeft: wx.getStorageSync('index') == res.index,
    })
    this._put_like_status(res.id,res.type)
  },
  //下一期刊或上一期刊
  onLastOrNext({type}) {
    this._getClassKey(type)
  },
  //缓存机制
  _getClassKey(type){
    let arr=wx.getStorageSync('classic') || []
    let Index=JSON.parse(JSON.stringify(this.data.classic.index))
    Index=type=='next'?Index+1:Index-1
    let result=arr.filter(item=>Index===item.index)
    if(result.length){
      this.ifNaviBtnDisable(result[0])
    }else{//没有缓存
      getClassic(this.data.classic.index,type).then(res => {
        arr.push(res)
        wx.setStorageSync('classic',arr)
        this.ifNaviBtnDisable(res)
      })
    }
 
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
