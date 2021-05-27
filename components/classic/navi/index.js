// components/classic/navi/idnex.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      leftDis:{
        type:Boolean,
        observer:(val)=>{
          // console.log(val)
        }
      },
      rightDis:{
        type:Boolean,
        observer:(val)=>{
          // console.log(val)
        }
      },
      content:{
        type:String
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
      leftSrc:'images/triangle@left.png',
      leftSrcDis:'images/triangle.dis@left.png',
      rigthSrc:'images/triangle@right.png',
      rigthSrcDis:'images/triangle.dis@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    leftCkilk(){
      if(this.properties.leftDis)return
      this.triggerEvent('next',{},{})
    },
    rightCkilk(){
      if(this.properties.rightDis)return
      this.triggerEvent('previous',{},{})
    }
  }
})
