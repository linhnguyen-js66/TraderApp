import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, Alert, TextInput } from "react-native"
import { Icon } from 'react-native-elements'
import styles from './style'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../navigation/screen'
import { palette } from '../../theme'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

const StatusScreen14 = ({route}) => {
    const [photo, setPhoto] = useState(null)
    const [status, setStatus] = useState("")
    
    const navigation = useNavigation()
    const {idType} = route.params
    const [type, setType] = useState(idType)
    //DataTheme
    const [DataTheme, setDataTheme] = useState([])
    const getDataTheme = async () => {
        let result = []
        let snapshot = await firestore().collection('Fields').get()
        snapshot.docs.map(item => result.push(item.data()))
        setDataTheme(result)
    }
    useEffect(()=>{
        getDataTheme()
    },[])
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
    function makeid() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text
    }

    const handleAddStatus = async () => {

        if (status == "") {
            Alert.alert("Thông báo", "Bạn có muốn tiếp tục đăng bài viết", [
                {
                    text: "Tiếp",
                    onPress: () => console.log("cancel")
                },
                {
                    text: "Hủy",
                    onPress: () => navigation.navigate(screen.QuestionScreen)
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
                let newStatus = {
                    createdAt: `${nam}/${thang}/${ngay}`,
                    theme: type,
                    image: photo,
                    idUserLike: [],
                    idUser: uid,
                    status: status,
                    idPost: makeid()
                }
                await firestore().collection("DataStatus").add(newStatus)

                navigation.navigate(screen.QuestionScreen)
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {/**header */}
            <View style={styles.headContain}>
                <TouchableOpacity style={styles.containTextCancel}
                    onPress={() => navigation.navigate(screen.QuestionScreen)}
                >
                    <Text style={styles.textCancel}>Hủy</Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Image source={require('../../image/logo.png')} style={styles.imgLogo} />
                </View>
                <TouchableOpacity style={styles.containTextPost}
                    onPress={() => {
                        handleAddStatus()
                    }}
                >
                    <Text style={styles.textPost}>Đăng</Text>
                </TouchableOpacity>
            </View>
            {/**Nhập trạng thái */}

            <TextInput
                multiline={true}
                style={styles.TextInput}
                placeholder="Đặt câu hỏi cho cộng đồng..."
                autoFocus={true}
                value={status}
                onChangeText={(text) => setStatus(text)}
            />

            {/**Nút thêm ảnh, thêm link */}
            <View style={styles.containFooter}>
                <View style={styles.containAdd}>
                    <TouchableOpacity style={styles.containAddImage}
                        onPress={() => handleChoosePhoto()}
                    >
                        <Icon name="image" type="feather" color="#595959" />
                        <Text style={styles.textAddImage}>Thêm ảnh</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.containAddLink}>
                        <Icon name="link" type="entypo" color="#595959" />
                        <Text style={styles.textAddLink}>Thêm link</Text>
                    </TouchableOpacity>
                </View>
                {photo !== null ? <View style={{ marginTop: 16, marginLeft: 16 }}>
                    <Image source={{ uri: photo }} style={styles.imgUpload} />
                    <TouchableOpacity style={styles.iconClose}
                        onPress={() => {
                            Alert.alert(
                                "Thông báo",
                                "Bạn có chắc muốn hủy tải ảnh ?",
                                [
                                    {
                                        text: "Tiếp",
                                        onPress: () => console.log("Cancel")
                                    },
                                    { text: "Hủy", onPress: () => setPhoto(null) }
                                ]
                            );

                        }}
                    >
                        <Icon name="close" type="antdesign" size={16} color="white" />
                    </TouchableOpacity>
                </View>
                    : null}
                <View style={styles.containTouchTheme}>
                    <Text style={styles.theme}>Chuyên mục</Text>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={DataTheme}
                        keyExtractor={item => item.id}
                        renderItem={({ item, index }) => <TouchableOpacity style={[styles.themeContain, type == item.id && { backgroundColor: palette.buttonColor }]}
                            onPress={() => setType(item.id)}
                        >
                            <Text key={item.id}
                                style={[styles.textTheme, type == item.id && {color:'white'}]}>{item.name}</Text>
                        </TouchableOpacity>}
                    />
                </View>
            </View>
            {/**end */}
        </View>
    )
}
export default StatusScreen14