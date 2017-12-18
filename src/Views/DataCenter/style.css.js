import {StyleSheet} from 'react-native';
import Color from '../../styles/color.css';
import baseStyle from '../../styles/base.css';
import {proCSS} from '../../utils/widget';
import {Font} from '../../styles/base.css';
const rawJSON = {
    list:{
        backgroundColor: "white",
        marginTop: 20,
        icon1:{
            color: "rgb(76,218,100)"
        },
        icon2:{
            color: "rgb(0,122,255)"
        },
        icon3:{
            color: "rgb(253,60,45)"
        },
         icon3:{
            color: "rgb(253,60,45)"
        }
    }
}

export default StyleSheet.create(proCSS(rawJSON));