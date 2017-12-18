import { StyleSheet } from 'react-native';
import Color from '../../styles/color.css';
import baseStyle from '../../styles/base.css';
import { proCSS } from '../../utils/widget';
import {Font} from '../../styles/base.css';
const rawJSON = {
    box: {
        paddingLeft: 13,
        marginTop: 20,
        minHeight: 10,
        line: {
            position: "absolute",
            borderColor: "lightblue",
            borderLeftWidth: 1,
            width: "100%",
            height: "100%",
            marginLeft: 20
        },
    },
    tagtitle: {
        row: {
            flexDirection: "row",
        },
        station: {
            marginBottom: 20,
            text: {
                color: Color.dark,
                fontSize: Font.h3,
            }
        },
        ball: {
            color: 'white',
            height: 16,
            width: 16,
            borderRadius: 9,
            fontSize: 14,
            textAlign: 'center',
            marginRight: 15,
        },
        yellow: {
            backgroundColor: Color.yellow,
        },
        blue: {
            backgroundColor: "blueviolet",
        }
    },
    tag:{
        minHeight: 50,
        marginBottom: 20,
        paddingLeft: 40,
        paddingRight: 20,
        flexDirection: "row",
        text:{
            fontSize: Font.h4,
            color:"gray"
        },
        check:{
            color: "blueviolet"
        },
        left:{
            flex:6
        },
        right:{
            flex: 1
        }
    }
}

export default StyleSheet.create(proCSS(rawJSON));