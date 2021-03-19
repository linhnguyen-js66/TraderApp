import {StyleSheet, Dimensions} from 'react-native'
import { fontSize, palette } from '../../theme'
export default StyleSheet.create({
    containHead:{
        backgroundColor:palette.white,
        marginTop:8,
        flexDirection:'row',
        borderBottomWidth:0.5
    },
    containTextView:{
        flex:1,
        alignItems:'center',
        marginTop:8,
        fontSize:fontSize[4],
        fontWeight:'bold',
        textAlign:'center',
        paddingBottom:16
    },
    img:{
        flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover'
    },
    containImg:{
  
        elevation:9,
    
        
    },
    detailCoupon:{
        position:'absolute',
        
        backgroundColor:palette.white,
        width:'90%',
        marginTop:16,
        alignSelf:'center',
       
        borderRadius:10,
        elevation:10
    },
    contaiNameStore:{
        marginTop:16
    },
    name:{
       paddingHorizontal:16,
       fontWeight:'bold',
       fontSize:fontSize[4]
    },
    detail:{
        paddingHorizontal:16,
        marginTop:4,
        fontSize:fontSize[3],
        color:palette.grey
    },
    containHansd:{
        flex:1,
        justifyContent:'flex-end',
        marginBottom:8,
        marginLeft:16
    },
    hansd:{
        fontSize:fontSize[3],
        color:palette.grey
    },
    time:{
        fontSize:fontSize[4],
        fontWeight:'bold',
        color:'#008ae6'
    },
    containButton:{
        marginBottom:16,
        marginLeft:16,
        backgroundColor:'tomato',
        borderRadius:5,
        alignItems:'center',
        width:80
    },
    textreceive:{
        paddingVertical:8,
        fontWeight:'bold',
        color:palette.white,
        fontSize:fontSize[3]
    }
})