import {StyleSheet} from 'react-native';
import Color from '../../styles/color.css';
import baseStyle from '../../styles/base.css';
import {proCSS} from '../../utils/widget';
import {Font} from '../../styles/base.css';
const rawJSON = {
    content:{
        padding: 20
    },
    updata:{
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        image:{
            width: "100%",
            height: 200,
            marginBottom: 30,
        },
        view:{
            padding: 10,
            justifyContent: "center",
            alignItems: "center"
        },
        camera:{
            borderColor: "lightgray",
            borderWidth: 1,
            width: 110,
            height:90,
            margin: 10,
        },
       submit:{
           width:"80%",
           margin:"10%",
           justifyContent: "center"
       }
    }
}

export default StyleSheet.create(proCSS(rawJSON));