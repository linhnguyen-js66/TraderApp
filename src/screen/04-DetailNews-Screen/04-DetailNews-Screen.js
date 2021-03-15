import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, RefreshControl } from "react-native"
import styles from './style'
import HeaderView from '../../components/Header'
import { Icon } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
const News = ({ item,idUserDislike, idUserLike}) => {
    const { id, like, dislike, image, name, description, dating, timing, idPost } = item
    const [isLike,setIsLike] = useState(like)
    const [isDislike, setIsDislike] = useState(dislike)
    const [amountLike,setAmountLike] = useState(idUserLike)
    const [amountDislike,setAmountDislike] = useState(idUserDislike)
    //Like
    let uid = auth().currentUser.uid
    const userLikeNews = () => {
         setIsLike(true)
         setIsDislike(false)
         updateUserLike()
    }
    const userUnLike = () => {
        setIsLike(false)
    }
    const updateUserLike = async () => {
       try{
           let newUser = {
               uid:uid
           }
           await firestore().collection("DataNews").doc(idPost).update({
            idUserLike: firestore.FieldValue.arrayUnion(newUser)
           }) 
           let resultAmount = []
           let findIndex = resultAmount.findIndex(item => item.uid == uid)
           if(findIndex < 0){
               resultAmount.push(newUser)
           }
           setAmountLike(resultAmount)
       }catch(err){
           console.log(err)
       }
    }
    const updateUserUnlike = async () => {

    }
    //Dislike
    const userDislike = () => {
        setIsDislike(true)
        setIsLike(false)
    }
    const userNotDislike = () => {
        setIsDislike(false)
    }
    useEffect(()=>{
        setIsDislike(dislike ? true : false)
        setIsLike(like ? true : false)
    },[])
    return (
        <View key={id}>
            <View style={{ flex: 1 }}>
                <Image source={{ uri: image }} style={styles.imageCover} />
                <View style={styles.headNews}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon type="font-awesome" name="clock-o" size={20} color="#5C5B5B" />
                        <Text style={styles.datetime}>{timing}</Text>
                    </View>
                    <View style={styles.calendar}>
                        <Icon type="font-awesome" name="calendar" size={20} color="#5C5B5B" />
                        <Text style={styles.datetime}>{dating}</Text>
                    </View>
                </View>
            </View>
            {/* TitleNews */}
            <View style={styles.containtitleNews}>
                <Text style={styles.titleNews}>{name}</Text>
            </View>
            {/* ButtonLikeDislike */}
            <View style={styles.buttonLikeAndDis}>
                <TouchableOpacity style={styles.buttonLike} onPress={()=>{
                    isLike ? userUnLike() : userLikeNews()
                }}>
                    <Icon name="like1" type="antdesign" color={isLike ? "#00aaff":"#5C5B5B" } />
                    <Text style={styles.countLike}></Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ButtonDislike}
                   onPress = {() => {
                       isDislike ? userNotDislike() : userDislike()
                   }}
                >
                    <Icon name="dislike1" type="antdesign" color={isDislike ? "#00aaff":"#5C5B5B" } />
                    <Text style={styles.countLike}></Text>
                </TouchableOpacity>
            </View>
            {/* WriteNews */}
            <View style={styles.WriteNews}>
                <Text style={styles.WriteNewsTitle}>
                    {description}
                </Text>
            </View>
        </View>
    )
}
const DetailNewsScreen = ({ route }) => {
    const { idPost } = route.params
    const [isLoading, setIsLoading] = useState(false)
    const [DataNews, setDataNews] = useState([])
    const getDataNews = async () => {
        setIsLoading(true)
        let snapshot = await firestore().collection("DataNews").where('id','==',idPost).get()
        if (!snapshot.empty) {
            let listPost = []         
            await firestore().collection("DataNews").where('id','==',idPost).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    if(doc.data().idUserLike == undefined){
                        listPost.push({idNews:doc.id,...doc.data(),like:false,idUserLike:[]})
                    }else{
                        listPost.push({idNews:doc.id,...doc.data(),like:false})
                        
                    }
                })
            })

            setDataNews(listPost)
        }
        
        setIsLoading(false)
    }
    const onRefresh = () => {
        setTimeout(() => {
            getDataNews()
        }, 1000)
    }
    useEffect(() => {
        getDataNews()
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.header}>
                <View style={{ marginTop: 4 }}>
                    <HeaderView name="chevron-left" type="entypo" />
                </View>
                <Image source={require('../../image/logo2.png')} style={styles.ImageLogo} />
            </View>
            {/* HeadNews */}
            <FlatList
                data={DataNews}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => <News item={item}
                    idUserDislike={item.idUserDislike}
                    idUserLike = {item.idUserLike}
                />}
                onEndReachedThreshold={1}
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
export default DetailNewsScreen