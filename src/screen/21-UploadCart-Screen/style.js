import {StyleSheet} from 'react-native'
import { fontSize } from '../../theme'
export default StyleSheet.create({
    imageIcon:{
        width:150,
        height:150
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
    containTitlePage:{
        flex:1,
        alignItems:'center'
    },
    titlePage:{
        fontWeight:'bold',
        fontSize:fontSize[0],
        paddingVertical:12
    }
})