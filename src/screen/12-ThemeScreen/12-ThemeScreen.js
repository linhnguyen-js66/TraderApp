import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList } from "react-native"
import styles from './style'
import HeaderView from '../../components/Header'
import ButtonForm from '../../components/ButtonForm'
import LikeAndComment from '../../components/LikeAndComment'
let DataPost = [
    {
        idUser: 1,
        idTheme: 1,
        status: "Cùng nhau thử tài dự đoán các mã sẽ tăng trưởng",
        time: "02/02/2021",
        img: require('../../image/sing.jpg'),
        amountComment: 1200,
        amountLike: 9331,
        id: 1
    },
    {
        idUser: 2,
        idTheme: 2,
        status: "Các bác cho em hỏi thuê ở khu vực rẻ nhưng sầm uất",
        time: "01/02/2021",
        img: require('../../image/coffeeshop4.jpg'),
        amountComment: 12,
        amountLike: 50,
        id: 2
    },
    {
        idUser: 3,
        idTheme: 3,
        status: "Cuốn sách hay về chiến lược marketing",
        time: "31/01/2021",
        img: require('../../image/marketing.jpg'),
        amountComment: 1200,
        amountLike: 9331,
        id: 3
    }
]
const ListPost = ({ item }) => {
    const { time, status, amountComment, amountLike, img } = item
    return (
        <View>
            {/**Avatar và tên người dùng */}
            <View style={styles.containAva}>
                <View>
                    <Image source={require('../../image/ava.png')} style={styles.imgAva} />
                </View>
                <View style={styles.containUserName}>
                    <Text style={styles.userName}>Trader-StartUp Club</Text>
                    <Text style={styles.date}>{time}</Text>
                </View>
            </View>
            {/**Status của người dùng */}
            <View style={styles.containStatus}>
                <Text style={styles.status}>
                    {status}
                </Text>
            </View>
            {/**Ảnh kèm theo*/}
            <View>
                <Image source={img} style={styles.imgPost} />
            </View>
            {/**Nút like bình luận*/}
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
            {/**Số lượng bình luận và lượt thích*/}
            <View style={styles.commentandlike}>
                <Text style={styles.like}>{amountLike.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} lượt thích</Text>
                <Text style={styles.comment}>Xem tất cả {amountComment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} bình luận</Text>
            </View>
        </View>
    )
}
const ThemeScreen12 = () => {
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <View style={{ marginTop: 4 }}>
                    <HeaderView name="chevron-left" type="entypo" />
                </View>
                <Image source={require('../../image/logo.png')} style={styles.ImageLogo} />
            </View>
            <ScrollView>
                <View style={styles.containHeader}>
                    <Image source={require('../../image/kienthuc.png')} style={styles.imageHeader} />
                    <View style={styles.containTextHead}>
                        <Text style={styles.text1}>Kiến thức cơ bản</Text>
                        <Text style={styles.text2}>
                            Hỏi đáp kiên thức cơ bản về kinh doanh
                    </Text>
                    </View>
                    <View style={{ marginHorizontal: 80, marginBottom: 16 }}>
                        <ButtonForm index={1} title="Đặt câu hỏi" />
                    </View>
                </View>
                <View style={styles.listpost}>
                    <FlatList
                        data={DataPost}
                        keyExtractor={item => item.id}
                        renderItem={({ item, index }) => <ListPost item={item} />}
                    />
                </View>
            </ScrollView>

        </View>
    )
}
export default ThemeScreen12