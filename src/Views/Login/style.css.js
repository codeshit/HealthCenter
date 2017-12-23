import { StyleSheet } from 'react-native';
import Color from '../../styles/color.css';
import baseStyle from '../../styles/base.css';
import { proCSS } from '../../utils/widget';
import { Font } from '../../styles/base.css';
const rawJSON = {
    
    container: {        
        margin: 50,
        marginTop:125, 
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        logImage: {
            width: 200,
            height: 150,
        },
        btnStyle:{
            marginTop:40,            
            flexDirection:'row',
            logBtn:{
                padding:10,
                marginLeft:20,
            },
            regBtn:{
                padding:10, 
                marginRight:20,  
            },
        },
        textinput: {
            marginTop: 20,
            width:'90%'
        },
        hightMargin:{
            marginTop: 40
        },
        icon:{
            color:"#113140"
        }
    }
}

export default StyleSheet.create(proCSS(rawJSON));