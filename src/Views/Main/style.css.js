import { StyleSheet } from 'react-native';
import Color from '../../styles/color.css';
import { Font } from '../../styles/base.css';
import { proCSS } from '../../utils/widget';


const rawJSON = {
    content: {
        paddingTop: 40,
        view: {
            row: {
                flexDirection: "row"
            },
        }
    },
    card: {
        padding: 10,
        width: "50%",
        text: {
            color: Color.dark,
            fontSize: Font.h1
        },
        view: {
            borderRadius: 10,
            backgroundColor: "white",
            alignItems: "center",
            width: "100%",
            padding: 20,
        }
    }
}

export default StyleSheet.create(proCSS(rawJSON));