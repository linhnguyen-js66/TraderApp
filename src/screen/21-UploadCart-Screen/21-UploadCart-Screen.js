import React, { useEffect, useState } from 'react'
import { TextInput, ToastAndroid } from 'react-native'
import { Text, View, ScrollView, TouchableOpacity, Image, Alert, Picker } from "react-native"
import { Icon } from 'react-native-elements'
import styles from './style'
import HeaderView from '../../components/Header'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../navigation/screen'
import auth from '@react-native-firebase/auth'
import firestore from "@react-native-firebase/firestore"
import InputForm from '../../components/InputForm'
import ButtonForm from '../../components/ButtonForm'
import { launchImageLibrary } from 'react-native-image-picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const Data = [
    {
        id: 1,
        name: 'Sản phẩm'
    },
    {
        id: 2,
        name: 'Nhà cho thuê'
    },
    {
        id: 3,
        name: "Mã khuyến mại"
    }
]
let Address = [
    {
        id: 5,
        name: 'Cầu Giấy'
    },
    {
        id: 15,
        name: 'Bắc Từ Liêm'
    },
    {
        id: 17,
        name: 'Hà Đông'
    },
    {
        id: 9,
        name: 'Thanh xuân'
    }
]
let TypeProduct = [
    {
        id: 1,
        name: 'Đồ dùng'
    },
    {
        id: 2,
        name: 'Quần áo'
    }
]
const ListType = ({ item, onPress, colorType }) => {
    return (

        <TouchableOpacity style={[styles.Type, colorType == item.id && { backgroundColor: 'tomato' }]} onPress={onPress}>
            <Text style={styles.titleType} key={item.id}>{item.name}</Text>
        </TouchableOpacity>

    )
}
const UploadCart21 = () => {
    const navigation = useNavigation()
    const [colorType, setColorType] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [endTime, setEndTime] = useState('')
    //Upload item 
    const [photo, setPhoto] = useState(null)
    //lấy avatar 
    const handleChoosePhoto = () => {
        const options = {
            noData: true
        }
        launchImageLibrary(options, response => {
            if (response.uri) {
                setPhoto(response.uri)
            }
        })
    }
    function makeID() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text
    }
    let itemID = makeID()
    const UploadItemsDataProductOfCompany = async () => {
        if (name.trim() == "" || address.trim() == "" || price.trim() == "" || phone.trim() == "" || description.trim() == "" || endTime.trim() == "" || photo == null) {
            Alert.alert("Thông báo", "Thông tin còn trống", [
                {
                    text: "Tiếp",
                    onPress: () => console.log("cancel")
                },
                {
                    text: "Hủy",
                    onPress: () => navigation.navigate(screen.AccountSetting)
                }
            ])
        }
        else {
            try {

                let d = new Date()
                let ngay = d.getDate()
                let thang = d.getMonth() + 1
                let nam = d.getFullYear();
                let uid = auth().currentUser.uid
                let newItem = {
                    idCategory: colorType == 1 ? pickerProduct : colorType == 2 ? pickerAddress : "coupon",
                    image: photo,
                    content: description,
                    uid: uid,
                    adress: address,
                    id: itemID,
                    name: name,
                    phone: phone,
                    price: price,
                    dateof: endTime,
                    dateon: `${nam}/${thang}/${ngay}`,
                    type: colorType
                }
                if (colorType == 1) {
                    await firestore().collection("DataProduct").doc(itemID).set(newItem)
                }
                else if (colorType == 2) {
                    await firestore().collection("Address").doc(itemID).set(newItem)
                }
                else if (colorType == 3) {
                    await firestore().collection("Coupon").doc(itemID).set(newItem)
                }
                await firestore().collection("DataCompany").doc(itemID).set(newItem)
                navigation.navigate(screen.AccountSetting)
            } catch (error) {
                console.log(error)
            }
        }
    }

    //Select Value Picker
    const [pickerAddress, setPickerAddress] = useState(Address[0].id)

    const [pickerProduct, setPickerProduct] = useState(TypeProduct[0].id)
    let uid = auth().currentUser.uid
    const [infomation, setInformation] = useState([])
    const getInformation = async () => {
        let result = []
        let snapshot = await firestore().collection('UserInformation').where('uid', '==', uid).get().then(querySnapshot =>
            querySnapshot.forEach(doc => {
                result.push({ id: doc.id, ...doc.data() })
            })
        )
        setInformation(result)
    }

    const getMoneyOfPost = async () => {
        let resultData = infomation
        let newMoney
        for(let i = 0; i < resultData.length; i++){
         newMoney = resultData[i].money - 5000
        }
        if(newMoney > 0){
          UploadItemsDataProductOfCompany()
          await firestore().collection("UserInformation").doc(uid).update({
            money:newMoney
        })  
        }
        else{
            Alert.alert("Thông báo","Bạn phải nạp thêm tiền để đăng bài")
            navigation.navigate(screen.AccountSetting)
        }
    }
 
    useEffect(() => {
        getInformation()
    }, [])
    return (
        <KeyboardAwareScrollView>
            {/**Header*/}
            <View style={styles.header}>
                <View style={{ marginTop: 4 }}>
                    <HeaderView name="chevron-left" type="entypo"
                        onPress={() => navigation.goBack()}
                    />
                </View>
                <View style={styles.containTitlePage}>
                    <Text style={styles.titlePage}>Đăng bài</Text>
                </View>
            </View>
            {/**end*/}
            {infomation.map(item => <View style={styles.containHeritage} key={item.id}>
                <Image source={require('../../image/coin.png')} style={styles.coin} />
                <Text style={styles.textHeritage}>
                    Số dư: {item.money} VNĐ
                </Text>
            </View>)}

            <ScrollView>
                <View style={styles.contain}>
                    <View>
                        {photo == null ?
                            <Image source={require('../../image/imageicon.png')} style={styles.imageIcon} />
                            :
                            <Image source={{ uri: photo }} style={styles.imageIcon} />
                        }

                        <TouchableOpacity style={styles.iconplus}
                            onPress={() => handleChoosePhoto()}
                        >
                            <Icon name="pluscircle" type="antdesign" color="tomato" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, marginLeft: 16 }}>
                        <InputForm placeholder="Tiêu đề:" onChangeText={(text) => setName(text)} />
                        <InputForm placeholder="Địa chỉ:" onChangeText={(text) => setAddress(text)} />
                    </View>
                </View>
                <View style={{ marginHorizontal: 16 }}>
                    <InputForm placeholder="Số điện thoại:" onChangeText={(text) => setPhone(text)} />
                    <View style={{ flexDirection: 'row', marginTop: 16 }}>
                        <Text style={{ fontSize: 17, color: 'grey' }}>Loại:</Text>
                        {Data.map(item => <ListType item={item} onPress={() => {
                            setColorType(item.id)
                        }}
                            colorType={colorType}
                        />)}
                    </View>
                    {
                        colorType == 2 &&
                        <Picker
                            selectedValue={pickerAddress}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(itemValue, itemIndex) => setPickerAddress(itemValue)}
                        >
                            {Address.map(item =>
                                <Picker.Item label={item.name} value={item.id} />
                            )}


                        </Picker>

                    }
                    {
                        colorType == 1 &&
                        <Picker
                            selectedValue={pickerProduct}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(itemValue, itemIndex) => setPickerProduct(itemValue)}
                        >
                            {TypeProduct.map(item =>
                                <Picker.Item label={item.name} value={item.id} />
                            )}


                        </Picker>

                    }
                    <InputForm placeholder="Giá:" onChangeText={(text) => setPrice(text)} />
                    <InputForm placeholder="Miêu tả:" onChangeText={(text) => setDescription(text)} />
                    <InputForm placeholder="Hạn sử dụng:(yyyy/mm/dd)" onChangeText={(text) => setEndTime(text)} />
                </View>
                <View style={{ marginBottom: 100, marginHorizontal: 16, marginTop: 40 }}>
                    <ButtonForm title="Đăng bài"
                        onPress={() => {
                            
                            getMoneyOfPost()
                        }}
                    />
                </View>
            </ScrollView>

        </KeyboardAwareScrollView>
    )
}

export default UploadCart21