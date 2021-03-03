import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList } from "react-native"
import styles from './style'
import { TextInput } from 'react-native'
import SearchInput from '../../components/SearchInput'
let Type = [
    {
        id:1,
        name:"Tin tức"
    },
    {
        id:2,
        name:"Nhà đất"
    },
    {
        id:3,
        name:"Mặt hàng"
    }
]
const SearchScreen13 = () => {
    const [colorType,setColorType] = useState(Type)
    return (
        <ScrollView>
            <View style={styles.headerContain}>
                <TouchableOpacity style={styles.containTextCancel}>
                    <Text style={styles.textCancel}>Hủy</Text>
                </TouchableOpacity>
                <SearchInput
                  placeholder="Nhập vào từ khóa cần tìm..."
                />
            </View>
            <View style={styles.containType}>
                 {Type.map(item => 
                     <TouchableOpacity key={item.id} 
                     style={[styles.type,colorType == item.id ? {backgroundColor:'#ffcc00'}:{backgroundColor:"#E5E5E5"}]} 
                        onPress={()=>{
                            setColorType(item.id)
                        }}
                     >
                         <Text style={styles.nametype}># {item.name}</Text>
                     </TouchableOpacity>
                 )}
            </View>
        </ScrollView>
    )
}

export default SearchScreen13