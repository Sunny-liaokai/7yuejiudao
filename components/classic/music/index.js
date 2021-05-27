// components/classic/music/index1.js
import {
  classicBeh
} from '../behaviors'
const mMgr=wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    audioSrc: String,
    title:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playOrStop: false,
    play: 'images/player@play.png',
    stop: 'images/player@pause.png',
    animationData:{}
  },
  // attached 组件被加载的时候触发
  lifetimes:{
    attached(){
      this._playStatus()
      this._onVideoEvent()
    },
  },
  pageLifetimes:{
    show:function(){
        console.log('组件在page显示')
    },
    hide:function(){
      console.log('组件在page隐藏')
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function (event) {
      this.setData({
        playOrStop: !this.data.playOrStop
      })
      // 图片要切换
      if (this.data.playOrStop) {
        mMgr.src = this.properties.audioSrc
        mMgr.title = this.properties.title
      } else {
        mMgr.pause()
      }
    },
    _playStatus(){
      if(mMgr.paused){ //暂停播放
        return this.setData({
          playOrStop:false
        })
      }
      this.setData({
        playOrStop: mMgr.src===this.data.audioSrc 
      })
    },
    _onVideoEvent(){
      mMgr.onEnded(()=>{
        this._playStatus()
      })
      mMgr.onPlay(()=>{
        this._playStatus()
      })
      mMgr.onPause(()=>{
        this._playStatus()
      })
      mMgr.onStop(()=>{
        this._playStatus()
      })
    }
  }
})