import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, ActivityIndicator, RefreshControl, Picker } from "react-native"
import { Icon } from 'react-native-elements'
import styles from './style'
import { HeaderCustom } from '../../components/HeaderCustom'
import Score from '../../components/Score'
import { palette } from '../../theme'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../navigation/screen'
import auth from '@react-native-firebase/auth'
import { SliderBox } from "react-native-image-slider-box"
const Choose = [
    {
        id: 1,
        name: "Giá cả"
    },
    {
        id: 2,
        name: "Thời gian"
    }
]

let Type = [
    {
        id: 1,
        name: "Sản phẩm"
    },
    {
        id: 2,
        name: "Nhà cho thuê"
    }
]
let DataImage = [
    require('../../image/qcao1.png'),
    require('../../image/qcao2.png'),
    require('../../image/qcao3.jpg')
]
const ControlPicker = ({ onValueChange, Data, state, onClickSort }) => {
    return (
        <View>
            <View style={{ flexDirection: 'row' }}>

                <TouchableOpacity style={styles.containControlChoose}
                >
                    <Picker
                        selectedValue={state}
                        style={{ height: 50, width:100}}
                        onValueChange={onValueChange}
                    >
                        {Data.map(item =>
                            <Picker.Item label={item.name} value={item.id} />
                        )}


                    </Picker>
                </TouchableOpacity>

                <View style={styles.containSort}>
                    <Text style={styles.textChoose}>Sắp xếp</Text>
                    <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', marginRight: 16 }}
                      onPress={onClickSort}
                    >
                        <Icon name="arrow-long-up" type="entypo" size={15} color="#595959" />
                        <Icon name="arrow-long-down" type="entypo" size={15} color="#595959" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const ListProduct = ({ data, index, onPress }) => {
    const { id, name, price, image } = data
    return (
        <TouchableOpacity
            key={id}
            style={[styles.container, index % 2 !== 0 && { marginRight: 16 }]}
            onPress={onPress}
        >
            <Image source={{ uri: image }} style={styles.imgList} />
            <View style={styles.containDetail}>
                <Text style={styles.textDetail}>
                    {name.substring(0, 40)}...
                </Text>
                <View style={{ flex: 1,justifyContent: 'flex-end', marginVertical: 8}}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={styles.textPrice}>
                      {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+"đ"} 
                    </Text>
                    <Image source={require('../../image/shipping.png')} style={styles.iconShipping}/>
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    )
}

const MarketScreen15 = () => {
    const [colorType, setColorType] = useState("")
    const navigation = useNavigation()
    const [limit, setLimit] = useState(20)
    //Hiển thị các sản phẩm trong DataProduct
    let onEndReachedCalledDuringMomentum = false;
    const [isLoading, setIsLoading] = useState(false);
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const [lastDoc, setLastDoc] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const [ChooseType, setChooseType] = useState(Choose[0].id)
    const [clickSort,setClickSort] = useState(false)
    let restaurantsRef = colorType == 2 ? firestore().collection('Address') : firestore().collection('DataProduct');

    useEffect(() => {
        getRestaurants();
    }, []);

    const getRestaurants = async () => {
        setIsLoading(true);

        const snapshot = await restaurantsRef.orderBy('id').limit(limit).get();

        if (!snapshot.empty) {
            let newRestaurants = [];

            setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
       
            snapshot.docs.map(item => newRestaurants.push(item.data()))

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

                    snapshot.docs.map(item => newRestaurants.push(item.data()))

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
                style={{ marginBottom: 100 }}
            />
        )
    }
    //Sắp xếp theo giá cả
    function byDateUp(a, b) {
        //by month and then by day
        let d1 = new Date(a.dateon); // 1993-02-15T00:00:00Z =>   1993-02-14T20:00:00EST
        let d2 = new Date(b.dateon);

        return d2 - d1

    }
    function byDateDown(a, b) {
        //by month and then by day
        let d1 = new Date(a.dateon); // 1993-02-15T00:00:00Z =>   1993-02-14T20:00:00EST
        let d2 = new Date(b.dateon);

        return d1 - d2

    }
    const sortProduct = () => {
       if(ChooseType == 1){
           if(clickSort == false){
               restaurants.sort((a,b)=> b.price - a.price)
           }
           else{
            restaurants.sort((a,b)=> a.price - b.price)
           }
       }
       else{
           if(clickSort == false){
               restaurants.sort(byDateUp)
           }
           else{
               restaurants.sort(byDateDown)
           }
       }
    }
    
    let uid = auth().currentUser.uid
    
    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>

            {/**Header */}
            <View style={styles.header}>
                <HeaderCustom uid={uid} />
                <Score />
            </View>

            <View style={{ marginTop: 8 }}>
                <FlatList
                    data={restaurants}
                    marginBottom={32}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => <ListProduct
                        data={item}
                        index={index}
                        onPress={() => navigation.navigate(screen.AddressAndMarket, {
                            id: item.id
                        })}
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
                    ListHeaderComponent={() => <View>
                        {/**Controlbar */}
                        <SliderBox
                            images={DataImage}
                            sliderBoxHeight={200}
                            onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                            dotColor="#FFEE58"
                            inactiveDotColor="#90A4AE"
                            paginationBoxVerticalPadding={20}
                            autoplay
                            circleLoop
                        />
                        <View style={styles.containControl}>
                            <View style={{ justifyContent: 'center' }}>
                                <Image source={require('../../image/logo2.png')} style={styles.imgLogo} />
                            </View>
                            <View style={styles.control}>
                                <ControlPicker
                                    Data={Choose}
                                    onValueChange={(itemValue, itemIndex) => setChooseType(itemValue)}
                                    state={ChooseType}
                                    onClickSort={()=>{
                                        setClickSort(clickSort ? false : true)
                                        sortProduct()
                                    }}
                                />
                            </View>
                        </View>
                        {/**ListProduct */}
                        <View style={styles.containType}>
                            {Type.map(item =>
                                <TouchableOpacity key={item.id}
                                    style={[styles.type, colorType == item.id ? { backgroundColor: '#ffcc00' } : { backgroundColor: "#E5E5E5" }]}
                                    onPress={() => {

                                        colorType == item.id ? getRestaurants() : null
                                        setColorType(item.id)
                                    }}
                                >
                                    <Text style={styles.nametype}># {item.name}</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>}
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
export default MarketScreen15