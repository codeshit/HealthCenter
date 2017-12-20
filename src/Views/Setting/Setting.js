import React from 'react';
import Component from '../../utils/BaseComponent';
import { View } from 'react-native';
import { Container, Content, Text, List, ListItem, Left, Icon, Body, Right, Toast, Title } from 'native-base';
import R2Factory from '../../utils/R2Factory';
import style from './style.css';
// const  RowModule = NativeModules.RowModule;
//       RowModule.alarm();NativeModules
class Setting extends Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        this.state = {
            username: null,
            age: null,
            sex: null
        }
    }

    componentWillMount() {
        const { user } = this.store;
        this.state.username = user.name;
        this.state.age = user.age;
        this.state.sex = user.sex == 1 ? "女" : "男";
    }

    aboutUs() {
        Toast.show({
            text: '欢迎使用健康平台!',
            position: 'bottom',
            buttonText: '确认'
        })
    }

    render() {
        return (
            <Container>
                {this.createHeader("设置中心")}
                <Content>
                    <List style={style.top}>
                        <ListItem>
                            <Title style={style.top_title}>{this.state.username}</Title>
                        </ListItem>
                        <ListItem>
                            <Text>年龄：{this.state.age}</Text>
                            <Right>
                                <Text>性别：{this.state.sex}</Text>
                            </Right>
                        </ListItem>
                    </List>
                    <List style={style.list}>
                        <ListItem icon onPress={this.aboutUs}>
                            <Left>
                                <Icon style={style.list_icon2} name="person" />
                            </Left>
                            <Body>
                                <Text>关于我们</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Icon style={style.list_icon3} name="log-out" />
                            </Left>
                            <Body>
                                <Text>退出系统</Text>
                            </Body>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }
}

export default R2Factory.connect(Setting, {});