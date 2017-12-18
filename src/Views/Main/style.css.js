import { StyleSheet } from 'react-native';
import Color from '../../styles/color.css';
import {Font} from '../../styles/base.css';
import { proCSS } from '../../utils/widget';


const rawJSON = {
    content: {
        view: {
            row: {
                flexDirection: "row"
            },
        }
    },
    card: {
        marginTop: 60,
        paddingBottom: 10,
        alignItems: "center",
        width: "50%",
        text:{
            color: Color.dark,
            fontSize: Font.h1
        }
    }
}

export default StyleSheet.create(proCSS(rawJSON));