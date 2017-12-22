import React from 'react';
import Component from '../../utils/BaseComponent';
import { View, TextInput } from 'react-native';
import { Container, Content, Item, Input, Button, ListItem, CheckBox, Text, Body } from 'native-base';
import R2Factory from '../../utils/R2Factory';
import style from './style.css';

class Register extends Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super();
        this.state = {
            userName: '',
            passWord: '',
            RepassWord: '',
            sex: '',
            phoneNum: '',
        };
    }
    set userName(str) {
        this.setState(Object.assign({}, this.state, { userName: str }))
    }

    nameChange(text) {
        this.userName = text;

    }
    set passWord(str) {
        this.setState(Object.assign({}, this.state, { passWord: str }))
    }

    passwordChange(text) {
        this.passWord = text;

    }
    set RepassWord(str) {
        this.setState(Object.assign({}, this.state, { RepassWord: str }))
    }

    repasswordChange(text) {
        this.RepassWord = text;

    }
    set phoneNum(num) {
        this.setState(Object.assign({}, this.state, { phoneNum: num }))
    }

    phoneNumChange(text) {
        this.phoneNum = text;

    }
    register() {
        if(this.state.passWord!==this.state.RepassWord){
            alert('error')
        }
        alert(this.state.userName);
        alert(this.state.passWord);
        alert(this.state.RepassWord);
        alert(this.state.phoneNum);
    }
    render() {
        return (
            <Container>
                {this.createHeader({
                    title: "注册页面",
                    leftBtn: false,
                })}
                <Content>
                    <Item>
                        <Text> 姓名: </Text>
                        <Input value={this.state.userName} onChangeText={this.nameChange.bind(this)} placeholder="请输入姓名" />
                    </Item>
                    <Item>
                        <Text> 密码: </Text>
                        <Input value={this.state.passWord} onChangeText={this.passwordChange.bind(this)} placeholder="请输入密码" secureTextEntry={true} />
                    </Item>
                    <Item>
                        <Text> 确认密码: </Text>
                        <Input value={this.state.RepassWord} onChangeText={this.repasswordChange.bind(this)} placeholder="请再次输入密码" secureTextEntry={true} />
                    </Item>
                    <Item>
                        <Text> 性别: </Text>
                        <ListItem style={{ width: 80, backgroundColor: 'transparent' }}>
                            <CheckBox checked={false} />
                            <Body >
                                <Text >男</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ width: 80, backgroundColor: 'transparent' }}>
                            <CheckBox checked={true} />
                            <Body>
                                <Text >女</Text>
                            </Body>
                        </ListItem>
                    </Item>
                    <Item>
                        <Text> 手机: </Text>
                        <Input value={this.state.phoneNum} onChangeText={this.phoneNumChange.bind(this)} placeholder="请输入手机号" />
                        
                    </Item>
                    <Item>
                        <Text> 验证码: </Text>
                        <Input placeholder="请输入验证码" />
                        <Button block success>
                        <Text>获取验证码</Text>
                        </Button>
                    </Item>
                    <Button onPress={this.register.bind(this)} style={{ marginTop: 40, }} block success>
                        <Text>注册</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

export default R2Factory.connect(Register, {});