 const config = {
  url: 'http://bl.talelin.com/v1',
  appkey: "TnDoGWCVJzGWGxlr"
}
const codeStatus = {
  '1000': '输入参数错误',
  '1001': '输入的Json格式不正确',
  '1002': '找不到资源',
  '1003': '未知错误',
  '1004': '禁止访问',
  '1005': '不正确的开发者key',
  '1006': '服务器内部错误',
  '400': '请求包含不支持的参数',
  '401': '未授权',
  '403': '被禁止访问',
  '404': '请求资源不存在',
  '413': '上传的File体积太大',
  '3000':'该期内容不存在'
}
export {
  config,
  codeStatus
}