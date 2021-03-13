import { StyleSheet } from 'react-native'
import {fontSize, palette} from '../../theme'
export default StyleSheet.create({
    ImageLogo: {
        resizeMode: "contain",
        width: undefined,
        height: 25,
        marginTop: 12,
        flex: 1
    },
    header: {
        flexDirection: 'row',
        borderBottomWidth: 0.4,
    },
    imageHeader: {
        resizeMode: 'contain',
        width: undefined,
        height: 85,
        marginTop: 32
    },
    img:{
        width:138,
        height:138,
        marginLeft:2,
        marginTop:2,
        flex:1
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
    },
    theme:{
        color:palette.grey
    },
    containtexttheme:{
        alignItems:'flex-end',flex:1,marginRight:16
    },
    containDelete:{
        flexDirection:'row',
        backgroundColor:'white',
        elevation:6,
        width:122,
        right:16,
        position:'absolute',
        marginTop:24,
    },
    titleDelete:{
        paddingLeft:12,
        paddingVertical:8
    },
    dot:{
        marginRight:16,
    },
    containDot:{
        alignItems:'flex-end',
        flex:1
    }
})