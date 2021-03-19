import { StyleSheet } from 'react-native'
import { fontSize, palette } from '../../theme'
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
    imgCoupon: {
        width: '100%',
        borderTopLeftRadius:30,
        flex: 1,
        position:'absolute',
        height:200
    },
    containDetail: { 
        backgroundColor: 'white', 
        // position: 'absolute', 
        width: '100%', 
        height:200,
        marginTop: 150, 
        borderTopLeftRadius:30,
        borderWidth:0.5,
        borderColor:palette.colorgray,
        elevation:5
    },
    codeCoupon:{
        backgroundColor:'#336699',
        position:'absolute',
        alignSelf:'flex-end',
        marginTop:130,
        right:8,
        borderRadius:10,
        elevation:5
    },
    textCoupon:{
        paddingVertical:8,
        paddingHorizontal:8,
        alignItems:'center',
        fontSize:fontSize[3],
        color:palette.white,
        fontWeight:'bold'
    },
    nameStore:{
        marginTop:16,
        paddingHorizontal:16,
        fontSize:fontSize[4],
        fontWeight:'bold'
    },
    detail:{
        fontSize:fontSize[3],
        paddingHorizontal:16,
        marginTop:8,
        color:palette.grey
    },
    hansd:{
        justifyContent:'flex-end',
        flex:1,
        marginBottom:16,
        marginLeft:16
    },
    texthansd:{
        fontSize:fontSize[3],
        color:palette.grey
    },
    time:{
        fontSize:fontSize[4],
        fontWeight:'bold',
        color:'#008ae6'
    }
})