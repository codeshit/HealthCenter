import React from 'react';
import Component from '../../utils/BaseComponent';
import { View, TouchableHighlight, NativeModules } from 'react-native';
import { Container, Content, Text, Icon } from 'native-base';
import R2Factory from '../../utils/R2Factory';
import style from './style.css';
import { initRouteController } from '../../utils/controller';
const RowModule = NativeModules.RowModule;
//       RowModule.alarm();NativeModules
function Card(props) {
    const { icon = "people", color = "red", title = "Title", onPress = e => false } = props;
    return (
        <TouchableHighlight underlayColor={'rgba(0,0,255,.2)'} onPress={onPress} style={style.card}>
            <View style={style.card_view}>
                <Icon name={icon} style={{ color: color, fontSize: 110 }} />
                <Text style={style.card_text}>{title}</Text>
            </View>
        </TouchableHighlight>
    )
}

class Main extends Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        initRouteController(this);
    }

    render() {
        return (
            <Container>
                {this.createHeader({
                    title: "健康平台",
                    leftBtn: false,
                })}
                <Content style={style.content}>
                    <View style={style.content_view_row}>
                        <Card onPress={e => { this.goto("Doctor") }} icon="heart" title="医嘱管理" color="rgb(253,60,45)" />
                        <Card onPress={e => { this.goto("DataCenter") }} icon="list-box" title="医疗数据" color="rgb(76,218,100)" />
                    </View>
                    <View style={style.content_view_row}>
                        <Card onPress={e => { RowModule.alarm() }} icon="time" title="我的提醒" color="rgb(0,162,232)" />
                        <Card onPress={e => { this.goto("Setting") }} icon="ios-settings" title="设置系统" color="gray" />
                    </View>
                </Content>
            </Container>
        )
    }
}

export default R2Factory.connect(Main, {});