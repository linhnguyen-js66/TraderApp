import {StyleSheet} from 'react-native'
import { fontSize, palette } from '../../theme'
export default StyleSheet.create({
    imageIcon:{
        width:150,
        height:150,
        borderRadius:10
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
    },
    contain:{
        flexDirection:'row',
        marginHorizontal:16,
        marginTop:16
    },
    iconplus:{
        position:'absolute',
        alignSelf:'flex-end',
        
    },
    Type:{
        marginLeft:16,
        backgroundColor:'grey',
        borderRadius:10
    },
    titleType:{
        paddingVertical:4,
        paddingHorizontal:8,
        color:palette.white
    },
    coin:{
        height:30,
        width:30
    },
    containHeritage:{
       flexDirection:'row',
       marginLeft:16,
       marginTop:16
    },
    textHeritage:{
        alignSelf:'center',
        marginLeft:4,
        fontSize:17,
        fontWeight:'bold'
    }
})