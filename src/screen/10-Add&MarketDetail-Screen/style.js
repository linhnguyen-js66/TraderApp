import {StyleSheet} from 'react-native'
import { palette,spacing,fontSize } from '../../theme'
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
        flexDirection:'row',
        borderBottomWidth:0.4,
    },
    imageCover:{
        resizeMode:'cover',
        width:undefined,
        height:230,
    },
    caption:{
        fontSize:24,
        fontWeight:'bold',
        marginBottom:8
    },
    price:{
        color:'#F49608',
        fontSize:17
    },
    detail:{
        fontSize:17,
        color:'#524747',
    },
    containPhone:{
        flexDirection:'row',
        paddingVertical:16,
        marginHorizontal:16,
    },
    containButtonPhone:{
        flexDirection:"row",
        backgroundColor:palette.buttonColor,
        width:150,
        borderRadius:20,
        alignItems:'flex-end',
    },
    phone:{
        fontSize:20,
        fontWeight:'bold',
        paddingVertical:8,
        flex:1,
        textAlign:'center',    
    },
    iconPhone:{
        marginRight:16,
        flex:1,
        justifyContent:'center'
    },
    containDetail:{
        borderTopWidth:0.5,
        marginBottom:100
    },
    containLikeandComment:{
        flexDirection:'row',
        marginTop:16,
        marginHorizontal:16
    },
    footer:{
        position: 'absolute',
        flex:1,
        width:'100%',
        alignItems:'flex-end',
        left: 0, right: 0, bottom:0,
        backgroundColor:palette.white,
        elevation:6,
        borderTopWidth:0.2
    }
})