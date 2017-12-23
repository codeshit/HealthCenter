import React from 'react';
import Component from '../../utils/BaseComponent';
import { View, TextInput, NativeModules } from 'react-native';
import { Container, Content, Item, Input, Button, ListItem, CheckBox, Text, Body } from 'native-base';
import R2Factory from '../../utils/R2Factory';
import style from './style.css';
import moment from 'moment';import { Footton } from '../Apply/Apply';
const RowModule = NativeModules.RowModule;

class Register extends Component {
    static navigationOptions = {
        header: null
    }

    static MAX_TIME = 30;
    constructor() {
        super();
        this.state = {
            userName: '',
            passWord: '',
            RepassWord: '',
            sex: 1,
            phoneNum: '',
            timeout: 0,
            age: '',
        };
        this.timer = null;
        this.lastCheckTime = null;
    }

    getCode() {
        this.clearTimer();
        this.lastCheckTime = moment();
        RowModule.show("验证码：3121", RowModule.LONG)
        this.checkTime();
    }

    checkTime() {
        const thas = this;
        const now = moment();
        const offTime = now.unix() - thas.lastCheckTime.unix();

        if (offTime >= Register.MAX_TIME) {
            this.clearTimer();
            this.setState(Object.assign({}, this.state))
            return false;
        }

        this.setState(Object.assign({}, this.state, { timeout: offTime }))
        this.timer = setTimeout(() => {
            thas.checkTime();
        }, 1000)
    }

    componentWillUnmount() {
        this.clearTimer();
    }

    clearTimer() {
        this.timer && clearTimeout(this.timer);
        this.lastCheckTime = null;
        this.timer = null;
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
    set sex(sex) {
        this.setState(Object.assign({}, this.state, { sex: sex }))
    }
    set age(num) {
        const reg = new RegExp("^[0-9]*$");
        if (!reg.test(num)) return false;
        this.setState(Object.assign({}, this.state, { age: num }))
    }
    ageChange(text) {
        this.age = text;
    }
    register() {
        for(name in this.state){
            if(name != 'sex' && name != 'timeout'){
                if(!this.state[name]){
                    RowModule.show("请填写完整信息！", RowModule.LONG);
                    return false;
                }
            }
        }

        if (this.state.passWord !== this.state.RepassWord) {
            RowModule.show("输入密码不一致！", RowModule.LONG);
            return false;
        }
        this.goto('Login');
    }

    render() {
        return (
            <Container>
                {this.createHeader({
                    title: "注册页面"
                })}
                <Content style={style.content}>
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
                            <CheckBox onPress={e => this.sex = 0} checked={this.state.sex == 0} />
                            <Body >
                                <Text >男</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ width: 80, backgroundColor: 'transparent' }}>
                            <CheckBox onPress={e => this.sex = 1} checked={this.state.sex == 1} />
                            <Body>
                                <Text >女</Text>
                            </Body>
                        </ListItem>
                    </Item>
                    <Item>
                        <Text> 年龄: </Text>
                        <Input value={this.state.age} onChangeText={this.ageChange.bind(this)} placeholder="请输入年龄" />
                    </Item>
                    <Item>
                        <Text> 手机: </Text>
                        <Input value={this.state.phoneNum} onChangeText={this.phoneNumChange.bind(this)} placeholder="请输入手机号" />

                    </Item>
                    <Item>
                        <Text> 验证码: </Text>
                        <Input placeholder={`请输入验证码`} />
                        <Button disabled={this.timer != null} onPress={this.getCode.bind(this)} block danger={this.timer == null}>
                            <Text>{this.timer != null ? `${Register.MAX_TIME - this.state.timeout}秒后重试` : "获取验证码"}</Text>
                        </Button>
                    </Item>
                   
                </Content>
                <Footton onPress={this.register.bind(this)} title='注册' />
            </Container>
        )
    }
}

export default R2Factory.connect(Register, {});