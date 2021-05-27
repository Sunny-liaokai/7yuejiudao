Component({
    options:{
        multipleSlots:true
    },
    properties: {
        openType:{
            type:String,
            value:''
        }
    },
    data: {},
    methods: {
        onGetUserInfo(e){
            this.triggerEvent('getUserInfo',{userInfo:e.detail},{})
        }
    }
});
