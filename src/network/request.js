// 导入 axios 模块
import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: '/api/v2.5/xf3oPAdzEb7J9AkB/', // 默认请求地址
    timeout: 10000 // 请求超时时间
  })

  return instance(config)
}
