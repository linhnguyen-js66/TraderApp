import {StyleSheet} from 'react-native'
import { fontSize, palette } from '../../theme'
export default StyleSheet.create({
    ImageLogo:{
        resizeMode:"contain",
        width:undefined,
        height:25,
        marginTop:12,
        marginBottom:16,
        flex:1
    },
    header:{
        flexDirection:'row'
    },
    imageHeader:{
        resizeMode:'contain',
        width:undefined,
        height:85,
        marginTop:32
    },
    containHeader:{
        backgroundColor:palette.backgroundlightGreen,
        marginBottom:32
    },
    text1:{
        fontWeight:'bold',
        fontSize:fontSize[4]
    },
    text2:{
        paddingHorizontal:64,
        textAlign:'center',
        marginTop:16,
        color:palette.grey,
        fontSize:fontSize[3]
    },
    containTextHead:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:32,
        marginBottom:32
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
    },
    containListPost:{
        marginTop:16
    },
    imgAva:{
        width:40,
        height:40,
        borderWidth:0.4,
        borderColor:'black',
        borderRadius:50
    },
    listpost:{
   
        flex:1
    },
    theme:{
        color:palette.grey
    },
    containtexttheme:{
        alignItems:'flex-end',flex:1,marginRight:16
    }
})