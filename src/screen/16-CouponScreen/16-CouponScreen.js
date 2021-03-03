import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, Dimensions } from "react-native"
import { Icon } from 'react-native-elements'
import styles from './style'
import HeaderView from '../../components/Header'
let DataCoupon = [
    {
        id:1,
        name:"Cửa hàng Nike",
        detail:"Giảm giá đến 20% toàn bộ các sản phẩm: giày dép, quần áo,...",
        discount:20,
        time:"20/02/2021",
        img:require('../../image/nike.jpg')
    },
    {
        id:2,
        name:"Adidas HVN",
        detail:"Giảm giá khủng lên đến 50% toàn bộ các sản phẩm",
        discount:50,
        time:"27/02/2021",
        img:require('../../image/das.jpg')
    },
    {
        id:3,
        name:"Zara Vincom Bà Triệu",
        detail:"Mua sắm thả ga giảm giá 30% cho toàn bộ sản phẩm tại của hàng",
        discount:30,
        time:"20/02/2021",
        img:require('../../image/zara.jpg')
    },
    {
        id:4,
        name:"Vans off the wall",
        detail:"Hãy sắm cho mình những đôi giày mới cho mùa Tết này nhé !",
        discount:20,
        time:"20/02/2021",
        img:require('../../image/vans.png')
    },
]
const ListCoupon = ({item,index}) => {
    return (
        <View style={[{flex:1,marginLeft:16,marginBottom:16},index % 2 == 1 && { marginRight: 16 }]}>
            <Image source={item.img} style={styles.imgCoupon} /> 
            <TouchableOpacity style={styles.containDetail}>
                <Text style={styles.nameStore}>{item.name}</Text>
                <Text style={styles.detail}>{item.detail}</Text>
                <View style={styles.hansd}>
                    <Text style={styles.texthansd}>Hạn sử dụng</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.codeCoupon}>
                <Text style={styles.textCoupon}>{item.discount}%</Text>
            </View>     
        </View>
    )
}
const CouponScreen16 = () => {
    return (
        <View style={{ backgroundColor: 'white',flex:1}}>
             <View style={styles.header}>
                <View style={{ marginTop: 4 }}>
                    <HeaderView name="chevron-left" type="entypo" />
                </View>
                <Image source={require('../../image/logo.png')} style={styles.ImageLogo} />
            </View>
            <ScrollView>
                <View style={{marginTop:16}}>
                   <FlatList
                    data={DataCoupon}
                    keyExtractor={item => item.id}
                    renderItem={({item,index})=><ListCoupon item={item} index={index}/>}
                    numColumns={2}
                   />
                </View>
            </ScrollView>
        </View>
    )
}
export default CouponScreen16