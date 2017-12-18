import { StyleSheet } from "react-native";

export class Font {
    static get h1(){
        return 26
    }

    static get h2(){
        return 24
    }

    static get h3(){
        return 20
    }

    static get h4(){
        return 16
    }
}

export default StyleSheet.create({
    flexAround: {
        flex: 1
    },
    iCtn:{
        minWidth: 25,
    },
    flexCenter: {
        flex: 4,
        alignItems: "center",
    },
})