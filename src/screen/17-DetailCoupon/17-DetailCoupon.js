import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, RefreshControl} from "react-native"
import { Icon } from 'react-native-elements'
import styles from './style'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import HeaderView from '../../components/Header'
import { Alert } from 'react-native'

const CouponItem = ({item,onPress}) => {
    return(
        <View style={styles.containImg}>
            <View style={{
                width: '100%',
                height:610
            }}>
                  <Image source={{uri:item.image}} style={styles.img} />
            </View>
      
        <View style={styles.detailCoupon}>
            <View style={styles.contaiNameStore}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.detail}>
                   {item.content}. 
            </Text>
            <Text style={styles.detail}>
                   Áp dụng: {item.adress}
            </Text>
            </View>
            <View style={styles.containHansd}>
            
                <Text style={styles.hansd}>Hạn sử dụng</Text>
            {item.idCategory == "special" ? <Text style={styles.time}>{item.dateof.split("/").reverse().join("/")}</Text> 
            : <Text style={styles.time}>
                {item.dateon.split("/").reverse().join("/")} - {item.dateof.split("/").reverse().join("/")}
            </Text> 
            }   
            </View>
            <TouchableOpacity style={styles.containButton}
              onPress={onPress}
            >
                <Text style={styles.textreceive}>Nhận</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
}
const DetailCoupon17 = ({route}) => {
    const {
        idCP,
        id
    } = route.params
    const [DataCoupon,setDataCoupon] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    let uid = auth().currentUser.uid
    const getDataCoupon = async () => {
        try{
          setIsLoading(true)
          let coupon = []
          let snapshot = await firestore().collection("Coupon").where('id','==',id).get()
          if(!snapshot.empty){
              snapshot.docs.map(item => coupon.push(item.data()))
              setDataCoupon(coupon)
          }
          setIsLoading(false)
        }catch(error){
            console.log(error)
        }
    }
    const upDateUserReceive = async (item) => {
        try{
          await firestore().collection("Coupon").doc(idCP).update({
            idUserReceive: firestore.FieldValue.arrayUnion({uid:uid})
          })
          await firestore().collection("OwnerCoupon").doc(idCP).set({
             ...item,
             uid:uid,
             idCp:idCP
          })
        }catch(error){
            console.log(error)
        }
    }
    const onRefresh = () => {
        setTimeout(() => {
            getDataCoupon()
        }, 1000)
    }
    useEffect(()=>{
        getDataCoupon()
    },[])
    return (
        <View>
            
                <View style={styles.containHead}>
                    <HeaderView name="close" type="antdesign" />
                    <Text style={styles.containTextView}>Mã giảm giá</Text>
                </View>
                <FlatList
                data={DataCoupon}
                keyExtractor={item => item.id}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={() => {
                            onRefresh()
                        }}
                    />
                }
                renderItem={({item,index})=> <CouponItem item={item}
                   onPress={()=>{
                       upDateUserReceive(item)
                       Alert.alert("Thông báo","Nhận voucher thành công")
                   }}
                />}
                />

        

        </View>
    )
}
export default DetailCoupon17