import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, Dimensions } from "react-native"
import { Icon } from 'react-native-elements'
import styles from './style'
import { HeaderCustom, Score } from '../../components/HeaderCustom'
import HeaderView from '../../components/Header'
const DetailCoupon17 = () => {
    return (
        <View>
            <ScrollView>
                <View style={styles.containHead}>
                    <HeaderView name="close" type="antdesign" />
                    <Text style={styles.containTextView}>Mã giảm giá</Text>
                </View>
                <View style={styles.containImg}>
                    <Image source={require('../../image/nike.jpg')} style={styles.img} />
                    <View style={styles.detailCoupon}>
                        <View style={styles.contaiNameStore}>
                            <Text style={styles.name}>Cửa Hàng Nike</Text>
                            <Text style={styles.detail}>
                                Giảm giá đến 20% toàn bộ các sản phẩm: giày dép, quần áo,...
                        </Text>
                        </View>
                        <View style={styles.containHansd}>
                            <Text style={styles.hansd}>Hạn sử dụng</Text>
                            <Text style={styles.time}>20/02/2021</Text>
                        </View>
                        <TouchableOpacity style={styles.containButton}>
                            <Text style={styles.textreceive}>Nhận</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}
export default DetailCoupon17