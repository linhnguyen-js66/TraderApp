import React, { useEffect, useState } from 'react'
import { TextInput, ToastAndroid } from 'react-native'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, Dimensions, Switch } from "react-native"
import { Icon } from 'react-native-elements'
import styles from './style'
import HeaderView from '../../components/Header'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../navigation/screen'
import { fontSize, palette } from '../../theme'
import auth from '@react-native-firebase/auth'
import firestore from "@react-native-firebase/firestore"

const ListInfo = ({ item, data }) => {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.containInfo}>
                <Image source={require('../../image/email.png')} style={styles.icon} />
                <Text style={styles.infotext}>{item.email}</Text>
            </View>
            <View style={styles.containInfo}>
                <Image source={require('../../image/setting.png')} style={styles.icon} />
                <Text style={styles.infotext}>{item.type}</Text>
            </View>
            <View style={styles.containInfo}>
                {item.type == "Cá nhân" ?
                <Image source={require('../../image/point.png')} style={styles.icon} />
                :
                <Image source={require('../../image/money.webp')} style={styles.icon} />
                 }
                
                <Text style={styles.infotext}>{item.type == "Cá nhân" ? item.count : item.money+' VNĐ'}</Text>
            </View>
            {item.type == "Cá nhân" && <View style={styles.containInfo}>
                <Image source={require('../../image/coupon.png')} style={styles.icon} />
                <Text style={styles.infotext}>Ví voucher</Text>
            </View>}

            <TouchableOpacity style={styles.containInfo}>
                <Image source={require('../../image/save.png')} style={styles.icon} />
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={styles.infotext}>Đã lưu</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <Icon name="right" type="antdesign" size={15} color="grey" />
                    </View>

                </View>
            </TouchableOpacity>
            {
                item.type == "Công ty" && <View>
                    <TouchableOpacity style={styles.containInfo}
                        onPress={() => item.money >= 0
                            ?
                            navigation.navigate(screen.UploadCart21)
                            : console.log("Không thể sang trang khác")
                        }
                    >
                        <Image source={require('../../image/buy.png')} style={styles.icon} />
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <Text style={styles.infotext}>Đăng bán</Text>
                            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                                <Icon name="right" type="antdesign" size={15} color="grey" />
                            </View>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.containInfo}
                        onPress={() => {
                            navigation.navigate(screen.HistoryUpload25)
                        }}
                    >
                        <Image source={require('../../image/sanpham.png')} style={styles.icon} />
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <Text style={styles.infotext}>Lịch sử đăng bán</Text>
                            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                                <Icon name="right" type="antdesign" size={15} color="grey" />
                            </View>

                        </View>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}
const AccounSetting18 = () => {
    const navigation = useNavigation()
    const [DataUser, setDataUser] = useState([])

    const uid = auth().currentUser.uid
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    //Lấy thông tin người dùng
    const getInformation = async (uid) => {
        try {
            let result = []
            let reponse = await firestore().collection("UserInformation").where("uid", "==", uid).get()
            for (let data of reponse.docs) {
                result.push(data.data())
            }
            setDataUser(result)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getInformation(uid)
    },
        [])
    return (
        <View style={{ flex: 1, backgroundColor: palette.white }}>
            <View style={styles.header}>
                <View style={{ marginTop: 4 }}>
                    <HeaderView name="chevron-left" type="entypo"
                        onPress={() => navigation.goBack()}
                    />
                </View>
                <Image source={require('../../image/logo.png')} style={styles.ImageLogo} />
            </View>
            <ScrollView>
                <View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(screen.CouponScreen)}
                    >
                        <View style={styles.containTS}>
                            <Text style={styles.titleTS}>Mã khuyến mại</Text>
                            <Image source={require('../../image/coin.png')} style={styles.imgcoin} />
                        </View>
                    </TouchableOpacity>
                    {DataUser.map(data => <View>
                        <View style={styles.containava}>
                            <Image source={{ uri: data.ava }} style={styles.imgava} />
                            <Text style={styles.titleName}>{data.name}</Text>
                        </View>
                        <Text style={styles.info}>THÔNG TIN TÀI KHOẢN</Text>
                        <View style={styles.contain}>
                            <ListInfo item={data} />
                        </View>


                    </View>
                    )}
                    <Text style={styles.info}>CÀI ĐẶT</Text>
                    <View style={styles.containerSwitch}>
                        <Text style={styles.titleSwitch}>Bật thông báo</Text>
                        <View style={styles.buttonSwitch}>
                            <Switch
                                trackColor={{ false: "#767577", true: "#33cc33" }}
                                thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'row', flex: 1, marginHorizontal: 32, marginTop: 16, marginBottom: 32 }}>
                        <Text style={{ color: palette.grey, fontSize: fontSize[4] }}>Đổi mật khẩu</Text>
                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginRight: 20 }}>
                            <Icon name="right" type="antdesign" size={15} color="grey" />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>


        </View>
    )
}
export default AccounSetting18