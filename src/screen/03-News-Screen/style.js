import { StyleSheet, Dimensions } from 'react-native'
import { spacing, palette, fontSize } from "../../theme"
const windowWidth = Dimensions.get('window').width - 64
export default StyleSheet.create({
    header: { marginHorizontal: 16, marginTop: 8,flexDirection:'row' },
    titleTime:{
        color:palette.white,
        paddingHorizontal:16,
        marginTop:16,
        fontSize:fontSize[4]
    },
    imageList3:{
        resizeMode: 'cover',
        flex: 1,
        height: undefined,
        width:80,
        borderRadius:10,
    },
    descrptionList3:{
        flex:1,
        justifyContent:'center',
        marginHorizontal:16
    },
    titleFirst:{
        fontWeight:'bold',
        fontSize:fontSize[4]
    },
    detailList3:{
        color:'#796C6C'
    },
    imageList: {
        height: 200,
        borderRadius:10,
        width:windowWidth
    },
    title:{
        color:palette.white,
        fontWeight:'bold',
        fontSize:fontSize[0],
        marginTop:120,
        paddingHorizontal:16
    },
})