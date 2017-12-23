import React from 'react';
import Component from '../../utils/BaseComponent';
import { TextInput, View, Image } from 'react-native';
import { Container, Content, Text, Button, Input, Icon, Item } from 'native-base';
import R2Factory from '../../utils/R2Factory';
import style from './style.css';


class Login extends Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        this.state = {
            phone: "",
            password: ""
        };
    }

    set phone(num) {
        //电话校验
        const reg = new RegExp("^[0-9]*$");
        if (!reg.test(num)) return false;

        this.setState(Object.assign({}, this.state, { phone: num }));
    }
    phoneChange(text) {
        this.phone = text;
    }
    set password(str) {
        this.setState(Object.assign({}, this.state, { password: str }));
    }
    passwordChange(str) {
        this.password = str;
    }
    login() {
        // 服务器 请求 成功 回调
        //alert(this.state.phone);
        this.goto("Main");
    }

    register() {
        this.goto("Register")
    }


    render() {
        return (
            <Container>
                {this.createHeader({
                    title: "登录页面",
                    leftBtn: false,
                })}
                <Content>
                    <View style={style.container}>
                        <Item style={style.container_textinput}>
                            <Icon style={style.container_icon} active name='person' />
                            <Input maxLength={11} value={this.state.phone} onChangeText={this.phoneChange.bind(this)} placeholder='手机号' />
                        </Item>
                        <Item style={style.container_textinput}>
                            <Icon style={style.container_icon} active name='lock' />
                            <Input value={this.state.password} onChangeText={this.passwordChange.bind(this)} placeholder='密码' secureTextEntry={true} />
                        </Item>
                        <View style={style.container_btnStyle}>
                            <Button rounded style={style.container_btnStyle_regBtn} danger onPress={this.register.bind(this)}><Text> 注册 </Text></Button>
                            <Button rounded style={style.container_btnStyle_logBtn} success onPress={this.login.bind(this)}><Text> 登录 </Text></Button>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}

export default R2Factory.connect(Login, {});