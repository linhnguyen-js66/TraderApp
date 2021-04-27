import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, Dimensions } from "react-native"
import styles from './style'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { HeaderCustom, Score } from '../../components/HeaderCustom'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH);
// const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4)
import {screen} from '../../navigation/screen'

const RenderItem = ({ data, onPress }) => {
    const { name, description, image } = data

    return (
        <TouchableOpacity style={{marginHorizontal:16}}
        onPress={onPress}
        >
            <Image source={{uri:image}} style={styles.ImageSlide} />
            <View style={{ position: 'absolute', marginTop: 280, marginHorizontal: 16 }}>
                <Text style={styles.title}>
                    {name}
                </Text>
                <Text style={styles.titleLesson}>
                    {description}
                </Text>
            </View>
        </TouchableOpacity>
    )
}
const CarouselHorizal = ({ data, onPress }) => {
    const { name,description, image } = data
    return (
        <TouchableOpacity style={{ marginHorizontal: 16 }}
        onPress={onPress}
        >
            <Image source={{uri:image}} style={styles.ImageSlide2} />
            <View style={{ position: 'absolute', marginTop: 32, marginHorizontal: 16 }}>
                <Text style={styles.title}>
                    {name}
                </Text>
                <Text style={styles.ChapterLesson}>
                    {description}
                </Text>
            </View>
        </TouchableOpacity>
    )
}
const StudyScreen = () => {
    const [activeSlide, setActiveSlide] = useState(0)
    let uid = auth().currentUser.uid
    const pagination = () => {
        return (
            <Pagination
                dotsLength={DataChapter.length}
                activeDotIndex={activeSlide}
                dotStyle={{
                    width: 40,
                    height: 8,
                    borderRadius: 5,
                    backgroundColor: '#37D300',
                }}
                inactiveDotStyle={{
                    width: 10,
                    height: 10,
                    backgroundColor: 'black'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        )
    }
    const navigation = useNavigation()
    //get data study
    const [DataChapter,setDataChapter] = useState([])
    const [DataLesson,setDataLesson] = useState([])
    const [loading,setLoading] = useState(false)
    const getDataChapter = async () => {
       setLoading(true)
       let resultData = []
       let snapshot = await firestore().collection("CategoryChapterExam").orderBy('id','asc').get()
       if(!snapshot.empty){
            snapshot.docs.map(item => resultData.push(item.data()))
       }
       setLoading(false)
       setDataChapter(resultData)
    }
    const getDataLesson = async () => {
    setLoading(true)
    let resultData = []
    let snapshot = await firestore().collection("CategoryChapter").orderBy('id','asc').get()
    if(!snapshot.empty){
        snapshot.docs.map(item => resultData.push(item.data()))
    }
    setLoading(false)
    setDataLesson(resultData)
    }
    useEffect(()=>{
        getDataChapter()
        getDataLesson()
    },[])
    return (
        <ScrollView>
            <View style={styles.header}>
                <HeaderCustom uid={uid}/>
                <Score />
            </View>
            {/* Carousel */}
            <View style={{flex:1,flexDirection:'row',marginTop:16}}>
                <Carousel
                    layout={"stack"}
                    data={DataChapter}
                    renderItem={({ item, index }) => <RenderItem 
                    data={item} 
                    onPress={()=>navigation.navigate(screen.ExamScreen)}
                    />}
                    sliderWidth={SLIDER_WIDTH}
                    itemWidth={ITEM_WIDTH}
                />
            </View>

            {/* {Chapter.map((item)=><CarouselHorizal data={item}/>)} */}
            <View style={{ marginBottom:8}}>
                <Carousel
                    layout={"default"}
                    data={DataLesson}
                    renderItem={({ item, index }) => <CarouselHorizal data={item} 
                    onPress={()=>navigation.navigate(screen.LessonScreen,{
                        idChapter:item.id,
                        name:item.description
                    })}
                    />}
                    sliderWidth={SLIDER_WIDTH}
                    itemWidth={ITEM_WIDTH}
                    onSnapToItem={(index) => setActiveSlide(index)}
                />
                {pagination()}
            </View>

        </ScrollView>
    )
}
export default StudyScreen