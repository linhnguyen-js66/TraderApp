import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList } from "react-native"
import styles from './style'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../navigation/screen'
import { HeaderCustom, Score } from '../../components/HeaderCustom'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
const Data = [
    {
        id: 1,
        title: "Tin tức về thị trường ngày 31/12/2020",
        image: "../../image/traidat.jpg",
        time: '31/12/2020',
        description: "Đây là vài dòng sơ qua về bài viết này mỗi bài báo chỉ được review còn nhiều lắm muốn biết phải mua báo mà đọc không thì click vào"
    },
    {
        id: 2,
        title: 'Tin tức về thị trường ngày 01/01/2021 xem đi',
        image: "../../image/traidat.jpg",
        time: '01/01/2021',
        description: "Đây là vài dòng sơ qua về bài viết này mỗi bài báo chỉ được review còn nhiều lắm muốn biết phải mua báo mà đọc không thì click vào"
    },
    {
        id: 3,
        title: 'Tin tức về chứng khoán Hot nhất',
        image: "../../image/traidat.jpg",
        time: '23/12/2020',
        description: "Đây là vài dòng sơ qua về bài viết này mỗi bài báo chỉ được review còn nhiều lắm muốn biết phải mua báo mà đọc không thì click vào"
    }
    // {
    //     id: 4,
    //     title: 'Tin tức về thị trường ngày 01/01/2021 xem đi',
    //     image: "../../image/traidat.jpg",
    //     time: '01/01/2021',
    //     description: "Đây là vài dòng sơ qua về bài viết này mỗi bài báo chỉ được review còn nhiều lắm muốn biết phải mua báo mà đọc không thì click vào"
    // },
    // {
    //     id: 5,
    //     title: 'Tin tức về thị trường ngày 01/01/2021 xem đi',
    //     image: "../../image/traidat.jpg",
    //     time: '01/01/2021',
    //     description: "Đây là vài dòng sơ qua về bài viết này mỗi bài báo chỉ được review còn nhiều lắm muốn biết phải mua báo mà đọc không thì click vào"
    // }
]
const ListHorizontal = ({ data, onPress }) => {
    const {name,image} = data
    return (
        <TouchableOpacity style={{ marginLeft: 16 }}>
            <View>
                <Image source={{uri:image}} style={styles.imageList} />
                <View style={{position: 'absolute'}}>
                    <Text style={styles.title}>
                        {name.substring(0, 50)}...
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const List3 = ({ data, onPress }) => {
    const { image, title, description, time } = data
    return (
        <TouchableOpacity style={{ flexDirection: 'row', marginBottom: 16 }}
            onPres={onPress}
        >
            <View style={{ height: 80 }}>
                <Image source={require('../../image/sing.jpg')} style={styles.imageList3} />
            </View>
            <View style={styles.descrptionList3}>
                <Text style={styles.titleFirst}>{title}</Text>
                <Text style={styles.detailList3}>{time}</Text>
                <Text style={styles.detailList3}>
                    {description.substring(0, 40)} ...
                </Text>
            </View>
        </TouchableOpacity>
    )
}
const NewsScreen = () => {
    const navigation = useNavigation()
    let uid = auth().currentUser.uid
    const [dataNewsHorizontal,setDataNewsHorizontal] = useState([])
    const getNewsHorizontal = async () => {
        let resultData = []
        let d = new Date()
        let ngay = d.getDate()
        let thang = d.getMonth() + 1
        let nam = d.getFullYear();
        let today = `${nam}-${thang}-${ngay}`
        let snapshot = await firestore().collection("DataNews").orderBy('Dating').startAfter(today).limit(4).get()
        snapshot.docs.map(item => resultData.push(item.data()))
        setDataNewsHorizontal(resultData)
        console.log(dataNewsHorizontal.length)
    }
    useEffect(()=>{getNewsHorizontal()},[])
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.header}>
                <HeaderCustom uid={uid}/>
                <Score />
            </View>
            {/* List1 */}
            <View style={{marginTop:16}}>
                <FlatList
                    data={dataNewsHorizontal}
                    horizontal={true}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => <ListHorizontal data={item}/>}
                />
            </View>
            {/* List3 */}
            <View style={{ marginHorizontal: 16,flex:1,marginTop:16}}>
                <FlatList
                    data={Data}
                    renderItem={({ item, index }) => <List3 data={item}
                        onPress={() => navigation.navigate(screen.DetailNewScreen)}
                    />}
                />
            </View>
        </View>
    )
}

export default NewsScreen