import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, Dimensions } from "react-native"
import styles from './style'
import { Score } from '../../components/HeaderCustom'
import HeaderView from '../../components/Header'
import { Icon } from 'react-native-elements'
const Data = [
    {
        title: "Kênh đầu tư ưa thích của bạn là gì?",
        score: 200,
        status: true
    },
    {
        title: "Những hình thức đầu tư tài chính bạn nên biết",
        score: 200,
        status: false
    },
    {
        title: "Bước đầu để kinh doanh khôn ngoan",
        score: 200,
        status: false
    },
    {
        title: "Lên kế hoạch cho ước mơ",
        score:200,
        status:false
    }
]
const ListLesson = ({data}) => {
    const {title,score}= data
    return (
        <View>
            <View style={styles.contain}>
                <View style={styles.containAllTitle}>
                    <View>
                        <Text style={styles.title}>{title}</Text>
                        <View style={styles.containScore}>
                            <View style={{ width: 25 }}>
                                <Image source={require('../../image/diamond.png')} style={styles.imageIcon} />
                            </View>
                            <Text style={styles.score}>{score}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.iconPlay}>
                        <Icon reverse name="play" type="font-awesome" color="#F4CF08" size={18} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const ListLock = ({data}) => {
    const {title,score}= data
    return (
        <View>
            <View style={styles.line}>
            </View>
            <View style={styles.iconLock}>
                <Icon reverse name="lock" type="font-awesome" size={10} color="gray" />
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.containScore}>
                        <View style={{ width: 25 }}>
                            <Image source={require('../../image/diamond.png')} style={styles.imageIcon} />
                        </View>
                        <Text style={styles.score}>{score}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
const LessonScreen = () => {
    return (
        <ScrollView>
            {/* Header */}
            <View style={{ flexDirection: 'row', flex: 1, marginHorizontal: 16, marginTop: 8 }}>
                <View style={{ marginTop: 4 }}>
                    <HeaderView name="chevron-left" type="entypo" />
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Score />
                </View>
            </View>
            {/* TitleLesson */}
            <View style={styles.containLessonTheme}>
                <Text style={styles.lessonTheme}>Làm quen</Text>
                <Text style={styles.list}>Danh sách bài học</Text>
            </View>
            {/*BodyLesson*/}
            <View style={{ marginTop: 16, marginHorizontal: 16 }}>
                {Data.map((item)=>{
                    if(item.status == true){
                        return <ListLesson data={item}/>
                    }
                    else{
                        return <ListLock data = {item}/>
                    }
                })}
                {/* <ListLesson />
                <ListLock /> */}
            </View>
        </ScrollView>
    )
}

export default LessonScreen