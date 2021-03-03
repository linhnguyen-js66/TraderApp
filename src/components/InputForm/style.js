import {StyleSheet} from 'react-native'
import { spacing, palette, fontSize } from "../../theme"
export default StyleSheet.create({
    title:{
        fontSize:fontSize[4],
        fontWeight:'bold'
    },
    textInput:{
      
      borderBottomWidth:0.4,
      borderBottomColor:palette.textInputBorderBottom,
      fontSize:fontSize[4]
    }
})