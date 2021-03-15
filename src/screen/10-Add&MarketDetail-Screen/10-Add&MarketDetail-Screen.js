import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, Alert } from "react-native"
import styles from './style'
import HeaderView from '../../components/Header'
import { Icon } from 'react-native-elements'
import LikeAndComment from '../../components/LikeAndComment'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../navigation/screen'
import auth from '@react-native-firebase/auth'
const DetailPost = ({ item }) => {
    const { like, idPost, dataFrom, id, saved, idUserLike, idUserSaved } = item
    const navigation = useNavigation()
    const [isLike, setIsLike] = useState(like)
    const [isSave, setIsSave] = useState(saved)
    let uid = auth().currentUser.uid
    const onClickLike = () => {
        setIsLike(true)

        uploadLikeFirebase()
    }
    const onClickDisLike = () => {
        setIsLike(false)

        deleteLikeFirebase()
    }
    const uploadLikeFirebase = async () => {
        try {
            let newUser = {
                uid: uid
            }
            if (dataFrom == 'Product') {
                await firestore().collection('DataProduct').doc(idPost).update({
                    idUserLike: firestore.FieldValue.arrayUnion(newUser)
                })
            }
            else if (dataFrom == 'Address') {
                await firestore().collection('Address').doc(idPost).update({
                    idUserLike: firestore.FieldValue.arrayUnion(newUser)
                })
            }

        } catch (error) {
            console.log(error)
        }
    }
    const deleteLikeFirebase = async () => {
        try {
            let userdislike = {
                uid: uid
            }
            if (dataFrom == "Product") {
                await firestore().collection('DataProduct').doc(idPost).update({
                    idUserLike: firestore.FieldValue.arrayRemove(userdislike)
                })
            }
            else if (dataFrom == "Address") {
                await firestore().collection('Address').doc(idPost).update({
                    idUserLike: firestore.FieldValue.arrayRemove(userdislike)
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    //Save Post 
    const onClickSave = () => {
        Alert.alert(
            'Thông báo',
            'Bạn có chắc muốn lưu bài viết này ?',
            [
                {
                    text: 'Hủy'
                },
                {
                    text: 'Lưu lại',
                    onPress: () => {
                        setIsSave(true)
                        uploadUserSavePost()
                    }
                }
            ]
        )
    }
    const onClickDeleteSave = () => {
        Alert.alert(
            'Thông báo',
            'Bạn có chắc muốn bỏ lưu bài viết này ?',
            [
                {
                    text: 'Hủy'
                },
                {
                    text: 'Bỏ lưu',
                    onPress: () => {
                        setIsSave(false)
                        deleteUserSavePost()
                    }
                }
            ]
        )
    }
    const uploadUserSavePost = async () => {
        try {
            let newUser = {
                uid: uid
            }
            if (dataFrom == 'Product') {
                await firestore().collection('DataProduct').doc(idPost).update({
                    idUserSaved: firestore.FieldValue.arrayUnion(newUser)
                })
            }
            else if (dataFrom == 'Address') {
                await firestore().collection('Address').doc(idPost).update({
                    idUserSaved: firestore.FieldValue.arrayUnion(newUser)
                })
            }
            // idUserSaved.push({uid:uid})
            await firestore().collection('DataSavedPost').doc(idPost).set({
                ...item,
                idType: 1,
                user: uid,
                idPost: idPost
            })
            await firestore().collection('DataSavedPost').doc(idPost).update({
                idUserSaved: firestore.FieldValue.arrayUnion(newUser)
            })
        } catch (error) {
            console.log(error)
        }
    }
    const deleteUserSavePost = async () => {
        try {
            let userNotSave = {
                uid: uid
            }
            if (dataFrom == "Product") {
                await firestore().collection('DataProduct').doc(idPost).update({
                    idUserSaved: firestore.FieldValue.arrayRemove(userNotSave)
                })
            }
            else if (dataFrom == "Address") {
                await firestore().collection('Address').doc(idPost).update({
                    idUserSaved: firestore.FieldValue.arrayRemove(userNotSave)
                })
            }
            await firestore().collection('DataSavedPost').doc(idPost).delete()
        } catch (error) {

        }
    }
    //Refresh Data
    const [Refresh, setRefresh] = useState([])
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setRefresh([])
        });
        return unsubscribe;
    }, [navigation])
    useEffect(() => {
        setIsLike(like ? true : false)
        setIsSave(saved ? true : false)

    }, [Refresh])

    return (
        <View>
            <View>
                <Image source={{ uri: item.image }} style={styles.imageCover} />
            </View>
            {/**Nút bình luận và like*/}
            <View style={styles.containLikeandComment}>
                <View>
                    <LikeAndComment name={isLike ? "heart" : "hearto"} type="antdesign"
                        onPress={() => {

                            isLike ? onClickDisLike() : onClickLike()
                        }

                        }
                        color={isLike ? "tomato" : "black"} />
                </View>
                <View style={{ marginLeft: 16 }}>
                    <LikeAndComment name="chatbubble-outline" type="ionicon" style={{ transform: [{ rotateY: '180deg' }] }}
                        onPress={() => navigation.navigate(screen.DetailComment, {
                            idPost: id
                        })}
                    />
                </View>
                <View style={{ marginLeft: 16 }}>
                    <LikeAndComment name={isSave ? "md-paper-plane" : "md-paper-plane-outline"} type="ionicon"
                        onPress={() => {

                            isSave ? onClickDeleteSave() : onClickSave()
                        }}
                    />
                </View>
            </View>
            {/**Tiêu để */}
            <View style={{ marginHorizontal: 16, marginVertical: 16 }}>
                <Text style={styles.caption}>{item.name}</Text>
                <Text style={styles.price}>Giá: {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"}</Text>
            </View>
            {/**Chi tiết */}
            <View style={styles.containDetail}>
                <View style={{ marginHorizontal: 16 }}>
                    <Text style={[styles.detail, { marginTop: 8 }]}>Chi tiết:</Text>
                    <Text style={styles.detail}>Địa chỉ: {item.adress}</Text>
                    <Text style={styles.detail}>Miêu tả: {item.content}</Text>
                </View>
            </View>
        </View>
    )
}
const AddandMarketDetailScreen = ({ route }) => {
    const { id } = route.params
    const [renderItem, setRenderItem] = useState([])
    const navigation = useNavigation()
    let uid = auth().currentUser.uid
    const getDataFromFirebase = async () => {
        let resultData = []
        let snapshot = await firestore().collection("DataProduct").where("id", '==', id).get()
        if (snapshot.empty) {
            await firestore().collection("Address").where("id", '==', id).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    resultData.push({
                        idPost: doc.id, ...doc.data(), like: false, dataFrom: 'Address', saved: false
                    })
                    let result
                    result = resultData
                    for (let data = 0; data < result.length; data++) {
                        let amountUser = resultData[data].idUserLike
                        for (let user = 0; user < amountUser.length; user++) {
                            if (amountUser[user].uid == uid) {
                                result[data].like = true
                            }
                        }
                    }
                    //Save Post
                    for (let data = 0; data < result.length; data++) {
                        let amountUserSaved = result[data].idUserSaved
                        for (let user = 0; user < amountUserSaved.length; user++) {
                            if (amountUserSaved[user].uid == uid) {
                                result[data].saved = true
                            }
                        }
                    }
                })
            })

            setRenderItem(resultData)
            console.log(renderItem)
        }
        else {
            await firestore().collection("DataProduct").where("id", '==', id).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    resultData.push({
                        idPost: doc.id, ...doc.data(), like: false, dataFrom: 'Product'
                    })
                    let result = resultData
                    for (let data = 0; data < result.length; data++) {
                        let amountUser = resultData[data].idUserLike
                        for (let user = 0; user < amountUser.length; user++) {
                            if (amountUser[user].uid == uid) {
                                result[data].like = true
                            }
                        }
                    }
                    //Save Post
                    for (let data = 0; data < result.length; data++) {
                        let amountUserSaved = resultData[data].idUserSaved
                        for (let user = 0; user < amountUserSaved.length; user++) {
                            if (amountUserSaved[user].uid == uid) {
                                result[data].saved = true
                            }
                        }
                    }
                })
            })
            setRenderItem(resultData)
        }
    }

    useEffect(() => {
        getDataFromFirebase()
    }, [])
    //Like and Comment 

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.header}>
                <View style={{ marginTop: 4 }}>
                    <HeaderView name="chevron-left" type="entypo" onPress={() => navigation.navigate(screen.MarketScreen)} />
                </View>
                <Image source={require('../../image/logo2.png')} style={styles.ImageLogo} />
            </View>
            {/**Params*/}
            <FlatList
                data={renderItem}
                keyExtractor={item => item.id}
                nestedScrollEnabled={true}
                renderItem={({ item, index }) =>
                    <DetailPost item={item} />
                }
            />
            {renderItem.map(item =>
                <View style={styles.footer}>
                    <View style={styles.containPhone}>
                        <Text style={[styles.detail, { alignSelf: 'center', flex: 1 }]}>Điện thoại: {item.phone} </Text>
                        <TouchableOpacity style={styles.containButtonPhone}>
                            <Text style={styles.phone}>Gọi Điện</Text>
                            <Icon name="phone" color="white" type="entypo" size={24} style={styles.iconPhone} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    )
}
export default AddandMarketDetailScreen