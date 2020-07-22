import { request } from './request'

export function baseData(data) {
  return request({
    url: data + '/weather.json'
  })
}

export class GetHome {
  constructor(res) {
    this.wind = res.realtime.wind // 凤
    this.temperature = res.realtime.temperature // 温度
    this.apparent_temperature = res.realtime.apparent_temperature
    this.humidity = res.realtime.humidity // 湿度
    this.skycon = res.realtime.skycon // 天气情况代码
    this.air_desc = res.realtime.air_quality.description.chn // 空气质量
    this.tips = res.forecast_keypoint // 提示
  }
}
