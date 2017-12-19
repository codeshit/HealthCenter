import React from 'react';
import Component from '../../utils/BaseComponent';
import { View } from 'react-native';
import { Container, Content, Title, Text, Form, Button, ListItem, InputGroup, Input, Footer, CheckBox, Item, Label } from 'native-base';
import R2Factory from '../../utils/R2Factory';
import style from './style.css';
import Color from '../../styles/color.css';


export function Footton({onPress, title}) {
    return (
        <Footer>
            <Button danger full style={style.foot_button} onPress={onPress}>
                <Title>{title}</Title>
            </Button>
        </Footer>
    )
}


class Apply extends Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        this.state = {
            name: "UU妹",
            sex: 1,
            message: ""
        }
    }

    set sex(type) {
        this.setState(Object.assign({}, this.state, { sex: type }))
    }

    set message(text) {
        this.setState(Object.assign({}, this.state, { text: text }))
    }

    set name(name) {
        this.setState(Object.assign({}, this.state, { name: name }))
    }

    push() {
        this.goBack();
    }

    render() {
        const sex = this.state.sex == 0;
        return (
            <Container>
                {this.createHeader({
                    title: "申请医嘱"
                })}
                <Content style={style.content}>
                    <Form>
                        <Item>
                            <Label>姓名:</Label>
                            <Input onChangeText={text => { this.name = text }} placeholder="请输入您的姓名" value={this.state.name} />
                        </Item>
                        <ListItem>
                            <Text>男</Text>
                            <InputGroup>
                                <CheckBox checked={sex} onPress={e => { this.sex = 0 }} />
                            </InputGroup>
                            <Text>女</Text>
                            <InputGroup>
                                <CheckBox checked={!sex} onPress={e => { this.sex = 1 }} />
                            </InputGroup>
                        </ListItem>
                        <Item stackedLabel>
                            <Label>病情简介</Label>
                            <Input placeholder="请输入您的概况" onChangeText={text => { this.message = text }} multiline={true} value={this.state.text} />
                        </Item>
                    </Form>
                </Content>
                <Footton onPress={this.push.bind(this)} title="提交申请"/>
            </Container>
        )
    }
}

export default R2Factory.connect(Apply, {});