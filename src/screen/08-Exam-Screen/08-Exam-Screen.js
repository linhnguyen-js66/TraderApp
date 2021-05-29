import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image,FlatList, RefreshControl} from "react-native"
import styles from './style'
import Score from '../../components/Score'
import HeaderView from '../../components/Header'
import { Icon } from 'react-native-elements'
import ButtonForm from '../../components/ButtonForm'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { connect, useDispatch } from 'react-redux'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {screen} from '../../navigation/screen'
const ListExam = ({ item,state, valueAns}) => {
    
    return (
        <View style={{flex:1}}>
            <View style={styles.contain}>
                <View style={styles.containAllTitle}>
                    <View>
                        <Text style={styles.title}>{item.question}</Text>
                        <View style={styles.containScore}>
                            <View style={{ width: 25 }}>
                                <Image source={require('../../image/diamond.png')} style={styles.imageIcon} />
                            </View>
                            <Text style={styles.score}>{item.count}</Text>
                        </View>
                    </View>
                </View>
            </View>
            {/**Line*/}
            <FlatList
                data={item.answer}
                keyExtractor={data => data.id}
                renderItem={({item,index}) => <View>
                    <View style={styles.line}></View>
                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginHorizontal: 8 }}
                     onPress={()=>state(item.id)}
                    >
                        <View>
                            {valueAns == item.id ? 
                            <Icon name="check" type="entypo" color="#1ABD15" size={30} />
                            : 
                            <Icon name="check" type="entypo" color="#868686" size={30} />
                        }
                            
                        </View>
                        <Text style={styles.answerQuestion} key={item.ans} >{item.ans}</Text>
                    </TouchableOpacity>
                </View>}
            />
        </View>
    )
}
const ExamScreen = ({ route,score }) => {
    const { idChapter,name } = route.params
    const [isLoading, setIsLoading] = useState(false)
    const [DataLesson, setDataLesson] = useState([])
    const [Lesson, setLesson] = useState([])
    const [ans,setAns] = useState('')
    const navigation = useNavigation()
    const uid = auth().currentUser.uid
    
    const getDataExam = async () => {
        setIsLoading(true)
        let snapshot = await firestore().collection("DataExam").get()
        if (!snapshot.empty) {
            let listPost = []
            let resultData
            let data = []
            await firestore().collection("DataExam").get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    listPost.push({ idLesson: doc.id, ...doc.data(), studied:false })
                    
                    /////
                    for (let data = 0; data < listPost.length; data++) {
                       
                        let amountUser = listPost[data].IdUser

                        
                        for (let user = 0; user < amountUser.length; user++) {
                            if (amountUser[user].uid == uid ) {
                                listPost[data].studied = true
                            }
                        }
                    }
                   /////
                  
                   resultData = listPost.filter(item => item.idChapter == idChapter)
                //    data.push(resultData[0])
                //    console.log(data)
                //    sortLesson(resultData)
               
                })
            })
            data.push(resultData[0])
            setLesson(data)
            setDataLesson(resultData)
        }
      
        setIsLoading(false)
    }
    
    const onRefresh = () => {
        setTimeout(() => {
            getDataExam()
        }, 1000)
    }
   
    const CheckAns = () => {
        let resultData = Lesson
        resultData[0].answer.map(item => {
            if(item.id == ans){
                if(item.istrue){
                   CaculateScore(resultData[0].IdUser,Number(resultData[0].count))
                }
                else{
                    Alert.alert('Câu trả lời không đúng')
                }
            }
        })

    }
    const SaveUserStudied = async () => {
        
        let resultData = Lesson
        try{
           let user = {
               uid:uid
           }
           
           await firestore().collection('DataExam').doc(resultData[0].idLesson).update({
            IdUser: firestore.FieldValue.arrayUnion(user)
           })
         
           
        }catch(err){
           console.log(err)
        }
    }
    console.log(DataLesson.length)
    const NextLesson = () => {
        
        let lesson = Lesson
        let resultData = DataLesson
        let newLesson = []
        for(let data = 0; data < resultData.length; data++){
              if(resultData[data].id == lesson[0].id){
                  if(data == 4){
                      Alert.alert('Thông báo','Hay chọn bài học ở chương tiếp theo nhé')
                      navigation.navigate(screen.StudyScreen)
                  }
                  else{
                      newLesson.push(resultData[data + 1])
                  }
                  
              }
        }
        setLesson(newLesson)
        setAns('')
    }
    const CaculateScore = async (dataUser,count) => {
       
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
    const dispatch = useDispatch()
    const SaveScore = (score) => {
        dispatch({
            type:'SAVE_SCORE',
            payload:score
        })
    }
    useEffect(() => {
        getDataExam()
    }, [])
    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', marginHorizontal: 16, marginTop: 8 }}>
                <View style={{ marginTop: 4 }}>
                    <HeaderView name="chevron-left" type="entypo" />
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Score />
                </View>
            </View>
            {/*Body*/}
            <View style={styles.containTheme}>
                <Text style={styles.theme}>{name}</Text>
                <Text style={styles.questionPermanent}>Câu hỏi</Text>
            </View>
            <View style={styles.questionContain}>
                <FlatList
                data={Lesson}
                keyExtractor={item=>item.id}
                renderItem={({item,index})=><ListExam item={item}
                     state={setAns}
                     valueAns={ans}
                />}
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
            {ans !== '' && 
            <View style={styles.ButtonForm}>
                <ButtonForm title="Tiếp theo" 
                onPress={()=> {
                    CheckAns()
                    SaveUserStudied()
                    NextLesson()
                }}
                />
            </View>}
        </View>
    )
}
const maptoStatetoProps = (state)=> ({
    score: state.data.Score
})
export default connect(maptoStatetoProps,null)(ExamScreen) 