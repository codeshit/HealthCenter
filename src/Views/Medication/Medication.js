import React from 'react';
import { BaseView } from '../BloodPressure/BloodPressure';
import { View } from 'react-native';
import { Container, Content, Text } from 'native-base';
import R2Factory from '../../utils/R2Factory';
import style from './style.css';

class Medication extends BaseView {
     constructor(){
        super();
        this.state.datas = [
            {
                date: new Date(),
                data: "中午2点30分，饮敌敌畏一壶，微感不适。"
            }
        ]
    }

    get title() {
        return "用药"
    }

    get messageType(){
        return 1
    }
}

export default R2Factory.connect(Medication, {});