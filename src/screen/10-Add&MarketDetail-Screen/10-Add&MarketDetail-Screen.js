import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList } from "react-native"
import styles from './style'
import HeaderView from '../../components/Header'
import { Icon } from 'react-native-elements'
import LikeAndComment from '../../components/LikeAndComment'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../navigation/screen'
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace'
const AddandMarketDetailScreen = ({ route }) => {
    const { id } = route.params
    const [renderItem, setRenderItem] = useState([])
    const navigation = useNavigation()
    const getDataFromFirebase = async () => {
        let resultData = []
        let snapshot = await firestore().collection("DataProduct").where("id", '==', id).get()
        if (snapshot.empty) {
            let trueSnapshot = await firestore().collection("Address").where("id", '==', id).get()
            trueSnapshot.docs.map(item => resultData.push(item.data()))
            setRenderItem(resultData)
        }
        else {
            snapshot.docs.map(item => resultData.push(item.data()))
            setRenderItem(resultData)
        }
    }
    useEffect(() => {
        getDataFromFirebase()
    }, [])

    return (
        <View style={{ flex: 1,backgroundColor:'white'}}>
            <View style={styles.header}>
                <View style={{ marginTop: 4 }}>
                    <HeaderView name="chevron-left" type="entypo" onPress={() => navigation.navigate(screen.MarketScreen)} />
                </View>
                <Image source={require('../../image/logo.png')} style={styles.ImageLogo} />
            </View>
            {/**Params*/}
            <FlatList
                data={renderItem}
                keyExtractor={item => item.id}
                nestedScrollEnabled={true}
                renderItem={({ item, index }) =>
                    <View>
                        <View>
                            <Image source={{ uri: item.image }} style={styles.imageCover} />
                        </View>
                        {/**Nút bình luận và like*/}
                        <View style={styles.containLikeandComment}>
                            <View>
                                <LikeAndComment name="hearto" type="antdesign" />
                            </View>
                            <View style={{ marginLeft: 16 }}>
                                <LikeAndComment name="chatbubble-outline" type="ionicon" style={{ transform: [{ rotateY: '180deg' }] }} />
                            </View>
                            <View style={{ marginLeft: 16 }}>
                                <LikeAndComment name="md-paper-plane-outline" type="ionicon" />
                            </View>
                        </View>
                        {/**Tiêu để */}
                        <View style={{ marginHorizontal: 16, marginVertical: 16 }}>
                            <Text style={styles.caption}>{item.name}</Text>
                            <Text style={styles.price}>{item.price}</Text>
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
                }
            />
            {renderItem.map(item => 
                            <View style={styles.footer}>
                            <View style={styles.containPhone}>
                                <Text style={[styles.detail, {alignSelf:'center',flex:1}]}>Điện thoại: {item.phone} </Text>
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