// components/search/index.js
import {
    saveData
} from '../../models/storage'
import {
    getHost,
    postSearchBook
} from '../../api/search'
import{
    mixed
} from'../../models/searchBehaviors'
const saveSearchResult = new saveData()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        more: {
            type: String,
            observer: '_loadMore'
        }
    },
    behaviors:[mixed],
    /**
     * 组件的初始数据
     */
    data: {
        historyWords: [],
        hotWords: [],
        searching: false,
        q: '',
        loading: false,
        loadingCenter: false,
        noneResult:false
    },
    
    lifetimes: {
        attached () {
            getHost().then(res => {
                this.setData({
                    historyWords: saveSearchResult.getStorageData(),
                    hotWords: res.hot
                })
            })
        }
    },
    
    /**
     * 组件的方法列表
     */
    methods: {
        getBookDetail(e){
            wx.navigateTo({
                url:`/pages/book-detail/book-detail?bid=${e.detail.id}`
            })
        },
        onCancel (event) {
            this.triggerEvent('cancel', {}, {})
        },
        onConfirm (e) {
            this.clearData()
            this.setData({
                searching: !this.data.searching,
                loadingCenter: true,
                noneResult:false
            })
            const text = e.detail.text || e.detail.value
            postSearchBook(0, text).then(res => {
                this.setData({
                    q: text,
                    loadingCenter: false,
                    noneResult:res.total===0
                })
                this._setLoadMoreTotal(res.total)
                this.loadMore(res.books)
                saveSearchResult.saveStorageData(text)
            })
        },
        SearchClear () {
            this.setData({
                q: '',
                searching: !this.data.searching
            })
        },
        _loadMore () {
            //注意死锁，断网情况下 loading
            if (!this.data.q.length || this.data.loading) return
            if (this.ifLoadMore()){
                wx.showToast({
                    title: '没有更多数据了',
                    icon: 'none'
                })
            }
            this.setData({
                loading: true
            })
            postSearchBook(this.data.dataArray.length, this.data.q).then(res => {
                this.setData({
                    loading: false
                })
                this.loadMore(res.books)
            }).catch(()=>{
                this.setData({
                    loading: false
                })
            })
        }
    }
})
