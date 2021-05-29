import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, Image, FlatList, RefreshControl, ActivityIndicator } from "react-native"

import styles from './style'
import HeaderView from '../../components/Header'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../navigation/screen'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { palette } from '../../theme'
const ListCoupon = ({ item, index, onPress, product }) => {
    return (
        item.saved == false && (
            <View style={[{ marginLeft: 16, marginBottom: 16, width:180},
           
            ]}>
                <Image source={{ uri: item.image }} style={styles.imgCoupon} />
                <TouchableOpacity style={styles.containDetail} onPress={onPress}>
                    <Text style={styles.nameStore}>{item.name}</Text>
                    <Text style={styles.detail}>{item.content}</Text>
                    
                    <View style={styles.hansd}>
                        <Text style={styles.texthansd}>Hạn sử dụng</Text>
                        <Text style={styles.time}>{item.dateof.split("/").reverse().join("/")}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.codeCoupon}>
                    <Text style={styles.textCoupon}>{item.price}%</Text>
                </View>
            </View>

        )
    )
}

const CouponScreen16 = () => {
    const navigation = useNavigation()
    const [lastDoc, setLastDoc] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    let onEndReachedCalledDuringMomentum = false
    const [DataCoupon, setDataCoupon] = useState([])
    let uid = auth().currentUser.uid

    ////////
    const [DataUser, setDataUser] = useState([])
    const [createdAccount, setCreatedAccount] = useState('2021/02/20')
    const [type,setType] = useState("")
    const getDataUser = async () => {
        let resultData = []
        let snapshot = await firestore().collection("UserInformation").where("uid", '==', uid).get()
        snapshot.docs.map(item => resultData.push(item.data()))
        setDataUser(resultData)
        setCreatedAccount(resultData[0].createdAt)
     
    }

    const getDataCoupon = async () => {
        setIsLoading(true)
        let snapshot = await firestore().collection("Coupon").orderBy('id').limit(3).get()
        if (!snapshot.empty) {
            let listPost = []
            //Date
            let date = createdAccount
            let dateOn = new Date(date)
            dateOn.setDate(dateOn.getDate() + 30)
            let expiry = dateOn

            let currentTime = new Date()

            setLastDoc(snapshot.docs[snapshot.docs.length - 1])
            await firestore().collection("Coupon").orderBy('id').limit(3).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    listPost.push({ idCP: doc.id, ...doc.data(), saved: false })
                    let resultData = listPost
                   // Save Post
                    for (let data = 0; data < resultData.length; data++) {
                        let amountUser = resultData[data].idUserReceive
                        for (let user = 0; user < amountUser.length; user++) {
                            if (amountUser[user].uid == uid) {
                                resultData[data].saved = true
                            }
                        }
                    }
                    //Expiry
                  
                        for (let data = 0; data < resultData.length; data++) {
                            if (resultData[data].idCategory == "special" ) {
                                if (expiry < currentTime == true) {
                                    resultData[data].saved = true
                                }
                            }
                        }
                    
                   
                    //another coupon
                    caculateExpiryDateForAnotherCoupon(resultData, currentTime)
                })
            })
             
            setDataCoupon(listPost)
        }
        else {
            setLastDoc(null)
        }
        setIsLoading(false)
    }

    const getMoreCoupon = async () => {
        if (lastDoc) {
            setIsMoreLoading(true)

            setTimeout(async () => {
                let snapshot = await firestore().collection("Coupon").orderBy('id').limit(3).startAfter(lastDoc.data().id).get()
                if (!snapshot.empty) {
                    let listPost = DataPost
                    let date = createdAccount
                    let dateOn = new Date(date)
                    dateOn.setDate(dateOn.getDate() + 30)
                    let expiry = dateOn
                    let currentTime = new Date()

                    setLastDoc(snapshot.docs[snapshot.docs.length - 1])
                    await firestore().collection("Coupon").orderBy('id').limit(3).startAfter(lastDoc.data().id).get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            listPost.push({ idCP: doc.id, ...doc.data(), saved: false })
                            let resultData = listPost

                            // //Save Post
                            for (let data = 0; data < resultData.length; data++) {
                                let amountUser = resultData[data].idUserReceive
                                for (let user = 0; user < amountUser.length; user++) {
                                    if (amountUser[user].uid == uid) {
                                        resultData[data].saved = true
                                    }
                                }
                            }
                            //Expiry
                           
                                for (let data = 0; data < resultData.length; data++) {
                                    if (resultData[data].idCategory == "special") {
                                        if (expiry < currentTime == true ) {
                                            resultData[data].saved = true
                                        }
                                    }
                                }
                            
                          
                            caculateExpiryDateForAnotherCoupon(resultData, currentTime)
                        })
                    })


                    setDataCoupon(listPost)
                    if (snapshot.docs.length < 3) setLastDoc(null)
                }
                else {
                    setLastDoc(null)
                }
                setIsMoreLoading(false)
            }, 1000)
        }
        onEndReachedCalledDuringMomentum = true
    }
    const onRefresh = () => {
        setTimeout(() => {
            getDataCoupon()
        }, 1000)
    }

    const renderFooter = () => {
        if (!isMoreLoading) return true
        return (
            <ActivityIndicator
                size='large'
                color={palette.buttonColor}
                style={{ marginBottom: 16 }}
            />
        )
    }
    //expiry date
    const [refresh,setRefresh] = useState([])
    const caculateExpiryDateForAnotherCoupon = async (resultData, currentTime) => {
        try {
            setRefresh([])
            
            for (let data = 0; data < resultData.length; data++) {
                let dateCheck = resultData[data].dateof
                let id = resultData[data].idCP
                
                if (resultData[data].idCategory !== "special") {

                    if (new Date(dateCheck) < currentTime == true) {
                        await firestore().collection("Coupon").doc(id).delete()
                        await firestore().collection("OwnerCoupon").doc(id).delete()
                    }
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getDataCoupon()
        getDataUser()
    }, [])
    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={styles.header}>
                <View style={{ marginTop: 4 }}>
                    <HeaderView name="chevron-left" type="entypo" onPress={() => navigation.navigate(screen.AccountSetting)} />
                </View>
                <Image source={require('../../image/logo2.png')} style={styles.ImageLogo} />
            </View>
        
            <View style={{ marginTop: 16, marginBottom: 64 }}>
                <FlatList
                    data={DataCoupon}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => <ListCoupon item={item} index={index}
                        onPress={() => navigation.navigate(screen.DetailCoupon,{
                            idCP:item.idCP,
                            id:item.id
                        })}
                        product={DataCoupon}
                    />}
                    numColumns={2}
                    onEndReachedThreshold={1}

                    onEndReached={() => {
                        if (!onEndReachedCalledDuringMomentum && !isMoreLoading) {
                            getMoreCoupon()
                        }
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={() => {
                                onRefresh()
                            }}
                        />
                    }
                    onMomentumScrollBegin={() => onEndReachedCalledDuringMomentum = false}
                    ListFooterComponent={renderFooter}
                />
            </View>

        </View>
    )
}
export default CouponScreen16