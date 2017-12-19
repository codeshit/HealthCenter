import React from 'react';
import Component from '../../utils/BaseComponent';
import { View } from 'react-native';
import { Container, Content, Text, List, ListItem, Left, Body, Right, Icon } from 'native-base';
import R2Factory from '../../utils/R2Factory';
import style from './style.css';

class DataCenter extends Component {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <Container>
                {this.createHeader({
                    title: "医疗数据"
                })}
                <Content>
                    <List style={style.list}>
                        <ListItem icon>
                            <Left>
                                <Icon style={style.list_icon1} name="book" />
                            </Left>
                            <Body>
                                <Text>我的病例</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon onPress={e=>this.goto("BloodSugar")}>
                            <Left>
                                <Icon style={style.list_icon3} name="md-water" />
                            </Left>
                            <Body>
                                <Text>血糖信息</Text>
                            </Body>
                        </ListItem>

                    </List>
                    <List style={style.list} >
                        <ListItem icon onPress={e=>this.goto("Medication")}>
                            <Left>
                                <Icon style={style.list_icon2} name="md-medical" />
                            </Left>
                            <Body>
                                <Text>我的用药</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon onPress={e=>this.goto("BloodPressure")}>
                            <Left>
                                <Icon style={style.list_icon3} name="md-list" />
                            </Left>
                            <Body>
                                <Text>血压信息</Text>
                            </Body>
                        </ListItem>
                        
                    </List>
                </Content>
            </Container>
        )
    }
}

export default R2Factory.connect(DataCenter, {});