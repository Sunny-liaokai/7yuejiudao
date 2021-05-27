// pages/book-detail/book-detail.js
import {
  getDetail,
  getLikeStatus,
  getComments,
  postComment
} from '../../api/book';
import {
  postLikeStatus
} from '../../api/classic';
import {debounce} from '../../util/common/debounceAndThrottle'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: {},
    comments: [],
    LikeStatus: {},
    bookInfo: ['publisher', 'pubdate', 'pages', 'price', 'binding'],
    booTitle: ['出版社', '出版年', '页数', '定价', '装帧'],
    posting: false
  },
  /**
   * 修改book详细的点赞状态
   * @param {*} e
   */
  onLike(e) {
    postLikeStatus(e.detail.Like, this.data.LikeStatus.id, 400)
  },
  /**
   * 显示或隐藏输入短评功能
   */
  onFakePost() {
    this.setData({
      posting: !this.data.posting
    })
  },
  //节流
  tabClick:debounce('onPost'),
  onPost(e) {
    let value = (e.detail.value || e.detail.text).trim()
    if (!value) return
    if (value.length > 12) {
      return wx.showToast({
        title: '最多输入12个字',
        icon: "none"
      })
    }
    postComment(this.data.book.id, value).then(() => {
      wx.showToast({
        title: '+1',
        icon: "none"
      })
      this._findIndex(value)
      this.setData({
        comments: this.data.comments,
        posting: false
      })
    })
  },
  /**
   *查找短评中的评论如果有就加1没有就在最前面加一条
   */
  _findIndex(value) {
    let Index = this.data.comments.findIndex(item => item.content === value)
    if (Index !== -1) {
      this.data.comments[Index] = {
        content: value,
        nums: this.data.comments[Index].nums + 1
      }
    } else {
      //向数组的前面插入一条短评
      this.data.comments.unshift({
        content: value,
        nums: 1
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // getDetail(options.bid).then((res) => {
    //   this.setData({
    //     book: res
    //   })
    // })
    // getComments(options.bid).then((res)=>{
    //   console.log(res)
    // })
    wx.showLoading()
    const http = [
      getDetail(options.bid, true),
      getComments(options.bid, true),
      getLikeStatus(options.bid, true)
    ]
    Promise.all([...http]).then(res => {
      console.log(res)
      const [Detail, comments, LikeStatus] = res
      this.setData({
        book: Detail,
        comments: comments.comments,
        LikeStatus
      })
      wx.hideLoading()
    }).catch(() => {
      wx.hideLoading()
    })
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
