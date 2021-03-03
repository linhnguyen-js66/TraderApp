import { StyleSheet } from 'react-native'
import { spacing, palette, fontSize } from "../../theme"
export default StyleSheet.create({
    buttonForm: {
        backgroundColor: palette.buttonColor,
        borderRadius:20,
        elevation: 2
    },
    textButton: {
        padding:spacing[4],
        textAlign:'center',
        fontSize:fontSize[4],
        fontWeight:'bold'
    }
})