import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, Dimensions } from "react-native"
import styles from './style'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { HeaderCustom, Score } from '../../components/HeaderCustom'
import { useNavigation } from '@react-navigation/native'
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH);
// const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4)
import {screen} from '../../navigation/screen'
const Data = [
    {
        title: "Học đi đôi với hành",
        lesson: "Bước đầu tiên để kinh doanh",
        image: require("../../image/yellow.png")
    },
    {
        title: "Tiếp tục chiến đấu",
        lesson: "Những cám dỗ phải đi qua",
        image: require("../../image/orange.png")
    },
    {
        title: "Tình huống thực tế",
        lesson: "Đương đầu với thử thách",
        image: require("../../image/red.png")
    }
]
const Chapter = [
    {
        chapter: "Chương 1",
        title: "Làm quen",
        image: require('../../image/green.png')
    },
    {
        chapter: "Chương 2",
        title: "Cạnh tranh thị trường",
        image: require('../../image/blue.png')
    },
    {
        chapter: "Chương 3",
        title: "Luật kinh doanh",
        image: require('../../image/body.png')
    },
]
const RenderItem = ({ data, onPress }) => {
    const { title, lesson, image } = data

    return (
        <TouchableOpacity style={{marginHorizontal:16}}
        onPress={onPress}
        >
            <Image source={image} style={styles.ImageSlide} />
            <View style={{ position: 'absolute', marginTop: 280, marginHorizontal: 16 }}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.titleLesson}>
                    {lesson}
                </Text>
            </View>
        </TouchableOpacity>
    )
}
const CarouselHorizal = ({ data, onPress }) => {
    const { chapter, title, image } = data
    return (
        <TouchableOpacity style={{ marginHorizontal: 16 }}
        onPress={onPress}
        >
            <Image source={image} style={styles.ImageSlide2} />
            <View style={{ position: 'absolute', marginTop: 32, marginHorizontal: 16 }}>
                <Text style={styles.title}>
                    {chapter}
                </Text>
                <Text style={styles.ChapterLesson}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}
const StudyScreen = () => {
    const [activeSlide, setActiveSlide] = useState(0)
    const pagination = () => {
        return (
            <Pagination
                dotsLength={Chapter.length}
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
    return (
        <ScrollView>
            <View style={styles.header}>
                <HeaderCustom/>
                <Score />
            </View>
            {/* Carousel */}
            <View style={{flex:1,flexDirection:'row',marginTop:16}}>
                <Carousel
                    layout={"stack"}
                    data={Data}
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
                    data={Chapter}
                    renderItem={({ item, index }) => <CarouselHorizal data={item} 
                    onPress={()=>navigation.navigate(screen.DetailLesson)}
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