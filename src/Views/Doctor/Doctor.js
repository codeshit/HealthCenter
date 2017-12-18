import React from 'react';
import Component from '../../utils/BaseComponent';
import { View } from 'react-native';
import { Container, Content, Text, Right, Icon, Left, Button, Footer, FooterTab } from 'native-base';
import R2Factory from '../../utils/R2Factory';
import style from './style.css';
import { EasyTitle } from '../../utils/widget';

function TagTitle({ name = "", value = "", color = style.tagtitle_blue, iStyle = { marginBottom: 0 } }) {
    return (
        <View style={[style.tagtitle_row, style.tagtitle_station, iStyle]}>
            <Text style={[style.tagtitle_ball, color]}>{name}</Text>
            <Text style={style.tagtitle_station_text}>{value}</Text>
        </View>
    )
}

function Tag(props) {
    const { time = "Time", value = "医嘱内容", done = false, doing = false } = props;
    return (
        <View>
            <TagTitle value={time} color={done? style.tagtitle_blue : style.tagtitle_yellow} />
            <View style={style.tag}>
                <Left style={style.tag_left}>
                    <Text style={style.tag_text}>{doing?`申请说明：${value}`:value}</Text>
                </Left>
                <Right style={style.tag_right}>
                    {done ? null : (
                        <Button transparent >
                        <Icon style={style.tag_check} name="checkmark-circle" />
                    </Button>
                )}
                </Right>
        </View>
        </View >
    )
}

export function Box({ messages = [], done = false, doing = false }) {
    const views = [];
    messages.forEach((value, index) => {
        const view = (<Tag time={value.time} key={index} value={value.value} done={done} doing={doing} />)
        views.push(view);
    })

    const outputview = views.length > 0 ?
        (<View style={style.box}>
            <View style={style.box_line} />
            {views}
            <TagTitle />
        </View>) : <EasyTitle title="没有查询到您的医嘱" />;

    return outputview;
}

class Doctor extends Component {
    static navigationOptions = {
        header: null
    }

    get data() {
        return {
            messages: [
                {
                    time: "2017.01.01 PM 12:30",
                    value: "必须每日吃药，直到死亡来临。"
                }
            ]
        }
    }

    doctored(e){
        this.goto("Doctored")
    }

    doctoring(e){
         this.goto("Doctoring")
    }

    render() {
        return (
            <Container>
                {this.createHeader({
                    title: "医嘱管理"
                })}
                <Content>
                    <Box messages={this.data.messages} />
                </Content>
                <Footer>
                    <FooterTab>
                        <Button vertical active onPress={this.doctored.bind(this)}>
                            <Icon name="md-done-all" />
                            <Text>已完成</Text>
                        </Button>
                        <Button vertical active onPress={this.doctoring.bind(this)}>
                            <Icon name="people" />
                            <Text>等待中</Text>
                        </Button>
                        <Button vertical active>
                            <Icon active name="send" />
                            <Text>申请医嘱</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}

export default R2Factory.connect(Doctor, {});