import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, RefreshControl } from "react-native"
import styles from './style'
import { Score } from '../../components/HeaderCustom'
import HeaderView from '../../components/Header'
import ButtonForm from '../../components/ButtonForm'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
const DetailLessonScreen = ({ route }) => {
    const { idLesson, id } = route.params
    const [DataLesson, setDataLesson] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [Lesson, setLesson] = useState([])
    const getDataLesson = async () => {
        setIsLoading(true)
        let resultData = []
        let lesson = []
        let snapshot = await firestore().collection("DataStudy").get()
        if (!snapshot.empty) {
            await firestore().collection("DataStudy").get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    resultData.push({
                        idLesson: doc.id,
                        ...doc.data()
                    })
                    lesson = resultData.filter(item => item.id == id)
                })
                ////
            })
            ///
        }
        setDataLesson(resultData)
        setLesson(lesson)
        setIsLoading(false)
    }
    const onPressNextLesson = (id) => {
        let lesson = []
        let Data = DataLesson
        lesson = Data.filter(item => item.id == (Number(id) + 1))
        setLesson(lesson)
    }
    const onRefresh = () => {
        setTimeout(() => {
            getDataLesson()
        }, 1000)
    }
    useEffect(() => {
        getDataLesson()
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', marginHorizontal: 16, marginTop: 8 }}>
                <View style={{ marginTop: 4 }}>
                    <HeaderView name="close" type="font-awesome" />
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Score />
                </View>
            </View>
            {/*body*/}
            <FlatList
                data={Lesson}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) =>
                    <View>
                        <View style={styles.containCover}>
                            <Image source={{ uri: item.image }} style={styles.imageCover} />
                        </View>
                        {/*Lesson*/}
                        <View style={styles.lesson}>
                            <Text style={styles.title}>{item.name}</Text>
                            <Text style={styles.descrip}>
                                {item.description}
                            </Text>
                        </View>
                        <View style={[styles.ButtonForm]}>

                            <ButtonForm title="Bài tiếp"
                                onPress={() => onPressNextLesson(item.id)}
                            />

                        </View>
                    </View>
                }
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={() => {
                            onRefresh()
                        }}
                    />
                }
            />

        </View>
    )
}

export default DetailLessonScreen