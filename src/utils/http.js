import DeviceInfo from "react-native-device-info";
import { ToastAndroid } from "react-native";
import {webErr, errFactory} from "./debug";
import Ctrl from "./controller";
//13581704104
const url = "http://192.168.31.37:8080/"
//const url = "https://driver.xldrive.cn/";
//const url = "https://driver.dev.xldrive.cn/";
//const url = "http://192.168.201.146:8080/";
//const url = "http://192.168.31.37:8080/";
//"https://driver.dev.maskee.cn/";
//"https://driver.dev.maskee.cn/";
//http://192.168.31.37:8080/

function httpError(fucName){
  return errFactory("http", fucName);
}

function gotoLogin(){
  const routeCtrl = Ctrl.getRoute();
  if(routeCtrl){
    routeCtrl.goto("Login");
  }
}

export function Talk(msg) {
  ToastAndroid.show(msg, ToastAndroid.SHORT);
}

function post(type, data = {}, quiet=false) {
  return fetch(url + type, {
    method: "POST",
    headers: {
      credentials: "include",
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(res => {
    switch(res.status){
      case 401:
      case 403:
        if(!quiet){
          Talk("登录已过期，请重新登录。");
          gotoLogin();
        }
        return {code:403}

    }
    return res.json()
  });
}

function get(type, quiet=false) {
  return fetch(url + type, {
    method: "GET",
    headers: {
      credentials: "include",
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }).then(res => {
    switch(res.status){
      case 401:
      case 403:
        if(!quiet){
          Talk("登录已过期，请重新登录。");
          gotoLogin();
        }
        return {code:403}
    }
    return res.json();
  });
}

export function logout(){
  get("logout").then(json=>{
    switch(json.code){
      case 0:
        break;
      default:
        webErr("logout");
        break;
    }
  })
  .catch(err => {
    webErr(err);
  });
}

export function myAppointments(suc, page){
  bindTimeout(get(`appointments/${page}`),3000)
  .then(json => {
    switch (json.code) {
      case 403:
      break
      case 0:
        suc(json.data);
        break;
      default:
        throw new Error('Web Error!');
    }
    this();
  })
  .catch(err => {
    webErr(err);
    this();
  });
}

export function stopWaiting(suc) {
  post("drivers/current/stop_waiting")
    .then(json => {
      switch (json.code) {
        case 403:
        break
        case 0:
          suc();
          break;
        default:
          webErr(httpError('stopWaiting'));
          break;
      }
    })
    .catch(err => {
      webErr(err);
    });
}

export function waittingOrder(suc, final, id = false) {
  const who = typeof id == 'number' ? `?area_id=${id}` :''
  bindTimeout(post("drivers/current/waiting_order" + who),5000)
    .then(json => {
      switch (json.code) {
        case 403:
        break
        case 0:
          suc();
          break;
        default:
          throw new Error('Web Error!');
      }
      final();
    })
    .catch(err => {
      webErr(err);
      final();
    });
}

export function pathLocation(orgID, suc, final){
  get(`drivers/location/${orgID}`)
  .then(json=>{
    switch (json.code) {
      case 403:
      break
      case 0:
        suc(json.data);
        break;
      default:
        webErr(httpError('pathLocation'));
        break;
    }
    final();
  })
  .catch(err => {
    webErr(err);
    final();
  });
  
}

export function getDrivers(id, suc) {
  get(`drivers/for_order/${id}`)
    .then(json => {
      switch (json.code) {
        case 403:
        break
        case 0:
          suc(json.data);
          break;
        default:
          webErr(httpError('getDrivers'));
          break;
      }
    })
    .catch(err => {
      webErr(err);
    });
}

export function refreshArrivedOrders(suc){
  post('drivers/current/orders_assigned')
  .then(json=>{
    switch (json.code) {
      case 403:
      break
      case 0:
        suc(json.data);
        break;
      default:
        webErr(httpError('refreshArrivedOrders'));
        break;
    }
  })
  .catch(err => {
    webErr(err);
  });
}

export function confirmOrder(id, suc){
  post(`orders/${id}/confirm`)
  .then(json => {
    switch (json.code) {
      case 403:
      break
      case 0:
        suc();
        break;
      case 1:
        ToastAndroid.show(json.message, ToastAndroid.SHORT);
        break;
      default:
        webErr(httpError('confirmOrder'));
        break;
    }
  })
  .catch(err => {
    webErr(err);
  });
}

export function assignOrder(id, dirverID, suc) {
  post(`orders/${id}/assign`, { driver_id: dirverID })
    .then(json => {
      switch (json.code) {
        case 403:
        break
        case 0:
          suc();
          break;
        case 1:
          ToastAndroid.show(json.message, ToastAndroid.SHORT);
          break;
        default:
          webErr(httpError('assignOrder'));
          break;
      }
    })
    .catch(err => {
      webErr(err);
    });
}

export function getWallet(suc){
  bindTimeout(get('wallets/myWallet'),3000)
  .then(json => {
    suc(json);
    if(typeof this == 'function') this();
  })
  .catch(err => {
    webErr(err);
    if(typeof this == 'function') this();
  });
}

export function acceptOrder(id, suc) {
  post(`orders/${id}/accept`)
    .then(json => {
      switch (json.code) {
        case 403:
        break
        case 0:
          suc(json.data.order.order_type);
          break;
        case 1:
          ToastAndroid.show(json.message, ToastAndroid.SHORT);
          suc();
          break;
        default:
          webErr(httpError('acceptOrder'));
          break;
      }
    })
    .catch(err => {
      webErr(err);
    });
}

export function rejectOrder(id, msg, suc) {
  post(`orders/${id}/reject`,{ message: msg })
    .then(json => {
      switch (json.code) {
        case 403:
        break
        case 0:
          suc();
          break;
        case 1:
          ToastAndroid.show(json.message, ToastAndroid.SHORT);
          suc();
          break;
        default:
          webErr(httpError('rejectOrder'));
          break;
      }
    })
    .catch(err => {
      webErr(err);
    });
}

export function refundOrder(id, suc) {
  post(`orders/${id}/refund`)
    .then(json => {
      switch (json.code) {
        case 403:
        break
        case 0:
          suc();
          break;
        default:
          webErr(httpError('refundOrder'));
          break;
      }
    })
    .catch(err => {
      webErr(err);
    });
}

export function updataLoacation(data, suc = data => false) {
  post("drivers/current/location", data)
    .then(json => {
    
      switch (json.code) {
        case 403:
        break
        case 0  :
          suc(json.data);
          break;
        default:
          webErr(httpError('updataLoacation'));
          break;
      }
    })
    .catch(err => {
      webErr(err);
    });
}

export function getNowStatus(suc) {
  get("status")
    .then(json => {
      switch (json.code) {
        case 403:
        break
        case 0:
          suc(json);
          break;
        default:
          break;
      }
    })
    .catch(err => {
      webErr(err);
    });
}

export function getAssignedOrders(suc){
  get("orders/assigned")
  .then(json=>{
    switch(json.code){
      case 403:
      break
      case 0:
        suc(json.data);
        break;
      default:
        webErr(httpError('getAssignedOrders'));
    }
  })
  .catch(err => {
    webErr(err);
  });
}

export function getAssignedAppointments(suc) {
  get("appointments/assigned")
    .then(json => {
      switch (json.code) {
        case 403:
        break
        case 0:
          const group = {};
          json.data.forEach(appointments => {
            const line = appointments.drivingLine;
            if (!line) return;
            const lineName = `${line.city_from}-${line.city_to}`;
            if (!group[lineName]) {
              group[lineName] = [];
            }
            group[lineName].push(appointments);
          });
          suc(group);
          break;
        default:
          webErr(httpError('getAssignedAppointments'));
          break;
      }
    })
    .catch(err => {
      webErr(err);
    });
}

export function getRawOrders(suc) {
  get("orders/not_assigned")
    .then(json => {
      switch (json.code) {
        case 403:
        break
        case 0:
          suc(json.data);
          break;
        default:
          throw new Error('Web Error!');
      }
      if(typeof this == 'function') this();
    })
    .catch(err => {
      webErr(err);
      if(typeof this == 'function') this();
    });
}

export function endTravel(id, suc) {
  post(`appointments/${id}/close`)
    .then(json => {
      switch (json.code) {
        case 403:
        break
        case 0:
          suc();
          break;
        default:
          webErr(httpError('endTravel'));
          break;
      }
    })
    .catch(err => {
      webErr(err);
    });
}

export async function resetPassword(phone, code, password, newpassword) {
  if (!phone) {
    Talk("手机号码不能为空!");
    return;
  } else if (!code) {
    Talk("请输入验证码!");
    return;
  } else if (!/^1[34578]\d{9}$/.test(phone)) {
    ToastAndroid.show("手机号格式错误!", ToastAndroid.SHORT);
    return;
  } else if (!/^\d{4}$/.test(code)) {
    Talk("请输入正确的验证码!");
    return;
  } else if (!password || !newpassword) {
    Talk("密码或确认密码不能为空!");
    return;
  } else if (password.length < 6 || newpassword.length < 6) {
    Talk("密码不能少于6位");
    return;
  } else if (
    !/^[a-zA-Z0-9]{6,12}$/.test(password) ||
    !/^[a-zA-Z0-9]{6,12}$/.test(newpassword)
  ) {
    Talk("密码格式错误");
    return;
  } else if (password !== newpassword) {
    Talk("两次输入的密码不一致，请重新输入");
    return;
  }
  return await post("changePassword", {
    phone_number: phone,
    verify_code: code,
    password: password
  }).then(json => {
    switch (json.code) {
      case 403:
        break
      case 0: {
        Talk("密码修改成功");
        return true;
      }
      case 1: {
        if (json.message === "通过手机号未能找到司机") {
          Talk("通过手机号未能找到司机");
        } else {
          Talk("验证码错误");
        }
        return false;
      }
    }
  });
}

export function loginByPassword({ phone, password, suc, final }) {
  if (!phone || !password) {
    Talk("电话号码或密码为空");
    final();
    return false;
  }
  bindTimeout(
    post("login", {
      phone_number: phone,
      password: password
    }),
    5000
  )
    .then(json => {
      switch (json.code) {
        case 403:
          break
        case 0:
          suc(json.data);
          break;
        case 1:
          Talk("错误的密码或电话");
          break;
        default:
          break;
      }
      final();
    })
    .catch(err => {
      webErr(err);
      final();
    });
}

export function bindTimeout(promise, time) {
  let timeout_fn = null;
  const timeout_promise = new Promise((res, rej) => {
    timeout_fn = () => {
      rej("网络连接超时");
    };
  });

  const merge_promise = Promise.race([promise, timeout_promise]);
  setTimeout(timeout_fn, time);
  return merge_promise;
}

export function getDriver(suc, error) {
  bindTimeout(get("drivers/now", true), 5000)
    .then(json => {
      switch (json.code) {
        case 403:
          gotoLogin();        
          break;
        case 0:
          suc(json.data);
          break;
        default:
          break;
      }
    })
    .catch(err => {
      gotoLogin();
    });
}

export function getLoginCode(phone, sendType, err) {
  if (!/^1[34578]\d{9}$/.test(phone)) {
    ToastAndroid.show("手机号格式错误!", ToastAndroid.SHORT);
    err();
    return;
  }

  let timeout_fn = null;
  const post_promise = post("sms_code", {
    phone_number: phone,
    // send_type: "login"
    send_type: sendType
  });
  const timeout_promise = new Promise((res, rej) => {
    timeout_fn = () => {
      rej("警告！警告！超时警告！");
    };
  });

  const merge_promise = Promise.race([post_promise, timeout_promise]);
  setTimeout(() => {
    timeout_fn();
  }, 5000);

  merge_promise
    .then(json => {
      switch (json.code) {
        case 403:
        break
        case 0:
          const code = json.data || "";
          ToastAndroid.show(`验证码已发送!${code}`, ToastAndroid.LONG);
          err(code);
          break;
        default:
          Talk("发送失败");
          err();
          break;
      }
    })
    .catch(error => {
      err();
      Talk("发送失败，请检查您的网络连接。");
    });
}

export default {
  loginByPassword,
  updataLoacation,
  getNowStatus,
  getRawOrders,
  getAssignedAppointments,
  stopWaiting,
  endTravel,
  acceptOrder,
  rejectOrder,
  getDrivers,
  getDriver,
  waittingOrder,
  getWallet,
  myAppointments,
  refundOrder,
  getAssignedOrders,
  assignOrder,
  refreshArrivedOrders,
  confirmOrder,
  pathLocation,
  logout
};
