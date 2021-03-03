import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, Dimensions } from "react-native"
import styles from './style'
import { Score, HeaderCustom} from '../../components/HeaderCustom'
import ButtonForm from '../../components/ButtonForm'
import { useNavigation } from '@react-navigation/native'
import {screen} from '../../navigation/screen'
let CategoryAdd = [
    {
       id:1,
       name:"Cầu Giấy"
    },
    {
        id:2,
        name:"Hà Đông"
    },
    {
        id:3,
        name:"Ba Đình"
    }
]
let DataAddress = [
    {
      caption:"Nhà cho thuê tại Cầu Giấy",
      area:150,
      floor:2,
      id:1,
      idCategory:1,
      image:require('../../image/coffeeshop1.jpg'),
      price:15000000
    },
    {
        caption:"Cho thuê mặt bằng tại Hà Đông",
        area:150,
        floor:2,
        id:2,
        idCategory:2,
        image:require('../../image/coffeeshop3.jpg'),
        price:15000000
      },
      {
        caption:"Nhà cho thuê kinh doanh phố Kim Mã",
        area:150,
        floor:2,
        id:3,
        idCategory:3,
        image:require('../../image/coffeeshop2.jpg'),
        price:15000000
      },
]
const ListAddress = ({data,onPress}) => {
    const {caption,area,floor,id,image} = data
    return(
        <TouchableOpacity style={{width:170,marginRight:16}} key={id}
        onPress={onPress}
        >
            <Image source={image} style={styles.imgAdd}/>
            <View>
                <Text style={styles.nameAdd}>{caption}</Text>
                <Text style={styles.detailAdd}>Diện tích: {area}m2</Text>
                <Text style={styles.detailAdd}>Cho thuê: {floor} tầng</Text>
            </View>
        </TouchableOpacity>
    )
}
const ExperimentScreen = () => {
    const navigation = useNavigation()
    return(
        <ScrollView>
             <View style={styles.header}>
                <HeaderCustom />
                <Score/>
            </View>
            <Text style={styles.title}>Nguồn vốn dự toán</Text>
            <View>
                <View style={{marginTop:64}}>
                    <Image source={require('../../image/leodoc.png')} style={styles.imageLeoDoc}/>
                </View>
                <View style={styles.descript}>
                    <Text style={{flex:1,textAlign:'center',fontSize:17,color:'#868686'}}>
                    Mỗi nhà đầu tư đều dự trù cho mình một nguồn vốn riêng, hãy tính toán cẩn thận 
                    </Text>
                </View>
                <View style={styles.ButtonForm}>
                    <ButtonForm title="Bắt đầu"/>
                </View>
            </View>
            {/**List nhà cho thuê  */}
            <ScrollView 
            style={{marginLeft:16, marginTop:24, marginBottom:32}}
            horizontal={true}
            >
                <FlatList
                  data={DataAddress}
                  keyExtractor={item => item.id}
                  renderItem={({item,index})=><ListAddress data={item} onPress={()=>navigation.navigate(screen.AddressAndMarket)}/>}
                  numColumns={3}
                />
                {/* <ListAddress/> */}
            </ScrollView>
        </ScrollView>
    )
}
export default ExperimentScreen