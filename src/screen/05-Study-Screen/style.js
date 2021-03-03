import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    header:{
        flex:1,flexDirection:'row',marginHorizontal:16,marginTop:8
    },
    ImageSlide:{
        flex:1,
        resizeMode:'contain',
        width:undefined,
        height:422,
        borderRadius:20,
    },
    title:{
        fontSize:17,
        color:'#524747',
        marginBottom:8
    },
    titleLesson:{
        fontSize:30,
        fontWeight:'bold'
    },
    ImageSlide2:{
        flex:1,
        resizeMode:'contain',
        width:undefined,
        borderRadius:20,
        height:360,
    },
    ChapterLesson:{
        fontSize:25,
        fontWeight:'bold'
    }
})