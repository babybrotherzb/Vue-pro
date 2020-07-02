import axios from 'axios'
import router from 'vue-router'
// import { Loading , Message } from 'element-ui'

axios.defaults.timeout = 5000
// var loadinginstace
// 拦截请求config
axios.interceptors.request.use(config => {
  // console.log(config, '/// console.log(config)')
  // element ui Loading方法
  // loadinginstace = Loading.service({ fullscreen: true })
  config.headers['X-Requested-With'] = `XMLHttpRequest`
  // config.headers['content-type'] = `application/json`
  if (config.method === 'post') {
    // config.data = qs.stringify(config.data)
  }
 
  return config
}, error => {
  // loadinginstace.close()
  // Message.error({
  // message: '加载超时'
  // })
  // console.log('加载超时')
  return Promise.reject(error)
})

// 拦截响应response，并做一些错误处理
axios.interceptors.response.use((response) => {
  // 对响应数据做些事
  if(window.location.hash!='#/login'&&sessionStorage.getItem('user')&&sessionStorage.getItem('user')!='null'&&sessionStorage.getItem('user')!='undefined'){
    this.$router.push('/')
  //   sessionStorage.removeItem('user')
  }
  // loadinginstace.close()
  return response
}, (err) => { // 这里是返回状态码不为200时候的错误处理
  if (err && err.response) {
    switch (err.response.status) {
      // case 401:
      //   // '未授权，请登录'
      //   $route.push('/login')
      //   break

      // case 403:
      //   err.message = '拒绝访问'
      //   break

      case 404:
        // err.message = `请求地址出错: ${err.response.config.url}`
        // console.log('404')
        break

      // case 408:
      //   err.message = '请求超时'
      //   break

      case 500:
        // err.message = '服务器内部错误'
        console.log('500')
        break

      // case 501:
      //   err.message = '服务未实现'
      //   break

      // case 502:
      //   err.message = '网关错误'
      //   break

      // case 503:
      //   err.message = '服务不可用'
      //   break

      // case 504:
      //   err.message = '网关超时'
      //   break

      // case 505:
      //   err.message = 'HTTP版本不受支持'
      //   break

      default:
    }
  }

  return Promise.reject(err)
})

export default axios
