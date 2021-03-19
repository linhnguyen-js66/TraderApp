import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, Image, FlatList, Alert, ActivityIndicator, RefreshControl,AsyncStorage} from "react-native"
import styles from './style'
import HeaderView from '../../components/Header'
import { palette } from '../../theme'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../navigation/screen'
import auth from '@react-native-firebase/auth'

const ListCoupon = ({ item, index, onPress, product }) => {
    return (
        item.saved == false && (
            <View style={[{ flex: 1, marginLeft: 16, marginBottom: 16 },
            index % 2 == 1 && { marginRight: 16 },
            product.length % 2 !== 0 || index == product.length - 1 ? { width: 180, flex: 0 } : null
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

const YourCouponScreen26 = () => {
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
    const getDataUser = async () => {
        let resultData = []
        let snapshot = await firestore().collection("UserInformation").where("uid", '==', uid).get()
        snapshot.docs.map(item => resultData.push(item.data()))
        setDataUser(resultData)
        setCreatedAccount(resultData[0].createdAt)
    }
    const getDataCoupon = async () => {
        setIsLoading(true)
        let snapshot = await firestore().collection("OwnerCoupon").orderBy('id').limit(3).get()
        if (!snapshot.empty) {
            let listPost = []
            //Date
            let date = createdAccount
            let dateOn = new Date(date)
            dateOn.setDate(dateOn.getDate() + 30)
            let expiry = dateOn

            let currentTime = new Date()
            let resultData
            setLastDoc(snapshot.docs[snapshot.docs.length - 1])
            await firestore().collection("OwnerCoupon").orderBy('id').limit(3).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    listPost.push({...doc.data(), saved: false })
                    resultData = listPost
                
                    //Expiry
                    for (let data = 0; data < resultData.length; data++) {
                        if (resultData[data].idCategory == "special") {
                            if (expiry < currentTime == true) {
                                resultData[data].saved = true
                            }
                        }
                    }
                
                   
                })
            })

            setDataCoupon(resultData)
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
                let snapshot = await firestore().collection("OwnerCoupon").orderBy('id').limit(3).startAfter(lastDoc.data().id).get()
                if (!snapshot.empty) {
                    let listPost = DataPost
                    let date = createdAccount
                    let dateOn = new Date(date)
                    dateOn.setDate(dateOn.getDate() + 30)
                    let expiry = dateOn
                    let currentTime = new Date()
                    let resultData 
                    setLastDoc(snapshot.docs[snapshot.docs.length - 1])
                    await firestore().collection("OwnerCoupon").orderBy('id').limit(3).startAfter(lastDoc.data().id).get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            listPost.push({...doc.data(), saved: false })
                            resultData = listPost.filter(item => item.uid == uid)
                            //Expiry
                            for (let data = 0; data < resultData.length; data++) {
                                if (resultData[data].idCategory == "special") {
                                    if (expiry < currentTime == true) {
                                        resultData[data].saved = true
                                    }
                                }
                            }
                            
                        })
                    })


                    setDataCoupon(resultData)
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

export default YourCouponScreen26