import {StyleSheet} from 'react-native'
import { fontSize, palette, spacing } from '../../theme'
export default StyleSheet.create({
    header: { marginHorizontal:16, marginTop: 8,flex:1,flexDirection:'row' },
    title:{
        fontWeight:'bold',
        fontSize:25,
        marginVertical:16,
        marginLeft:16
    },
    imageLeoDoc:{
        flex:1,
        resizeMode:'contain',
        width:undefined,
        height:136
    },
    descript:{
        marginTop:16,
        marginHorizontal:32,
        justifyContent:'center',
        flex:1,
        alignItems:'center'
    },
    ButtonForm:{
        marginHorizontal:120,
        marginTop:16
    },
    imgAdd:{
        width:170,
        height:230,
        borderRadius:spacing[15]
    },
    nameAdd:{
        fontSize:fontSize[0],
        fontWeight:'bold',
        marginTop:spacing[3]
    },
    detailAdd:{
        color:palette.detailAdd,
        fontSize:fontSize[5],
        marginTop:spacing[2],
        marginLeft:spacing[3]
    }
})