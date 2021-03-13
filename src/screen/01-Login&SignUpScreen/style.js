import { StyleSheet } from 'react-native'
import { spacing, palette, fontSize } from "../../theme"

export default StyleSheet.create({
    logo:{
       width:270,
       height:170,
       alignSelf:'center',
       marginTop:32
    },
    containerTopTab: {
        flexDirection: 'row',
        marginHorizontal:spacing[10],
        marginTop:16,
    },
    signUpContain:{
        flex:1,
        alignItems:'flex-end'
    },
    signUpTitle:{
        fontSize:fontSize[0],
        fontWeight:'bold',
        padding:4
    },
    signInTitle:{
        fontSize:fontSize[0],
        fontWeight:"bold",
        padding:4
    },
    signInView:{
        borderRadius:spacing[14],
        marginHorizontal:spacing[4]
    },
    containInput:{
        marginHorizontal:56,
        marginTop:24
    },
    password:{
        marginVertical:spacing[7]
    },
    email:{
        marginTop:spacing[7]
    },
    forgotPassword:{
        marginTop:spacing[7],
        alignItems:'center'
    },
    forgotTitle:{
        fontSize:fontSize[4],
        color:palette.colorForgotPwd
    }
})