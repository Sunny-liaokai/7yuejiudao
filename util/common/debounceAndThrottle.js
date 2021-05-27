/**
 * 防抖  在n秒内一直触发事件，不会执行 vue
 * @param fn_Name(防抖事件函数名称)  _this为true时直接传函数进去
 * @param time(时间)
 * @param triageNow(是否立即触发)
 * @param _this this指向 在vue中需要改变this指向，如果需要在js中使用 则传true 默认false
 */
export function debounce(fn_Name, time = 400, triageNow = true,_this=false) {
  let t = null,
    res;
  let debounced = function () {
    let _self = this,
      args = arguments
    if (t) {
      clearTimeout(t);
    }
    if (triageNow) {
      let exec = !t;
      t = setTimeout(function () {
        t = null;
      }, time);
      if (exec) {
        if (_this){
          res = fn_Name.apply(_self, args)
        }else {
          _self[fn_Name].apply(_self, args)
        }
      }
    } else {
      t = setTimeout(function () {
        if (_this){
          res = fn_Name.apply(_self, args)
        }else {
          _self[fn_Name].apply(_self, args)
        }
        // _self[fn_Name].apply(_self, args);
      }, time);
    }
    if (_this){
      return res
    }
  }
  debounced.remove = function () {
    clearTimeout(t)
    t = null
  }
  return debounced
}

/**
 * 节流 在n秒内连续触发只会执行一次
 * @param fnName(节流的函数名称)
 * @param delay(延迟)
 * @returns {function(...[*]=)}
 */
export function throttle(fnName, delay = 800) {
  let t = null,
    begin = new Date().getTime()
  return function () {
    let _self = this,
      args = arguments,
      cur = new Date().getTime()
    clearTimeout(t)
    if (cur - begin >= delay) {
      _self[fnName].apply(_self, args)
      begin = cur
    } else {
      t = setTimeout(function () {
        _self[fnName].apply(_self, args)
      }, delay)
    }
  }
}

/**
 * 使用率计算
 * @param num 可使用的
 * @param total 总的  可使用的+已使用的
 * @returns {number}
 * @constructor
 */
export function Percentage  (num,total) {
  //使用率计算
  if (num == 0 || total == 0) {
    return 0;
  }
  return (Math.round(num / total * 10000) / 100.00);// 小数点后两位百分比
}

