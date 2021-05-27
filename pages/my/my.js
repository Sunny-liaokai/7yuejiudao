// pages/my/my.js
import {getBookCount, getLikeBook} from "../../api/book"

Page({
    
    /**
     * 页面的初始数据
     */
    data: {
        imgSrc: 'images/my.png',
        bookCount: 0,
        classics: ''
    },
    onGetUserInfo (e) {
        if (wx.getStorageSync('userInfo')) return
        wx.getUserProfile({
            desc: '用于展示您的信息',
            success: (res) => {
                wx.setStorageSync('userInfo', res.userInfo)
                this._getBookCountOrLike()
                this.setData({
                    imgSrc: res.userInfo.avatarUrl
                })
            }
        })
    },
    async _getBookCountOrLike () {
        try {
            let [bookCount, classics] = await Promise.all([getBookCount(), getLikeBook()])
            this.setData({
                bookCount: bookCount.count,
                classics: classics
            })
        } catch (e) {
            wx.showToast({
                title: '请求错误',
                icon: 'none',
                duration: 2000
            })
        }
    },
    _getStorageUserInfo () {
        const userInfo = wx.getStorageSync('userInfo')
        if (userInfo) {
            this._getBookCountOrLike()
            this.setData({
                imgSrc: userInfo.avatarUrl
            })
        } else {
            this.setData({
                imgSrc: 'images/my.png'
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        this._getStorageUserInfo()
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
