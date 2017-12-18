import { StyleSheet } from 'react-native';
import Color from '../../styles/color.css';
import baseStyle from '../../styles/base.css';
import { proCSS } from '../../utils/widget';
import {Font} from '../../styles/base.css';
const rawJSON = {
    content:{
        backgroundColor: "white",
        checkBox:{
            text:{
                marginLeft: 40,
            }
        }
    },
    foot:{
        button:{
            width: "100%",
            height: "100%",
        }
    }
}

export default StyleSheet.create(proCSS(rawJSON));