import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, RefreshControl, Alert } from "react-native"
import styles from './style'
import Score from '../../components/Score'
import HeaderView from '../../components/Header'
import ButtonForm from '../../components/ButtonForm'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { connect, useDispatch } from 'react-redux'
const DetailLessonScreen = ({route,score}) => {
    const { idLesson, id } = route.params
    const [DataLesson, setDataLesson] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [Lesson, setLesson] = useState([])
    const uid = auth().currentUser.uid
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
    const SaveUserStudied = async (idDoc,idLesson) => {
        try{
           let user = {
               uid:uid
           }
           
           await firestore().collection('DataStudy').doc(idDoc).update({
            UserStudied: firestore.FieldValue.arrayUnion(user)
           })
           Alert.alert('Chúc mừng',
           `Bạn đã thông qua bài học số ${idLesson}`)
           
        }catch(err){
           console.log(err)
        }
    }
    
    const caculateScore = async (dataUser,count) => {
        
        let findUser = dataUser.findIndex(item=> item.uid == uid)
        if(findUser < 0){
            SaveScore(count)
            let totalScore = score + count
            await firestore().collection("UserInformation").doc(uid).update({
                count:totalScore
            })
        }
        else{
            Alert.alert("Cảm ơn","Bạn đã thông qua bài học này")
        }
    }
    const onRefresh = () => {
        setTimeout(() => {
            getDataLesson()
        }, 1000)
    }
    const dispatch = useDispatch()
    const SaveScore = (score) => {
        dispatch({
            type:'SAVE_SCORE',
            payload:score
        })
    }
    useEffect(() => {
        getDataLesson()
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', marginHorizontal: 16}}>
                <View style={{ marginVertical:8}}>
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
                                onPress={() => {
                                    
                                    SaveUserStudied(item.idLesson,item.id)
                                    caculateScore(item.UserStudied,item.count)
                                    onPressNextLesson(item.id)
                                }}
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
const maptoStatetoProps = (state)=> ({
    score: state.data.Score
})
export default connect(maptoStatetoProps,null)(DetailLessonScreen) 