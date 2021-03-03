import {StyleSheet} from 'react-native'
import { fontSize, palette } from '../../theme'
export default StyleSheet.create({
    textInputContain:{
        borderRadius:20,
        backgroundColor:"#E5E5E5",
        flex:1,
        marginRight:16,
        marginBottom:16
    },
    textInput:{
     paddingHorizontal:12,
     fontSize:fontSize[3]
    },
    headerContain:{
        flexDirection:'row',
        marginTop:16,
        borderBottomWidth:0.3,
        borderBottomColor:palette.colorgray
    },
    textCancel:{
        fontSize:fontSize[4],
        fontWeight:'bold'
    },
    containTextCancel:{
        justifyContent:'center',
        marginRight:16,
        marginLeft:16,
        marginBottom:16
    },
    containType:{
        flexDirection:'row',
        marginVertical:16
    },
    type:{
        marginLeft:16,
        borderRadius:20
    },
    nametype:{
        paddingHorizontal:12,
        paddingVertical:4,
        fontSize:fontSize[3],
        fontWeight:'bold'
    }
})