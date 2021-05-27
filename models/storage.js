const key = 'q'
const arrLength = 10
class saveData {
  getStorageData() {
    return wx.getStorageSync(key) || []
  }
  saveStorageData(value) {
    let searchList = this.getStorageData() 
    if (searchList.includes(value)) return
    if (searchList.length >= arrLength) {
      searchList.pop()
    }
    //这里注意有个坑 unshift返回是数组的长度 我们要插入后的结果 所以要拿插入的数组
    searchList.unshift(value)
    wx.setStorageSync(key, searchList)
  }
}
export {
  saveData
}