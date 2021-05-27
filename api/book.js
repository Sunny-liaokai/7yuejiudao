import {
  Http
} from '../http/http'

function getBooks() {
  return Http({
    url: '/book/hot_list'
  })
}
function getDetail(bid,notLoading=false) {
  return Http({
    url: `/book/${bid}/detail`,
    notLoading:notLoading
  })
}

function getLikeStatus(bid,notLoading=false) {
  return Http({
    url: `/book/${bid}/favor`,
    notLoading:notLoading
  })
}

function getComments(bid,notLoading=false) {
  return Http({
    url: `/book/${bid}/short_comment`,
    notLoading:notLoading
  })
}

function postComment(bid, comment) {
  return Http({
    url: '/book/add/short_comment',
    method: 'POST',
    data: {
      book_id: bid,
      content: comment
    }
  })
}
function getBookCount () {
  return Http({
    url:'/book/favor/count'
  })
}
function getLikeBook () {
  return Http({
    url:'/classic/favor'
  })
}
export {
  getBooks,
  getDetail,
  getLikeStatus,
  getComments,
  postComment,
  getBookCount,
  getLikeBook
}
