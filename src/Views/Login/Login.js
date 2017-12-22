import React from 'react';
import Component from '../../utils/BaseComponent';
import { TextInput, View, Image } from 'react-native';
import { Container, Content, Text, Button } from 'native-base';
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
        this.setState(Object.assign({}, this.state, { phone: num }))
    }
    phoneChange(text) {
        this.phone = text;        
    }

    login() {
        // 服务器 请求 成功 回调
        alert(this.state.phone);
        //this.goto("Main");
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
                <Content >
                    <View style={style.container}>
                        <Image style={style.container_logImage} source={require('../../../res/image/login.jpg')} />
                        <TextInput value={this.state.phone} onChangeText={this.phoneChange.bind(this)} style={[style.container_textinput, style.container_hightMargin]} placeholder='手机号' underlineColorAndroid={'transparent'} />
                        <TextInput style={style.container_textinput} placeholder='密码' underlineColorAndroid={'transparent'} secureTextEntry={true} />
                        <View style={style.container_btnStyle}>
                            <Button style={style.container_btnStyle_regBtn} danger onPress={this.register.bind(this)}><Text> 注册 </Text></Button>
                            <Button style={style.container_btnStyle_logBtn} primary onPress={this.login.bind(this)}><Text> 登录 </Text></Button>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}

export default R2Factory.connect(Login, {});