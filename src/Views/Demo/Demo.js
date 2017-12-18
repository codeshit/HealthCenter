import React from 'react';
import Component from '../../utils/BaseComponent';
import { View } from 'react-native';
import { Container, Content, Text } from 'native-base';
import R2Factory from '../../utils/R2Factory';
import style from './style.css';

class Demo extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <Text>Demo</Text>
                </Content>
            </Container>
        )
    }
}

export default R2Factory.connect(Demo, {});