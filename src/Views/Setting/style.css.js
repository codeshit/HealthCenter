import {StyleSheet} from 'react-native';
import Color from '../../styles/color.css';
import baseStyle from '../../styles/base.css';
import {proCSS} from '../../utils/widget';
import {Font} from '../../styles/base.css';
import listStyle from '../../styles/list.css';
const rawJSON = {
    ...listStyle,
    top:{
        backgroundColor: "white",
        title:{
            color:Color.dark
        }
    }
}

export default StyleSheet.create(proCSS(rawJSON));