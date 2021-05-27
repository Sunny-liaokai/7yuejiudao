// components/classic/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: String,
      observer: function (val) {
        // this.setData({
        //   _index: val < 10 ? '0' + val : val
        // })
      }
    }
  },
  lifetimes:{ //这里的优先级会比外面要高
      /**
   * 组件的初始数据
   */
    attached(){
    }
  },
  data: {
    month:new Date().getMonth(),
    year:new Date().getFullYear()
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})