import {StyleSheet} from 'react-native'
import { spacing, palette, fontSize } from "../../theme"
export default StyleSheet.create({
    textHead:{
        fontSize:fontSize[6],
        fontWeight:'bold',
       
    },
    containTitle:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:spacing[12]
    },
    description:{
        paddingHorizontal:spacing[5],
        textAlign:'center',
        fontSize:fontSize[4],
        marginVertical:spacing[5],
        color:palette.colorForgotPwd
    },
    input:{
        marginTop:spacing[7],
        marginHorizontal:32,
        flexDirection:"row"
    },
    button:{
        marginHorizontal:spacing[7],
        marginTop:spacing[7]
    },
    Icon:{
        marginTop:spacing[7],
        justifyContent:'center'
    },
    textInput:{
        flex:1,
        marginLeft:spacing[5]
    }
})