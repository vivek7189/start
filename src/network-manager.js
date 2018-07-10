import Credentials from './credentials';
import {showSpin, hideSpin, notification,getBrowserinfo} from './components/util';

let API_ROOT = 'http://jobsyelb-1901288852.ap-southeast-1.elb.amazonaws.com/'; //production
if(ENVIRONMENT && ENVIRONMENT === "staging"){
  API_ROOT = 'http://13.229.128.167:8000/'; //staging 
}
class _NetworkManager {
  get(endpoint, options) {
    options = Object.assign({type: 'GET'}, options);
    return apiRequest(endpoint, options);
  }

  post(endpoint, options) {
    options = Object.assign({type: 'POST'}, options);
    return apiRequest(endpoint, options);
  }

  patch(endpoint, options) {
    options = Object.assign({type: 'PATCH'}, options);
    return apiRequest(endpoint, options);
  }

  uploadImage(endpoint, options) {
    options = Object.assign({type: 'POST', imageUpload: true}, options);
    return apiRequest(endpoint, options);
  }
}

let apiRequest = function(endpoint, options) {
  let url = API_ROOT + endpoint;
  options.type == 'GET' && options.data && (url += '?' + toParams(options.data));

  return new Promise((resolve, reject) => {
    if(!options.unauthorised && !Credentials.getAuthToken()){
      window.location = '#/profile/1';
      reject('No uth token present');
      return;
    }
    networkRequest(url, options)
      .then(response => {
        resolve(response);
      }, cause => {
        if(cause.detail == 'Invalid token.') {  
          refreshToken().then(() => {
            networkRequest(url, options).then(r => resolve(r), e => {
              window.location = '#/profile/1';
              reject(e);
            })
          }, err => {
            window.location = '#/profile/1';
            reject(cause);
          })
        } else if(cause.detail == 'Invalid page.') {
          reject(cause);
        }else if(cause.detail == 'Not found.'){
          window.location = '#/profile/1';  
          reject(cause);
        } else {
         // window.location = '#/profile/1';
          reject(cause);
        }
      })
  })
}

let networkRequest = function(url, options){
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    options.spin && showSpin();
    req.open(options.type, url);
    !options.imageUpload && req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    !options.unauthorised && req.setRequestHeader("Authorization", "Token " + Credentials.getAuthToken());
    options.header && req.setRequestHeader("user-type", "SEEKER;PWA");
    //req.setRequestHeader("SOURCE", "PWA");
    //req.setRequestHeader("BROWSER-NAME", getBrowserinfo().name);
    //req.setRequestHeader("BROWSER-VERSION", getBrowserinfo().full_version);

    req.onload = function() {
      options.spin && hideSpin();
      if(req.status == 400) {
        let response = req.response ? JSON.parse(req.response) : null;
        reject(response);
        return;
      }
      if(req.status == 204) {
        resolve();
        return;
      }
      if (req.status == 200 || req.status == 201) {
        let response = req.response ? JSON.parse(req.response) : null;
        resolve(response);
        return;
      }
      reject(JSON.parse(req.response));
    };

    req.onerror = function() {
      options.spin && hideSpin();
      notification("Network Error");
      reject("Network Error");
    };

    if(options.imageUpload){
      req.send(options.data);
    } else if (options.type == 'GET') {
      req.send();
    } else {
      req.send(JSON.stringify(options.data));
    }
  });
}

function toParams(data) {
  if(!data) {
    return '';
  }
  return Object.keys(data).map(function(k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&');
}

function refreshToken() {
  return new Promise(function(resolve, reject) {
    let options = {
      type: 'POST',
      unauthorised:true,
      data: {
        phone: Credentials.getPhone(),
        token: Credentials.getAuthToken()
      }
    }
    networkRequest(API_ROOT + 'user/refresh_token/', options).then(res => {
      if(res.auth_token){
        Credentials.setAuthToken(res.auth_token);
        resolve();
      } else {
        Credentials.clear();
        window.location="#/profile/1";
        reject(res);
      }
    }, cause => {
      Credentials.clear();
      window.location="#/profile/1"
      reject(cause);
    });
  })
}

let NetworkManager = new _NetworkManager();
export default NetworkManager;
