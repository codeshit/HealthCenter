import React from 'react';
import Component from '../../utils/BaseComponent';
import { View, ListView, Image, DatePickerAndroid, TextInput } from 'react-native';
import { Container, Content, Text, Badge, Drawer, Button, Form, Item, Input, Label, Title, Card, CardItem, Body } from 'native-base';
import R2Factory from '../../utils/R2Factory';
import style from './style.css';
import { Footton } from '../Apply/Apply';
import moment from 'moment';
const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });

function Tag(raw) {
    let good = null;
    if (!this || !this.dictionary) {
        good = { ...raw };
    } else {
        good = this.dictionary(raw);
    }
    const { date = "Time", data = 0 } = good;
    const pec = data / this.max * 100;

    let view;
    switch (this.type) {
        default:
            view = (
                <Card>
                    <CardItem header style={{ borderBottomWidth: 1, borderBottomColor: "lightgray" }}>
                        <Text>{date}</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>{data}</Text>
                        </Body>
                    </CardItem>
                </Card>)
            break;
        case 0:
            view = (
                <View>
                    <Text>{date}</Text>
                    <Badge success={data < this.waring} style={{ width: `${pec}%` }}>
                        <Text>{data}</Text>
                    </Badge>
                </View>)
            break;
    }
    return view;
}

export function Box({ type, datas = [], explain, title, max, waring }) {
    const outputview = datas.length > 0 ? <ListView dataSource={dataSource.cloneWithRows(datas)} renderRow={Tag.bind({ type: type, dictionary: explain, max, waring })} /> : <EasyTitle title={title} />;
    return outputview;
}

async function openPicker(date, reSuc) {
    const now = date.format('X') * 1000;
    try {
        const { action, year, month, day } = await DatePickerAndroid.open({
            date: now,
            maxDate: new Date()
        });
        if (action !== DatePickerAndroid.dismissedAction) {
            reSuc(year, month, day);
        }
    } catch ({ code, message }) {
        console.warn('Cannot open date picker', message);
    }
}

function Updata({ type, data, dateAction, messageAction, updataAction, placeholder }) {

    let keyboardType;
    switch (type) {
        case 0:
            keyboardType = "numeric";
            break;
        default:
            keyboardType = "default";
            break;
    }
    return (
        <View style={style.updata}>
            <Image style={style.updata_image} source={require('../../../res/image/updata.png')} />
            <Form>
                <Item stackedLabel>
                    <Label>检查日期</Label>
                    <Button large transparent onPress={e => { openPicker(data.date, dateAction) }}>
                        <Text>{data.date.format("YYYY-MM-DD")}</Text>
                    </Button>
                </Item>
                <Item>
                    <Input multiline={true} keyboardType={keyboardType} onChangeText={messageAction} value={data.message + ''} placeholder={placeholder} />
                </Item>
                <Button rounded onPress={updataAction} danger style={style.updata_submit}>
                    <Title>提交数据</Title>
                </Button>
            </Form>

        </View>
    )
}

export class BaseView extends Component {
    static navigationOptions = {
        header: null
    }

    get messageType() {
        // Number 0, Text 1, Image 2
        return 0;
    }

    get title() {
        return "类别"
    }

    constructor() {
        super();
        this.state = {
            updata: {
                date: new moment(new Date()),
                message: "",
            },
            blooddatas: [{
                date: "2017.01.02",
                data: 120
            },
            {
                date: "2017.01.02",
                data: 190
            }]
        }
    }

    initUpdata() {
        this.setState(Object.assign({}, this.state, {
            updata: {
                date: new moment(new Date()), message: ""
            }
        }))
    }

    get max() {
        if (!this._max) return 0;
        return this._max;
    }

    set max(num) {
        this._max = num;
    }

    checkDatas() {
        this.state.blooddatas.forEach(({ data }) => {
            if (data > this.max) {
                this.max = data;
            }
        }, this)
    }

    messageAction(text) {
        switch (this.messageType) {
            case 0:
                const reg = new RegExp("^[0-9]*$");
                if (!reg.test(text)) {
                    return false;
                }
                break;
            case 1:
                break;
            case 2:
                break;
        }

        this.state.updata.message = text;
        this.setState(Object.assign({}, this.state))
    }

    dateAction(year, month, day) {
        const dateStr = `${year}-${month + 1}-${day}`;
        this.state.updata.date = new moment(dateStr);
        this.setState(Object.assign({}, this.state))
    }

    updataAction() {
        alert(JSON.stringify(this.state.updata));
        this.closeDrawer();
    }

    closeDrawer() {
        if (!this.drawer) return;
        this.drawer._root.close();
    }

    openDrawer() {
        if (!this.drawer) return;
        this.initUpdata();

        this.drawer._root.open()
    }

    get waring(){
        return 0;
    }

    render() {
        this.checkDatas();
        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={(
                    <Updata
                        type={this.messageType}
                        updataAction={this.updataAction.bind(this)}
                        messageAction={this.messageAction.bind(this)}
                        placeholder={`请填写${this.title}数值`}
                        dateAction={this.dateAction.bind(this)}
                        data={this.state.updata} />
                )}
                onClose={this.closeDrawer.bind(this)} >
                <Container>
                    {this.createHeader({
                        title: `${this.title}数据`
                    })}
                    <Content style={style.content}>
                        <Box type={this.messageType} waring={this.waring} max={this.max} datas={this.state.blooddatas} title={`尚未发现已有的${this.title}数据`} />
                    </Content>
                    <Footton onPress={this.openDrawer.bind(this)} title={`上传${this.title}数据`} />
                </Container>
            </Drawer>


        )
    }
}

class BloodPressure extends BaseView {
    get title() {
        return "血压"
    }

    get waring(){
        return 140
    }
}

export default R2Factory.connect(BloodPressure, {});