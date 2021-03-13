import {StyleSheet} from 'react-native'
import { fontSize } from '../../theme'
export default StyleSheet.create({
    ImageLogo:{
        resizeMode:"contain",
        width:undefined,
        height:25,
        marginTop:12,
        flex:1
    },
    header:{
        flexDirection:'row',
        borderBottomWidth:0.4,
    },
    imageHeader:{
        resizeMode:'contain',
        width:undefined,
        height:85,
        marginTop:32
    },
    img:{
        width:100,
        height:100,
        marginLeft:3
    },
    category:{
        marginLeft:16,
        marginTop:16,
        fontSize:fontSize[3],
        fontWeight:'bold'
    }
})