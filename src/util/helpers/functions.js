import _ from 'lodash'
import { number } from 'prop-types'
export default function isLogin() {
  var userData = JSON.parse(localStorage.getItem('auth'))
  var isLogin = userData && userData.token ? true : false
  return isLogin
}

export function roles() {
    var userData = JSON.parse(localStorage.getItem('user'))
    if (userData && userData.roles) {
        return userData.roles;
    } else {
        return false;
    }
  }

// get query parram
// export function getParram(n) {
//   var half = location.search.split(n + '=')[1]
//   return half !== undefined ? decodeURIComponent(half.split('&')[0]) : null
// }

// get query first parram
export function simpleLayout() {
    let page = _.reject(window.location.pathname.split("/"), _.isEmpty);
    return page[0];
}

// get query second parram
export function getSecondParam() {
    let page = _.reject(window.location.pathname.split("/"), _.isEmpty);
    return page[1];
}

// get query second parram
export function getMultiParam() {
    var url_string = window.location.href
    var url = new URL(url_string);
    let params = new URLSearchParams(url.search.slice(1));
    let obj = {};
    for(let pair of params.entries()) {
        obj[pair[0]] = pair[1]    //push keys/values to object
    }
    return obj;
}

export function toSlug (str) {
    // Chuyển hết sang chữ thường
    str = str.toLowerCase()     
 
    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a')
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e')
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i')
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o')
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u')
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y')
    str = str.replace(/(đ)/g, 'd')
 
    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '')
 
    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-')
 
    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '')
 
    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '')
 
    // return
    return str
}

export const memorySizeOf = (obj) => {
  var bytes = 0
  function sizeOf(obj) {
      if(obj !== null && obj !== undefined) {
          switch(typeof obj) {
          case 'number':
              bytes += 8
              break
          case 'string':
              bytes += obj.length * 2
              break
          case 'boolean':
              bytes += 4
              break
          case 'object':
              var objClass = Object.prototype.toString.call(obj).slice(8, -1)
              if(objClass === 'Object' || objClass === 'Array') {
                  for(var key in obj) {
                      if(!obj.hasOwnProperty(key)) continue
                      sizeOf(obj[key])
                  }
              } else bytes += obj.toString().length * 2
              break
          default:
              break
          }
      }
      return bytes
  }

  function formatByteSize(bytes) {
      if(bytes < 1024) return bytes + " bytes"
      else if(bytes < 1048576) return(bytes / 1024).toFixed() + " KiB"
      else if(bytes < 1073741824) return(bytes / 1048576).toFixed() + " MiB"
      else return(bytes / 1073741824).toFixed() + " GiB"
  }

  return formatByteSize(sizeOf(obj))
}

export function getParam(param) {
    var url_string = window.location.href
    var url = new URL(url_string);
    var value = url.searchParams.get(param);
    return value
}

export const formatMoney = (number) => {
    return number.toLocaleString('vi', {style : 'currency', currency : 'VND'});
}