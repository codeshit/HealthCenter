import React from 'react';
import Component from '../../utils/BaseComponent';
import { View, ListView, Image, DatePickerAndroid, TextInput } from 'react-native';
import { Container, Content, Text, Badge, Drawer, Button, Form, Item, Input, Label, Title, Card, CardItem, Body } from 'native-base';
import R2Factory from '../../utils/R2Factory';
import style from './style.css';
import { Footton } from '../Apply/Apply';
import moment from 'moment';
import { EasyTitle } from '../../utils/widget';
import ImagePicker from 'react-native-image-picker';
const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
const options = {
    title: '选择照片来源',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '照相机', // 调取摄像头的按钮，可以设置为空使用户不可选择拍照
    chooseFromLibraryButtonTitle: '我的相册', // 调取相册的按钮，可以设置为空使用户不可选择相册照片
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
function Tag(raw) {
    let good = null;
    if (!this || !this.dictionary) {
        good = { ...raw };
    } else {
        good = this.dictionary(raw);
    }
    const { date, data } = good;
    const pec = data / this.max * 100;

    let view;
    const title = (new moment(date)).format('YYYY年MM月DD日');
    switch (this.type) {
        default:
            let msg = "";
            if (this.titles.length > 1) {
                this.titles.forEach(({ name }, index) => {
                    msg += `${name}:${data[index]}，`
                })
            } else {
                msg = data;
            }
            view = (
                <Card>
                    <CardItem header style={{ borderBottomWidth: 1, borderBottomColor: "lightgray" }}>
                        <Text>{title}</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>{msg}</Text>
                        </Body>
                    </CardItem>
                </Card>)
            break;
        case 0:
            view = (
                <View>
                    <Text>{title}</Text>
                    <Badge success={data < this.waring} style={{ width: `${pec}%` }}>
                        <Text>{data}</Text>
                    </Badge>
                </View>)
            break;
    }
    return view;
}

export function Box({ type, datas = [], explain, title, max, waring, dataTitle }) {
    const outputview = datas.length > 0 ? <ListView dataSource={dataSource.cloneWithRows(datas)} renderRow={Tag.bind({ type: type, dictionary: explain, max, waring, titles: dataTitle })} /> : <EasyTitle title={title} />;
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

function Updata({ dataTitle, type, data, dateAction, messageAction, updataAction, placeholder }) {

    let keyboardType;
    switch (type) {
        case 0:
            keyboardType = "numeric";
            break;
        default:
            keyboardType = "default";
            break;
    }

    const items = [];
    for (let i = 0; i < dataTitle.length; i += 1) {
        const item = (
            <Item key={i}>
                <Input multiline={true} keyboardType={dataTitle[i].keyboardType || keyboardType} onChangeText={text => messageAction(text, i)} value={data.message[i]} placeholder={dataTitle[i].placeholder || placeholder} />
            </Item>
        )
        items.push(item);
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
                {items}
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
                message: [],
                avatarSource: null,
            },
            datas: []
        }
    }

    get dataTitle() {
        return [{ name: "" }]
    }

    get dataMsg() {
        return [null]
    }

    openCamera() {

        ImagePicker.launchCamera(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        });
    }

    initUpdata() {
        this.setState(Object.assign({}, this.state, {
            updata: {
                date: new moment(new Date()), message: []
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
        this.state.datas.forEach(({ data }) => {
            if (data > this.max) {
                this.max = data;
            }
        }, this)
    }

    messageAction(text, index) {
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
        this.state.updata.message[index] = text;
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

    get waring() {
        return 0;
    }

    get placeholder() {
        return ''
    }

    render() {
        this.checkDatas();
        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={(
                    <Updata
                        dataTitle={this.dataTitle}
                        type={this.messageType}
                        updataAction={this.updataAction.bind(this)}
                        messageAction={this.messageAction.bind(this)}
                        placeholder={`请填写${this.title}数据`}
                        dateAction={this.dateAction.bind(this)}
                        data={this.state.updata} />
                )}
                onClose={this.closeDrawer.bind(this)} >
                <Container>
                    {this.createHeader({
                        title: `${this.title}数据`
                    })}
                    <Content style={style.content}>
                        <Box dataTitle={this.dataTitle} type={this.messageType} waring={this.waring} max={this.max} datas={this.state.datas} title={`尚未发现已有的${this.title}数据`} />
                    </Content>
                    <Footton onPress={this.openDrawer.bind(this)} title={`上传${this.title}数据`} />
                </Container>
            </Drawer>


        )
    }
}

class BloodPressure extends BaseView {
    constructor() {
        super();
        this.state.datas = [
            {
                date: new Date(),
                data: [100, 200]
            },
            {
                date: new Date(),
                data: [200, 100]
            },
        ]
    }

    get dataTitle() {
        return [
            {
                name: "收缩压",
                keyboardType: "numeric",
                placeholder: "请输入您的收缩压"
            },
            {
                name: "舒张压",
                keyboardType: "numeric",
                placeholder: "请输入您的舒张压"

            }]
    }

    get title() {
        return "血压"
    }

    get messageType() {
        return 1
    }
}

export default R2Factory.connect(BloodPressure, {});