// components/like/index.js
Component({
    options: {
        multipleSlots: true //在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
        Like: {
            type: Boolean,
            value: false,
            observer: function (val) {
                // console.log(val)
            }
        },
        count: {
            type: Number,
            value: 0,
            observer: function (val) {
                // console.log(val)
            }
        },
        disabledClick: {
            type: Boolean,
            value:false
        }
    }
    ,
    
    /**
     * 组件的初始数据
     */
    data: {},
    
    /**
     * 组件的方法列表
     */
    methods: {
        likeClick () {
            if (this.properties.disabledClick)return
            let {
                Like,
                count
            } = this.properties
            Like = !Like
            count = Like ? count + 1 : count - 1
            this.setData({
                count: count,
                Like: Like
            })
            this.triggerEvent('change', {
                Like: Like
            })
        }
    }
})
