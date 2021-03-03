import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList } from "react-native"
import styles from './style'
import HeaderView from '../../components/Header'
import { Icon } from 'react-native-elements'
const DetailNewsScreen = () => {
    return (
        <ScrollView>
            <View style={styles.header}>
                <View style={{ marginTop: 4 }}>
                <HeaderView name="chevron-left" type="entypo" />
                </View>
                <Image source={require('../../image/logo.png')} style={styles.ImageLogo} />
            </View>
            {/* HeadNews */}
            <View style={{ flex: 1 }}>
                <Image source={require('../../image/sing.jpg')} style={styles.imageCover} />
                <View style={styles.headNews}>
                    <Image source={require('../../image/logo2.png')} style={styles.imageLogo2} />
                    <View style={styles.calendar}>
                        <Icon type="font-awesome" name="calendar" size={20} color="#5C5B5B" />
                        <Text style={styles.datetime}>31/12/2020</Text>
                    </View>
                </View>
            </View>
            {/* TitleNews */}
            <View style={styles.containtitleNews}>
                <Text style={styles.titleNews}>Tin tức giao dịch ngày 31/12/2020</Text>
            </View>
            {/* ButtonLikeDislike */}
            <View style={styles.buttonLikeAndDis}>
                <TouchableOpacity style={styles.buttonLike}>
                    <Icon name="like1" type="antdesign" color="#5C5B5B" />
                    <Text style={styles.countLike}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ButtonDislike}>
                    <Icon name="dislike1" type="antdesign" color="#5C5B5B" />
                    <Text style={styles.countLike}>Không hay</Text>
                </TouchableOpacity>
            </View>
            {/* WriteNews */}
            <View style={styles.WriteNews}>
                <Text style={styles.WriteNewsTitle}>
                    Chào mừng bạn đến với nền tảng đào tạo và thực
                    hành đầu tư tài chính. Sau đây là một số kênh đầu tư
                    mà bạn đã từng nghe tới hoặc đã từng đầu tư vào.
                    Hãy cho chúng tôi biết những kênh đầu tư ưa thích
                    của bạn:{"\n"}
                    Kết thúc năm 2020 cũng là lúc thế giới và Việt Nam đã trải qua hơn 
                    300 ngày đối mặt với vô số thách thức. Trong cuộc chiến chống Covid-19,
                     Việt Nam nổi lên như một kỳ tích khi là một trong số ít nước 
                     kiểm soát thành công dịch bệnh nhanh chóng, quay về các hoạt động kinh tế - 
                     xã hội bình thường.
                    Nhiều tổ chức trong nước và quốc tế đã đưa ra các dự báo tăng trưởng 
                    tích cực đối với Việt Nam. Điển hình, Ngân hàng Phát triển châu Á 
                    (ADB) đã nâng mức dự báo tăng trưởng kinh tế Việt Nam lên mức 2,3% 
                    trong năm 2020. Viện Nghiên cứu Kinh tế và Chính sách (VEPR) dự báo
                     Việt Nam có thể đạt mức tăng trưởng cả năm 2,8%.
                </Text>
            </View>
        </ScrollView>
    )
}
export default DetailNewsScreen