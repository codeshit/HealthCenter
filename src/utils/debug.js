import { ToastAndroid } from "react-native";

export function webErr(err, value = "网络访问异常", time = ToastAndroid.SHORT, isThrow = false) {
  if(value)
    ToastAndroid.show(value, time);

  if(isThrow)
    throw new Error(value);
}

export function errFactory(fileName, fucName){
  return `"${funName}" has an error in ${fileName}.js`
}