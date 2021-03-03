import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, Dimensions } from "react-native"
import styles from './style'
import { Score } from '../../components/HeaderCustom'
import HeaderView from '../../components/Header'
import ButtonForm from '../../components/ButtonForm'
const DetailLessonScreen = () => {
    return (
        <ScrollView>
            {/* Header */}
            <View style={{ flexDirection: 'row', flex: 1, marginHorizontal: 16, marginTop: 8 }}>
                <View style={{ marginTop: 4 }}>
                    <HeaderView name="close" type="font-awesome" />
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Score />
                </View>
            </View>
            {/*body*/}
            <View style={styles.containCover}>
                <Image source={require('../../image/sing.jpg')} style={styles.imageCover} />
            </View>
            {/*Lesson*/}
            <View style={styles.lesson}>
                <Text style={styles.title}>Kênh đầu tư ưa thích của bạn là gì?</Text>
                <Text style={styles.descrip}>
                    Chào mừng bạn đến với nền tảng đào tạo và thực
                    hành đầu tư tài chính. Sau đây là một số kênh đầu tư
                    mà bạn đã từng nghe tới hoặc đã từng đầu tư vào.
                    Hãy cho chúng tôi biết những kênh đầu tư ưa thích
                    của bạn:{`\n`}
                    Kết thúc năm 2020 cũng là lúc thế giới và Việt Nam đã trải qua hơn
                     300 ngày đối mặt với vô số thách thức. Trong cuộc chiến chống Covid-19,
                     Việt Nam nổi lên như một kỳ tích khi là một trong số ít nước kiểm soát
                     thành công dịch bệnh nhanh chóng, quay về các hoạt động kinh tế - xã hội
                     bình thường. Nhiều tổ chức trong nước và quốc tế đã đưa ra các dự báo
                     tăng trưởng tích cực đối với Việt Nam. Điển hình, Ngân hàng Phát triển
                     châu Á (ADB) đã nâng mức dự báo tăng trưởng kinh tế Việt Nam lên mức 2,3%
                     trong năm 2020. Viện Nghiên cứu Kinh tế và Chính sách (VEPR) dự báo Việt Nam
                     có thể đạt mức tăng trưởng cả năm 2,8%.
                </Text>
            </View>
            <View style={styles.ButtonForm}>
                <ButtonForm title="Bài tiếp" />
            </View>
        </ScrollView>
    )
}

export default DetailLessonScreen