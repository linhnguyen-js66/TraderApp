import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, Dimensions } from "react-native"
import { Icon } from 'react-native-elements'
import styles from './style'
import { HeaderCustom, Score } from '../../components/HeaderCustom'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../navigation/screen'
import { palette } from '../../theme'
import auth from '@react-native-firebase/auth'
import firestore from "@react-native-firebase/firestore"
let Data = [
    {
        id: 1,
        name: 'Tài khoản'
    },
    {
        id: 2,
        name: "Email"
    },
    {
        id: 3,
        name: "Điểm"
    },
    {
        id: 4,
        name: "Mã giảm giá"
    },
    {
        id: 5,
        name: "Đã lưu"
    }
]
const ListInfo = ({ item, data }) => {
    const { name, id } = item
    const {count, email, type} = data
    return (
        <View style={{ flex: 1 }}>
            {name !== "Đã lưu" ?
                <View style={{ flex: 1 }}>
                    <View style={styles.containTK} key={id}>
                        <Text style={styles.titleTK}>{item.name}</Text>
                        <View style={{ alignItems: 'flex-end', flex: 1 }}>
                            <Text style={styles.descrip}>{}</Text>
                        </View>
                    </View>
                    <View style={styles.line}></View>
                </View> :
                <TouchableOpacity style={styles.containTK}>
                    <Text style={styles.titleTK}>Đã lưu</Text>
                    <View style={{ alignItems: 'flex-end', flex: 1 }}>
                        <Icon name="right" type="antdesign" color="grey" />
                    </View>
                </TouchableOpacity>
            }

        </View>
    )
}
const AccounSetting18 = () => {
    const navigation = useNavigation()
    const [DataUser, setDataUser] = useState([])
    
    const uid = auth().currentUser.uid
    
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
                <HeaderCustom uid={uid}/>
                <Score />
            </View>
            <ScrollView>
                <View>
                    <TouchableOpacity style={{ backgroundColor: palette.backgroundlightGreen }}>
                        <View style={styles.containTS}>
                            <Text style={styles.titleTS}>Tài sản</Text>
                            <Image source={require('../../image/coin.png')} style={styles.imgcoin} />
                        </View>
                    </TouchableOpacity>
                    {DataUser.map(data => <View>
                          <View style={styles.containava}>
                            <Image source={require("../../image/robot.png")} style={styles.imgava} />
                            <Text style={styles.titleName}>{data.name}</Text>
                        </View>
                        <View style={{ marginTop: 8, marginHorizontal: 16, marginBottom: 32 }}>
                        {/**Chưa hoàn thiện*/}
                    </View>
                    </View>
                      
                    )}
                    
                </View>
            </ScrollView>
        </View>
    )
}
export default AccounSetting18