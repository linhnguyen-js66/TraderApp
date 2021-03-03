import {StyleSheet} from 'react-native'
import { fontSize, palette } from '../../theme'
export default StyleSheet.create({
    header:{
       flexDirection:'row',
        backgroundColor:palette.backgroundlightGreen,
    },
    contain:{
        backgroundColor:palette.backgroundlightGreen,
        paddingVertical:8,
        paddingHorizontal:16
    },
    imageHeader:{
        resizeMode:'contain',
        width:undefined,
        height:85,
        marginTop:32
    },
    containHeader:{
        backgroundColor:palette.backgroundlightGreen
    },
    text1:{
        fontWeight:'bold',
        fontSize:fontSize[4]
    },
    text2:{
        paddingHorizontal:64,
        textAlign:'center',
        marginTop:16
    },
    containTextHead:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:32,
        marginBottom:32
    },
    containHeader2:{
        backgroundColor:palette.backgroundlightGreen,
        height:32
    },
    containTheme:{
        backgroundColor:palette.backgroundlightGreen,
        borderRadius:10,
        elevation:6,
        marginHorizontal:8,
    },
    imageIcon:{
        resizeMode:'contain',
        width:undefined,
        height:50,
        marginTop:16,
        marginBottom:16
    },
    texttheme:{
        paddingHorizontal:32,
        textAlign:'center',
        marginTop:16
    },
    imgAva:{
        width:40,
        height:40,
        borderWidth:0.4,
        borderColor:'black',
        borderRadius:50
    },
    containAva:{
        flexDirection:'row',
        marginLeft:16
    },
    containUserName:{
        flex:1,
        justifyContent:'center',
        marginLeft:8
    },
    userName:{
        fontSize:fontSize[3],
        fontWeight:'bold'
    },
    containStatus:{
        marginVertical:8,
        marginHorizontal:16
    },
    status:{
        fontSize:fontSize[3]
    },
    imgPost:{
        resizeMode:'contain',
        width:undefined,
        height:280
    },
    containLikeandComment:{
        flexDirection:'row',
        marginTop:8,
        marginHorizontal:16
    },
    date:{
        color:palette.grey
    },
    commentandlike:{
        marginLeft:16,
        marginTop:8
    },
    like:{
        fontWeight:'bold',
        fontSize:fontSize[3]
    },
    comment:{
        fontSize:fontSize[3],
        marginTop:4,
        color:palette.grey,
        marginBottom:32
    }
})