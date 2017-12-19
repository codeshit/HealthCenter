import React from 'react';
import { BaseView } from '../BloodPressure/BloodPressure';
import { View } from 'react-native';
import { Container, Content, Text } from 'native-base';
import R2Factory from '../../utils/R2Factory';
import style from './style.css';

class Medication extends BaseView {
    get title() {
        return "用药"
    }

    get messageType(){
        return 1
    }
}

export default R2Factory.connect(Medication, {});