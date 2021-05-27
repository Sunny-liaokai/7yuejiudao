import {
  Http
} from '../http/http'
//获取
function getHost() {
  return Http({
    url: '/book/hot_keyword',
  })
}
function postSearchBook (start,q,count=5,summary=1) {
  return Http({
    url:'/book/search',
    data:{
      start:start,
      q:q,
      count:count,
      summary:summary
    },
    notLoading:true
  })
}
export {
  getHost,
  postSearchBook
}
