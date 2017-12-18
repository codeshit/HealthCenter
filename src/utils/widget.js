import React, { Component } from "react";
import { StyleSheet, View, Text, Linking } from "react-native";
import { ToastAndroid } from "react-native";
const styles = StyleSheet.create({
  title_line: {
    borderTopWidth: 0.8,
    borderColor: "lightgray",
    width: 30,
    margin: 10
  },
  title: {
    marginTop: 20,
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 20
  }
});
export function EasyTitle({ title = "标题" }) {
  return (
    <View style={styles.title}>
      <View style={styles.title_line} />
      <Text style={{ color: "gray" }}>{title}</Text>
      <View style={styles.title_line} />
    </View>
  );
}

function correct(value) {
  if (typeof value === "number") {
    if (value > 2) return value - 2;
  }
  return value;
}

export function proCSS(json, raw = {}, fatherName = null) {
  for (name in json) {
    let value = json[name];
    if (typeof value != "object") {
      value = correct(value);

      if (fatherName) raw[fatherName][name] = value;
      else raw[name] = value;
    } else {
      let id = null;
      if (!fatherName) id = `${name}`;
      else id = `${fatherName}_${name}`;

      raw[id] = {};

      proCSS(value, raw, id);
    }
  }

  return raw;
}

export function extendCSS(family, son, broken) {
  const treeSon = son.split("_");
  const result = [];
  A: for (name in family) {
    const treeNow = name.split("_");
    for (const i = 0; i < treeNow.length; i += 1) {
      if (treeNow[i] != treeSon[i]) continue A;
    }
    result.push(family[name]);
  }

  if (broken) {
    return result.slice(result.length - broken - 1);
  }

  return result;
}

export function gaodeMap(lat, lon, poiname){
    const url = `androidamap://viewMap?sourceApplication=xlindriver&poiname=${poiname}&lat=${lat}&lon=${lon}&dev=0`
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        ToastAndroid.show('安装或更新您的高德地图。', ToastAndroid.SHORT);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => ToastAndroid('安装或更新您的高德地图。'));
}