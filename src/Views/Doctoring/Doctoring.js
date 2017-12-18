import React from 'react';
import Component from '../../utils/BaseComponent';
import { View } from 'react-native';
import { Container, Content, Text } from 'native-base';
import R2Factory from '../../utils/R2Factory';
import style from './style.css';
import { Box } from '../Doctor/Doctor';

class Doctoring extends Component {
    static navigationOptions = {
        header: null
    }

    get data() {
        return {
            messages: [
                {
                    time: "2017.01.01 PM 12:30",
                    value: "腹如刀绞，疼痛难忍。"
                }
            ]
        }
    }

    render() {
        return (
            <Container>
                 {this.createHeader({
                    title: "申请中的医嘱"
                })}
                <Content>
                     <Box messages={this.data.messages} done={true} doing={true} />
                </Content>
            </Container>
        )
    }
}

export default R2Factory.connect(Doctoring, {});