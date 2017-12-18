import React from 'react';
import Component from '../../utils/BaseComponent';
import { View } from 'react-native';
import { Container, Content, Text, Button } from 'native-base';
import R2Factory from '../../utils/R2Factory';
import style from './style.css';
import { Box } from '../Doctor/Doctor';
import { EasyTitle } from '../../utils/widget';


function LoadMore() {
    return (
        <View style={style.loadmore}>
            <Text style={style.loadmore_text}>点击加载更多</Text>
        </View>
    )
}

class Doctored extends Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        this.explain = raw => {
            return {
                ...raw,
                done: true
            }
        }
    }

    get data() {
        return {
            messages: [
                {
                    time: "2017.01.01 PM 12:30",
                    value: "必须每日吃药，直到死亡来临。",
                },
                {
                    time: "2017.01.01 PM 12:30",
                    value: "必须每日吃药，直到死亡来临。",
                },
                {
                    time: "2017.01.01 PM 12:30",
                    value: "必须每日吃药，直到死亡来临。",
                },
                {
                    time: "2017.01.01 PM 12:30",
                    value: "必须每日吃药，直到死亡来临。"
                },
                {
                    time: "2017.01.01 PM 12:30",
                    value: "必须每日吃药，直到死亡来临。"
                },
                {
                    time: "2017.01.01 PM 12:30",
                    value: "必须每日吃药，直到死亡来临。"
                },
                {
                    time: "2017.01.01 PM 12:30",
                    value: "必须每日吃药，直到死亡来临。"
                },
                {
                    time: "2017.01.01 PM 12:30",
                    value: "必须每日吃药，直到死亡来临。"
                },
                {
                    time: "2017.01.01 PM 12:30",
                    value: "必须每日吃药，直到死亡来临。"
                },
                {
                    time: "2017.01.01 PM 12:30",
                    value: "必须每日吃药，直到死亡来临。"
                }
            ]
        }
    }

    render() {
        let loadMore = null;
        if (this.data.messages.length >= 10) {
            loadMore = <LoadMore />
        }
        return (
            <Container>
                {this.createHeader({
                    title: "已完成医嘱"
                })}
                <Content>
                    <Box messages={this.data.messages} explain={this.explain} />
                    {loadMore}
                </Content>
            </Container>
        )
    }
}

export default R2Factory.connect(Doctored, {});