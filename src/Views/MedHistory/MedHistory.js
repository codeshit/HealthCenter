import React from 'react';
import { BaseView } from '../BloodPressure/BloodPressure';
import { View } from 'react-native';
import { Container, Content, Text } from 'native-base';
import R2Factory from '../../utils/R2Factory';
import style from './style.css';

class MedHistory extends BaseView {
     constructor(){
        super();
        this.state.datas = [
            {
                date: new Date(),
                data: "没有什么不好的！"
            }
        ]
    }

    get title() {
        return "病历"
    }

    get hasCamera(){
        return true;
    }

    get messageType(){
        return 1
    }
}

export default R2Factory.connect(MedHistory, {});