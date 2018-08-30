import {
  baseUrl
} from './url'
import axios from 'axios'
import qs from 'qs'
// const config = {
//   header: {'Content-Type': 'application/json;',timeout:3000}s
// };
export default async(url, data = {}, type = 'GET',loading = true,config) => {
  console.log("请求头："+JSON.stringify(config))
  return new Promise((resolve, reject) => {
    if(typeof loading == "boolean" && loading){
      //显示loading加载层
      document.getElementById("loading").style.display = 'block'
    }
    url = baseUrl + url;
    console.log("请求url:"+url)
    if(type == 'GET'){
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      axios.get(url,config)
        .then(function (response) {
          //隐藏loading加载层
          console.log("请求返回数据："+JSON.stringify(response))
          document.getElementById("loading").style.display = 'none';
          // resolve(response.data)
          if(response.status !==200){
            //请求响应状态吗不为200
            document.getElementById('requestError').style.display = 'block';
            document.getElementById('loadingerror').innerText = '请求响应状态吗不为200';
            setTimeout(function () {
              document.getElementById('requestError').style.display = 'none';
            },3000)
            reject(response.data)
          }else{
            if(typeof response.data !== 'object'){
              //返回不是json格式数据
              document.getElementById('requestError').style.display = 'block';
              document.getElementById('loadingerror').innerText = '返回不是json格式数据';
              setTimeout(function () {
                document.getElementById('requestError').style.display = 'none';
              },3000)
              reject(response.data)
            }else {
              //返回状态吗不为0
              if(response.data.code !== '0'){
                document.getElementById('requestError').style.display = 'block'
                document.getElementById('loadingerror').innerText = response.data.msg;
                setTimeout(function () {
                  document.getElementById('requestError').style.display = 'none';
                },3000)
                reject(response.data)
              }else{
                //隐藏错误层
                document.getElementById('requestError').style.display = 'none'
                resolve(response.data.data)
              }
            }
          }
        })
        .catch(function (error) {
          //隐藏loading加载层
          document.getElementById("loading").style.display = 'none';
          console.log(error)
          var str = error + '';
          document.getElementById('requestError').style.display = 'block';
          document.getElementById('loadingerror').innerText = '请求超时';
          reject(error)
          // if(str.search('timeout') !== -1){
          //   document.getElementById('requestError').style.display = 'block';
          //   document.getElementById('loadingerror').innerText = '请求超时';
          //   reject(error)
          // }
        })
    }else {
      // if(myconfig.header["Content-Type"] != 'multipart/form-data;'){
      //   console.log("上传图片")
      //   data = qs.stringify(data)
      // }
      if(!config){
        console.log("上传图片")
        data = qs.stringify(data)
      }
      // axios.post(url, qs.stringify(data),config)
      axios.post(url, data,config)
        .then(function (response) {
          // console.log(JSON.stringify(response.data))
          //隐藏loading加载层
          console.log("请求返回数据："+JSON.stringify(response))
          document.getElementById("loading").style.display = 'none';
          // resolve(response.data)
          if(response.status !==200){
            //请求响应状态吗不为200
            document.getElementById('requestError').style.display = 'block';
            document.getElementById('loadingerror').innerText = '请求响应状态吗不为200';
            setTimeout(function () {
              document.getElementById('requestError').style.display = 'none';
            },3000)
            reject(response.data)
          }else{
            if(typeof response.data !== 'object'){
              //返回不是json格式数据
              document.getElementById('requestError').style.display = 'block';
              document.getElementById('loadingerror').innerText = '返回不是json格式数据';
              setTimeout(function () {
                document.getElementById('requestError').style.display = 'none';
              },3000)
              reject(response.data)
            }else {
              //返回状态吗不为0
              if(response.data.code !== '0'){
                document.getElementById('requestError').style.display = 'block'
                document.getElementById('loadingerror').innerText = response.data.msg;
                setTimeout(function () {
                  document.getElementById('requestError').style.display = 'none';
                },3000)
                reject(response.data)
              }else{
                //隐藏错误层
                document.getElementById('requestError').style.display = 'none'
                resolve(response.data.data)
              }
            }
          }
        })
        .catch(function (error) {
          //隐藏loading加载层
          document.getElementById("loading").style.display = 'none';
          console.log(error)
          var str = error + '';
          document.getElementById('requestError').style.display = 'block';
          document.getElementById('loadingerror').innerText = '请求超时';
          setTimeout(function () {
            document.getElementById('requestError').style.display = 'none';
          },3000)
          reject(error)
          // if(str.search('timeout') !== -1){
          //   document.getElementById('requestError').style.display = 'block';
          //   document.getElementById('loadingerror').innerText = '请求超时';
          //   reject(error)
          // }
        })
    }
  })

}
