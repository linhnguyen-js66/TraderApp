import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, Alert } from "react-native"
import styles from './style'
import HeaderView from '../../components/Header'
import { Icon } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../navigation/screen'
import auth from '@react-native-firebase/auth'

const ListProduct = ({ item, onPress, index }) => {
    return (
        <TouchableOpacity style={{ elevation: 0.5 }}
          onPress={onPress}
          key={item.id}
        >
            <Image source={{ uri: item.image }}
                style={[styles.img,
                index == 1 && { borderTopRightRadius: 10 },
                index == 2 && { borderBottomLeftRadius: 10 },
                index == 0 && { borderTopLeftRadius: 10 },
                index == 3 && { borderBottomRightRadius: 10 }
                ]} />
        </TouchableOpacity>
    )
}
const SavePostScreen23 = ({navigation}) => {
    let uid = auth().currentUser.uid
    const [Refresh,setRefresh] = useState([])
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
           setRefresh([])
        });
        return unsubscribe;
    }, [navigation])

    // const navigation = useNavigation()
    const [DataSave, setDataSave] = useState([])
    const [DataPost, setDataPost] = useState([])
    const DataPostSaved = async () => {
        let resultProduct = []
        let resultPost = []
        let snapshot = await firestore().collection("DataSavedPost").where('user', '==', uid).get()
        snapshot.docs.map(item => {
            if (item.data().idType == 1) {
                resultProduct.push(item.data())
            }
            else if (item.data().idType == 2) {
                resultPost.push(item.data())
            }
        })
        setDataPost(resultPost)
        setDataSave(resultProduct)
    }

    useEffect(() => {
        DataPostSaved()
   
    }, [Refresh])
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {/**Header */}
            <View style={styles.header}>
                <View style={{ marginTop: 4 }}>
                    <HeaderView name="chevron-left" type="entypo"
                        onPress={() => navigation.goBack()}
                    />
                </View>
                <Image source={require('../../image/logo2.png')} style={styles.ImageLogo} />
            </View>
            {/**End */}
            <Text style={styles.category}>Tất cả các mặt hàng</Text>
            <View style={{ marginHorizontal: 16, marginTop: 16 }}>
                <FlatList
                    data={DataSave}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => <ListProduct item={item} data={DataSave} index={index} 
                       onPress={()=>navigation.navigate(screen.DetailSavePost24,{
                           type:item.idType
                       })}
                    />}
                    numColumns={2}
                />
            </View>
            <Text style={styles.category}>Tất cả các bài viết</Text>
            <View style={{ marginHorizontal: 16, marginTop: 16 }}>
                <FlatList
                    data={DataPost}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => <ListProduct item={item} data={DataSave} index={index} 
                    onPress={()=>navigation.navigate(screen.DetailSavePost24,{
                        type:item.idType
                    })}
                    />}
                    numColumns={2}
                />
            </View>
        </View>
    )
}
export default SavePostScreen23