import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, ActivityIndicator, RefreshControl } from "react-native"
import { Icon } from 'react-native-elements'
import styles from './style'
import HeaderView from '../../components/Header'
import { fontSize, palette } from '../../theme'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../navigation/screen'
import auth from '@react-native-firebase/auth'
import SearchInput from '../../components/SearchInput'
const ListProduct = ({ data, index, onPress, product, clickDelete }) => {
    const { id, name, price, image, idCategory } = data

    return (
        <View
            key={id}
            style={[
                styles.container,
                index % 2 !== 0 && { marginRight: 16 },
                product.length % 2 !== 0 && index == product.length - 1 ? { width: 185, flex: 0 } : null
            ]}

        >
            <Image source={{ uri: image }} style={styles.imgList} />
            <TouchableOpacity style={{ position: 'absolute', alignSelf: 'flex-end' }}
                onPress={clickDelete}
            >
                <Icon reverse name="close" type="antdesign" reverseColor="white" color="tomato" size={10} />
            </TouchableOpacity>
            {idCategory == 'coupon'
                && <Image source={require('../../image/mark.png')} style={styles.mark} />
            }
            <TouchableOpacity style={styles.containDetail}>
                {idCategory == 'coupon' ? <Text style={[styles.textDetail, { fontWeight: 'bold' }]}>
                    {name}
                </Text> :
                    <Text style={styles.textDetail}>
                        {name.substring(0, 40)}
                    </Text>}
                <View style={{ flex: 1, justifyContent: 'flex-end', marginVertical: 8 }}>
                    <Text style={[styles.textPrice, idCategory == 'coupon' && { fontSize: 20 }]}>
                        {price}
                    </Text>
                </View>

            </TouchableOpacity>
        </View>
    )
}

const HistoryUpload25 = () => {

    const navigation = useNavigation()
    const [limit, setLimit] = useState(20)
    //Hiển thị các sản phẩm trong DataProduct
    let onEndReachedCalledDuringMomentum = false;
    const [isLoading, setIsLoading] = useState(false);
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const [lastDoc, setLastDoc] = useState(null);
    const [restaurants, setRestaurants] = useState([]);

    let restaurantsRef = firestore().collection('DataCompany')

    useEffect(() => {
        getRestaurants();
    }, []);

    const getRestaurants = async () => {
        setIsLoading(true);

        const snapshot = await restaurantsRef.orderBy('id').limit(limit).get();

        if (!snapshot.empty) {
            let newRestaurants = [];
            setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
            await restaurantsRef.orderBy('id').limit(limit).get().then(querySnapshot =>
                querySnapshot.forEach(doc => newRestaurants.push({ idItem: doc.id, ...doc.data() })))
            setRestaurants(newRestaurants);
        } else {
            setLastDoc(null);
        }

        setIsLoading(false);
    }

    const getMore = async () => {
        if (lastDoc) {
            setIsMoreLoading(true);

            setTimeout(async () => {
                let snapshot = await restaurantsRef.orderBy('id').startAfter(lastDoc.data().id).limit(limit).get();

                if (!snapshot.empty) {
                    let newRestaurants = restaurants;

                    setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

                    await restaurantsRef.orderBy('id').startAfter(lastDoc.data().id).limit(limit).get().then(querySnapshot =>
                        querySnapshot.forEach(doc => newRestaurants.push({ idItem: doc.id, ...doc.data() })))

                    setRestaurants(newRestaurants);

                    if (snapshot.docs.length < 3) setLastDoc(null);
                } else {
                    setLastDoc(null);
                }

                setIsMoreLoading(false);
            }, 1000);
        }

        onEndReachedCalledDuringMomentum = true;
    }
    const onRefresh = () => {

        setTimeout(() => {
            getRestaurants();
        }, 1000);

    }

    const renderFooter = () => {
        if (!isMoreLoading) return true;
        return (
            <ActivityIndicator
                size='large'
                color={palette.buttonColor}
                style={{ marginBottom: 32 }}
            />
        )
    }
    //Sắp xếp theo giá cả

    let uid = auth().currentUser.uid
    const clickDeleteItem = async (id, type) => {
        try {
            let resultData = restaurants

            let arrAfterDelete = resultData.filter(item => item.idItem !== id)
            setRestaurants(arrAfterDelete)
            await firestore().collection("DataCompany").doc(id).delete()
            if (type == 1) {
                await firestore().collection("DataProduct").doc(id).delete()
            }
            else if (type == 2) {
                await firestore().collection("Address").doc(id).delete()
            }
            else if (type == 3) {

                await firestore().collection("Coupon").doc(id).delete()
            }

        } catch (err) {
            console.log(err)
        }

    }
    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            {/**Header */}
            <View style={styles.header}>
                <View style={{ marginTop: 4 }}>
                    <HeaderView name="chevron-left" type="entypo"
                        onPress={() => navigation.goBack()}
                    />
                </View>
                <Image source={require('../../image/logo2.png')} style={styles.ImageLogo} />
            </View>
            <View style={{ marginLeft: 16, marginTop: 16, flexDirection: 'row' }}>
                <Text style={{
                    alignSelf: 'center',
                    fontSize: 15
                }}>Tìm kiếm</Text>
                <View style={{ flex: 1, marginLeft: 16 }}>
                    <SearchInput placeholder="Nhập từ khóa cần tìm kiếm..." />
                </View>
            </View>

            <View style={{ marginTop: 8, marginBottom: 120 }}>
                <FlatList
                    data={restaurants}
                    marginBottom={32}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => <ListProduct
                        data={item}
                        index={index}
                        product={restaurants}
                        clickDelete={() => {
                            clickDeleteItem(item.id, item.type)
                        }}
                    />}
                    numColumns={2}
                    onEndReachedThreshold={1}

                    onEndReached={() => {
                        if (!onEndReachedCalledDuringMomentum && !isMoreLoading) {
                            getMore()
                        }
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={() => {
                                onRefresh()
                                console.log("refresh")
                            }}
                        />
                    }
                    onMomentumScrollBegin={() => { onEndReachedCalledDuringMomentum = false; }}
                    ListFooterComponent={renderFooter}
                //headerComponent

                />


            </View>

            <View style={styles.containButtonUp}>
                <TouchableOpacity style={styles.buttonUp}>
                    <Icon name="up" type="antdesign" size={30} style={styles.iconUp} color={palette.grey} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default HistoryUpload25