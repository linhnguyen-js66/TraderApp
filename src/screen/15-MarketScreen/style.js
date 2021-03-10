import {StyleSheet} from 'react-native'
import { fontSize, palette } from '../../theme'
export default StyleSheet.create({
    header:{
        backgroundColor:palette.white,
  
        paddingHorizontal:16,
        flexDirection:'row',
    },
    imgLogo:{
      height:50,
      width:135
    },
    containControl:{
        flexDirection:'row',
        marginHorizontal:16,
        marginTop:16
    },
    control:{
        // backgroundColor:'white',
        flex:1,
        alignItems:'flex-end'
        // elevation:7,
        // borderRadius:20,
        // marginLeft:16,
    },
    textChoose:{
        paddingVertical:12,
        paddingHorizontal:16,
        fontSize:fontSize[3],
        color:palette.grey,
    },
    container:{
      flex:1,     
      marginLeft:16,
      marginVertical:8
    },
    containDetail:{
        height:100,
        backgroundColor:palette.white,
        elevation:5,
        flex:1,
        borderBottomRightRadius:10,
        borderBottomLeftRadius:10
    },
    imgList:{
        height: 180,
        width:'100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius:10,
        flexGrow:1,
        justifyContent:'center',
        alignItems:'center' 
    },
    textDetail:{
        paddingHorizontal:8,
        marginTop:8,
        fontSize:fontSize[3]
    },
    textPrice:{
        marginTop:8,
        marginLeft:8,
        fontSize:fontSize[3],
        color:palette.buttonColor,
        fontWeight:'bold',
    },
    containType:{
        flexDirection:'row',
        marginTop:16,
        marginBottom:8
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
    },
    buttonUp:{
        backgroundColor:palette.buttonColor,
        height:60,
        width:60,
        borderRadius:40,
        marginBottom:8,
        elevation:5,
        marginRight:8,
        justifyContent:'center'
    },
    iconUp:{
       color:palette.grey
    },
    containButtonUp:{
        position: 'absolute',
        flex:1,
        width:'100%',
        alignItems:'flex-end',
        left: 0, right: 0, bottom: 0,
    },
    containControlChoose:{
        flexDirection: 'row',backgroundColor:'white',elevation:5,
        borderTopLeftRadius:20,
        borderBottomLeftRadius:20
    },
    containSort:{
        flexDirection: 'row',backgroundColor:'white',elevation:5,
        borderTopRightRadius:20,
        borderBottomRightRadius:20
    },
    listChoose:{
        backgroundColor:palette.white,
        width:90,
        elevation:7,
        borderBottomLeftRadius:20,
        position:'absolute',
        marginTop:36
    },
    textControll:{
        paddingVertical:8,
        paddingHorizontal:16,
        color:palette.grey
    },
    titleLoadingFooter:{
        color:palette.grey,
        fontSize:fontSize[4],
        alignSelf:'center',
        marginBottom:32
    }
})