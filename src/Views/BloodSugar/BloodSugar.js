import React from 'react';
import { BaseView } from '../BloodPressure/BloodPressure';
import { View } from 'react-native';
import { Container, Content, Text } from 'native-base';
import R2Factory from '../../utils/R2Factory';
import style from './style.css';

class BloodSugar extends BaseView {
    get title() {
        return "血糖"
    }

    get waring(){
        return 7.0
    }
}

export default R2Factory.connect(BloodSugar, {});