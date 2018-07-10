import moment from 'moment';

function cleanObject(obj) {
  let res = {};
  for (var propName in obj) {
    if (obj[propName] !== null && obj[propName] !== undefined && (typeof obj[propName]!=='string' || obj[propName].length>0)) {
      res[propName] = obj[propName];
    }
  }
  return res;
}

function hideKeyPad() {
  if (
    document.activeElement &&
    document.activeElement.blur &&
    typeof document.activeElement.blur === 'function'
  ) {
    document.activeElement.blur()
  }
}

function notification(msg) {
    var x = document.getElementById("notification")
    x.className = "show";
    x.textContent=msg;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000)
}

function showSpin(param){
  document.getElementById('spinner').classList.remove('hidden');

  if(param){
    document.getElementById('spinner').classList.add('loaderShow');
  }
}
function hideSpin(param){
    document.getElementById('spinner').classList.add('hidden');
    if(param){
      document.getElementById('spinner').classList.remove('loaderShow');
    }
}



 function capitalize(string) {
   if(!string) {
     return string;
   }
   return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
 }

 function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return null;
}
function delCookie(name) {
  setCookie(name, "", -1);
}


function compareTime(dateTimeA, dateTimeB) {
  var momentA = moment(dateTimeA,"YYYY-MM-DDThh:mm:ss.SSS");
  var momentB = moment(dateTimeB,"YYYY-MM-DDThh:mm:ss.SSS");
  if (momentA > momentB) return 1;
  else if (momentA < momentB) return -1;
  else return 0;
}

function setObject(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

function getObject(key) {
  return JSON.parse(localStorage.getItem(key));
}

function updateItem(key, property, value)
{
  var obj = getObject(key);
  obj[property] = value;
  setObject(key, obj);
}

function parseJson (json) {
  var parsed="";
  try {
    parsed = JSON.parse(json)
  } catch (e) {  }

  return parsed
}

window.addEventListener('error', function(e) {
  // to be remove... added to identify if some js chunk gets loading error the navigate to home page 
  if(e.srcElement.nodeName ==="SCRIPT"  && e.srcElement.src && (e.srcElement.src.indexOf("/js/") >1)){
    //let refresh = window.sessionStorage.getItem('refresh');
    //if (refresh===null){
      // console.log("refresh",refresh);
        //window.sessionStorage.setItem('refresh', "1");
        window.setTimeout(function(){
          window.location = '#/';
          window.location.reload(true); 
        },500)
    //}

    return false;
  }
  console.log(e);
}, true);
function getBrowserinfo(){
  let objappVersion = navigator.appVersion;
  let objAgent = navigator.userAgent;
  let objbrowserName = navigator.appName;
  let objfullVersion = '' + parseFloat(navigator.appVersion);
  let objBrMajorVersion = parseInt(navigator.appVersion, 10);
  let objOffsetName, objOffsetVersion, ix;
  if ((objOffsetVersion = objAgent.indexOf("Chrome")) != -1) {
      objbrowserName = "Chrome";
      objfullVersion = objAgent.substring(objOffsetVersion + 7);
  } else if ((objOffsetVersion = objAgent.indexOf("MSIE")) != -1) {
      objbrowserName = "Microsoft Internet Explorer";
      objfullVersion = objAgent.substring(objOffsetVersion + 5);
  } else if ((objOffsetVersion = objAgent.indexOf("Firefox")) != -1) {
      objbrowserName = "Firefox";
  } else if ((objOffsetVersion = objAgent.indexOf("Safari")) != -1) {
      objbrowserName = "Safari";
      objfullVersion = objAgent.substring(objOffsetVersion + 7);
      if ((objOffsetVersion = objAgent.indexOf("Version")) != -1)
          objfullVersion = objAgent.substring(objOffsetVersion + 8);
  } else if ((objOffsetName = objAgent.lastIndexOf(' ') + 1) < (objOffsetVersion = objAgent.lastIndexOf('/'))) {
      objbrowserName = objAgent.substring(objOffsetName, objOffsetVersion);
      objfullVersion = objAgent.substring(objOffsetVersion + 1);
      if (objbrowserName.toLowerCase() == objbrowserName.toUpperCase()) {
          objbrowserName = navigator.appName;
      }
  }
  
  
  if ((ix = objfullVersion.indexOf(";")) != -1) objfullVersion = objfullVersion.substring(0, ix);
  if ((ix = objfullVersion.indexOf(" ")) != -1) objfullVersion = objfullVersion.substring(0, ix);
  objBrMajorVersion = parseInt('' + objfullVersion, 10);
  if (isNaN(objBrMajorVersion)) {
      objfullVersion = '' + parseFloat(navigator.appVersion);
      objBrMajorVersion = parseInt(navigator.appVersion, 10);
  }
  return {
      name:objbrowserName,
      full_version:objfullVersion,
      major_version:objBrMajorVersion,
      appName:navigator.appName,
      userAgent:navigator.userAgent 
    }
  }
  
export {cleanObject, capitalize,showSpin,hideSpin,notification,getCookie,setCookie,delCookie,compareTime,setObject,getObject,updateItem,parseJson, hideKeyPad,getBrowserinfo};
