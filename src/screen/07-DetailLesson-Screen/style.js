import {StyleSheet} from 'react-native'
import { palette } from '../../theme'
export default StyleSheet.create({
    imageCover:{
        flex:1,
        resizeMode:'cover',
        width:undefined,
        height:263
    },
    containCover:{
        marginTop:16
    },
    title:{
        fontSize:25,
        fontWeight:'bold',
        marginTop:16
    },
    descrip:{
        color:'#524747',
        marginVertical:16,
        fontSize:16
    },
    lesson:{
        marginHorizontal:16
    },
    ButtonForm:{
        marginHorizontal:64,
        marginBottom:64
    }
})