const mixed = Behavior({
    data: {
        dataArray:[],
        total:null
    },
    methods: {
        _setLoadMoreTotal (length) {
            //不需要触发响应式的话可以直接赋值
            this.data.total=length
        },
        loadMore(newData){
            let newArray=this.data.dataArray.concat(newData)
            this.setData({
                dataArray:newArray
            })
        },
        ifLoadMore(){
            return this.data.total===this.data.dataArray.length
        },
        clearData(){
            this.setData({
                dataArray:[],
                total:null
            })
        }
    }
})
export {
    mixed
}
