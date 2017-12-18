import { StyleSheet } from 'react-native';
import Color from '../../styles/color.css';
import baseStyle from '../../styles/base.css';
import { proCSS } from '../../utils/widget';
import { Font } from '../../styles/base.css';
const rawJSON = {
    loadmore: {
        width: "100%",
        alignItems: "center",
        padding: 20,
        text:{
            color:'darkgray'
        }
    },

}

export default StyleSheet.create(proCSS(rawJSON));