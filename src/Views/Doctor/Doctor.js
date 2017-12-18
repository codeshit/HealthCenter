import React from 'react';
import Component from '../../utils/BaseComponent';
import { View, ListView } from 'react-native';
import { Container, Content, Text, Right, Icon, Left, Button, Footer, FooterTab } from 'native-base';
import R2Factory from '../../utils/R2Factory';
import style from './style.css';
import { EasyTitle } from '../../utils/widget';

const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });


function TagTitle({ name = "", value = "", color = style.tagtitle_blue, iStyle = { marginBottom: 0 } }) {
    return (
        <View style={[style.tagtitle_row, style.tagtitle_station, iStyle]}>
            <Text style={[style.tagtitle_ball, color]}>{name}</Text>
            <Text style={style.tagtitle_station_text}>{value}</Text>
        </View>
    )
}

function Tag(raw) {
    let data = null;
    if (!this || !this.dictionary) {
        data = { ...raw };
    } else {
        data = this.dictionary(raw);
    }

    const { time = "Time", value = "医嘱内容", doing = false, done = false } = data;
    return (
        <View>
            <TagTitle value={time} color={done ? style.tagtitle_blue : style.tagtitle_yellow} />
            <View style={style.tag}>
                <Left style={style.tag_left}>
                    <Text style={style.tag_text}>{doing ? `申请说明：${value}` : value}</Text>
                </Left>
                <Right style={style.tag_right}>
                    {done || doing ? null : (
                        <Button transparent >
                            <Icon style={style.tag_check} name="checkmark-circle" />
                        </Button>
                    )}
                </Right>
            </View>
        </View >
    )
}

export function Box({ messages = [], explain }) {
    const outputview = messages.length > 0 ?
        (<View style={style.box}>
            <View style={style.box_line} />
            <ListView dataSource={dataSource.cloneWithRows(messages)} renderRow={Tag.bind({ dictionary: explain })} />
            <TagTitle />
        </View>) : <EasyTitle title="没有查询到您的医嘱" />;

    return outputview;
}

class Doctor extends Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        this.explain = raw => {
            return raw;
        }
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

    doctored(e) {
        this.goto("Doctored")
    }

    doctoring(e) {
        this.goto("Doctoring")
    }

    apply(e) {
        this.goto("Apply")
    }

    render() {

        return (
            <Container>
                {this.createHeader({
                    title: "医嘱管理"
                })}
                <Content>
                    <Box messages={this.data.messages} explain={this.explain} />
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
                        <Button vertical active onPress={this.apply.bind(this)}>
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