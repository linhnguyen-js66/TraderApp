import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView,RefreshControl, TouchableOpacity, Image, FlatList, ActivityIndicator } from "react-native"
import styles from './style'
import { Score } from '../../components/HeaderCustom'
import HeaderView from '../../components/Header'
import { Icon } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import {screen} from '../../navigation/screen'

const ListLesson = ({ item, onPress}) => {
    const { name, count } = item
    return (
        <View>
            {item.studied == true ? <View style={styles.contain}>
                <View style={styles.containAllTitle}>
                    <View>
                        <Text style={styles.title}>{name}</Text>
                        <View style={styles.containScore}>
                            <View style={{ width: 25 }}>
                                <Image source={require('../../image/diamond.png')} style={styles.imageIcon} />
                            </View>
                            <Text style={styles.score}>{count}</Text>
                        </View>
                    </View>
                  
                </View>
                <TouchableOpacity style={styles.iconPlay} onPress={onPress}>
                        <Icon reverse name="play" type="font-awesome" color="#F4CF08" size={18} />
                    </TouchableOpacity>
            </View>
            :
            <View>
            <View style={styles.line}>
            </View>
            <View style={styles.iconLock}>
                <Icon reverse name="lock" type="font-awesome" size={10} color="gray" />
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <Text style={styles.title}>{name}</Text>
                    <View style={styles.containScore}>
                        <View style={{ width: 25 }}>
                            <Image source={require('../../image/diamond.png')} style={styles.imageIcon} />
                        </View>
                        <Text style={styles.score}>{count}</Text>
                    </View>
                </View>
            </View>
        </View>
            }
           
        </View>
    )
}

const LessonScreen = ({route}) => {
    const [DataLesson, setDataLesson] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation()
    const { idChapter, name } = route.params
    console.log(idChapter)
    let uid = auth().currentUser.uid
    const sortLesson = (lesson) => {
         lesson.sort((a,b)=> a.id - b.id)
    }
    const getDataLesson = async () => {
        setIsLoading(true)
        let snapshot = await firestore().collection("DataStudy").get()
        if (!snapshot.empty) {
            let listPost = []
            let resultData
            await firestore().collection("DataStudy").get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    listPost.push({ idLesson: doc.id, ...doc.data(), studied:false })
                    /////
                    for (let data = 0; data < listPost.length; data++) {
                        if( Number(listPost[data].id) == 1){
                                   listPost[data].studied = true
                               }
                        let amountUser = listPost[data].userStudied
                        for (let user = 0; user < amountUser.length; user++) {
                            if (amountUser[user].uid == uid ) {
                                listPost[data].studied = true
                            }
                        }
                    }
                   /////
                  
                   resultData = listPost.filter(item => item.idChapter == idChapter)
                   sortLesson(resultData)
                })
            })
            setDataLesson(resultData)
        }
      
        setIsLoading(false)
    }

    const onRefresh = () => {
        setTimeout(() => {
            getDataLesson()
        }, 1000)
    }


    useEffect(()=>{
       
            getDataLesson()
      
    },[])

    return (
        <View style={{backgroundColor:'white',flex:1}}>
            {/* Header */}
            <View style={{ flexDirection: 'row', marginHorizontal: 16, marginTop: 8 }}>
                <View style={{ marginTop: 4 }}>
                    <HeaderView name="chevron-left" type="entypo" />
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Score />
                </View>
            </View>
            {/* TitleLesson */}
            <View style={styles.containLessonTheme}>
                <Text style={styles.lessonTheme}>{name}</Text>
                <Text style={styles.list}>Danh sách bài học</Text>
            </View>
            {/*BodyLesson*/}
            <View style={{ marginTop: 16, marginHorizontal: 16,marginBottom:160}}>
                <FlatList
                   data={DataLesson}
                   keyExtractor = {item => item.id}
                   renderItem={({item,index}) => 
           
                   <ListLesson item={item} onPress={()=>navigation.navigate(screen.DetailLesson,{
                       idLesson: item.idLesson,
                       id:item.id
                   })}/> 
                 
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
        </View>
    )
}

export default LessonScreen