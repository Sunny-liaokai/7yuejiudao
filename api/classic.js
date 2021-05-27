import {
  Http
} from '../http/http'

/**
 * 获取最新一期的期刊
 */
function getClassicLatest() {
  return Http({
    url: '/classic/latest',
  })
}
/**
 * 修改喜欢的状态
 * @param {*} LikeStatus 
 * @param {*} id 
 * @param {*} category 
 */
function postLikeStatus(LikeStatus, id, category) {
  const url = LikeStatus ? '/like' : '/like/cancel'
  return Http({
    url: url,
    method: 'POST',
    data: {
      art_id: id,
      type: category
    }
  })
}
/**
 * 获取当前一期的下一期期刊或上一期期刊
 */
function getClassic(index, type) {
  return Http({
    url: `/classic/${index}/${type}`
  })
}
/**
 * 获取喜欢的状态
 * @param {*} id 
 * @param {*} type 
 * @param {*} notLoading 为true则不需要logdding 
 */
function getLikeStatus(id, type,notLoading=true) {
  return Http({
      url: `/classic/${type}/${id}/favor`,
      notLoading:notLoading
    })
}
export {
  getClassicLatest,
  postLikeStatus,
  getClassic,
  getLikeStatus
}