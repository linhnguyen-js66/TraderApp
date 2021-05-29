import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, RefreshControl, ActivityIndicator } from "react-native"
import styles from './style'
import { TextInput } from 'react-native'
import SearchInput from '../../components/SearchInput'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../navigation/screen'
import auth from '@react-native-firebase/auth'
import { spacing } from '../../theme'
import { palette } from '../../theme'
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
const ListSearch = ({item}) => {
    return(
    <TouchableOpacity style={{flexDirection:'row', borderTopWidth:0.5,borderBottomWidth:0.5}}>
        <View style={{marginHorizontal:16}}>
           <Text style={{
           fontSize:17,
           marginTop:12,
           color:'grey'
       }}>{item.name.substring(0,30)}....</Text> 
        </View>
       
       <View style={{flex:1,alignItems:'flex-end'}}>
        
            <Image source={{uri:item.image}} style={{
                marginTop:12,
                marginBottom:12,
                marginRight:16,
                borderRadius:10,
                width:64,height:64,
            }}/>
       </View>
    </TouchableOpacity>
    )
}
const SearchScreen13 = () => {
    const [colorType,setColorType] = useState(Type)
    const [searchText,setSearchText] = useState('')
    const [document,setDocument] = useState('DataNews')
    console.log(document)
    const [restaurants, setRestaurants] = useState([]);
    let restaurantsRef =firestore().collection(document) 
    const [limit, setLimit] = useState(20)
    //Hiển thị các sản phẩm trong DataProduct
    let onEndReachedCalledDuringMomentum = false;
    const [isLoading, setIsLoading] = useState(false);
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const [lastDoc, setLastDoc] = useState(null);
   
    ///
    
    useEffect(() => {
        getRestaurants();
    }, []);

    const getRestaurants = async () => {
        setIsLoading(true);

        const snapshot = await restaurantsRef.orderBy('id').limit(limit).get();

        if (!snapshot.empty) {
            let newRestaurants = [];

            setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
       
            snapshot.docs.map(item => newRestaurants.push(item.data()))

            setRestaurants(newRestaurants);
        } else {
            setLastDoc(null);
        }

        setIsLoading(false);
    }

    const getMore = async () => {
        if (lastDoc) {
            setIsMoreLoading(true);

            setTimeout(async () => {
                let snapshot = await restaurantsRef.orderBy('id').startAfter(lastDoc.data().id).limit(limit).get();

                if (!snapshot.empty) {
                    let newRestaurants = restaurants;

                    setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

                    snapshot.docs.map(item => newRestaurants.push(item.data()))

                    setRestaurants(newRestaurants);

                    if (snapshot.docs.length < 3) setLastDoc(null);
                } else {
                    setLastDoc(null);
                }

                setIsMoreLoading(false);
            }, 1000);
        }

        onEndReachedCalledDuringMomentum = true;
    }
    const onRefresh = () => {

        setTimeout(() => {
            getRestaurants();
        }, 1000);

    }

    const renderFooter = () => {
        if (!isMoreLoading) return true;
        return (
            <ActivityIndicator
                size='large'
                color={palette.buttonColor}
                style={{ marginBottom: 150 }}
            />
        )
    }
    ///
    const handleData = (searchValue) => {
        let resultData = restaurants
        let searchData = resultData.filter(({ name }) => name.toLowerCase().indexOf(searchValue) !== -1)
        console.log(searchData)
        return searchData
     }
    const onChangeSearchText = (text) => {
        setSearchText(text)
        setRestaurants(handleData(searchText))
    }
    const navigation = useNavigation()
    return (
        <View>
            <View style={styles.headerContain}>
                <TouchableOpacity style={styles.containTextCancel}
                 onPress={()=>navigation.goBack()}
                >
                    <Text style={styles.textCancel}>Hủy</Text>
                </TouchableOpacity>
                <View style={{flex:1}}>
                    <SearchInput
                  placeholder="Nhập vào từ khóa cần tìm..."
                  onChangeText={(value)=>{
                    onChangeSearchText(value.toLowerCase())
                  }}
                  value={searchText}
                />
                </View>
                
            </View>
            <View style={styles.containType}>
                 {Type.map(item => 
                     <TouchableOpacity key={item.id} 
                     style={[styles.type,colorType == item.id ? {backgroundColor:'#ffcc00'}:{backgroundColor:"#E5E5E5"}]} 
                        onPress={()=>{
                            setColorType(item.id)
                            if(item.id == 1){
                                setDocument('DataNews')
                            }else if(item.id == 2){
                                setDocument('Address')
                            }else if(item.id == 3){
                                setDocument('DataProduct')
                            }
                         
                        }}
                     >
                         <Text style={styles.nametype}># {item.name}</Text>
                     </TouchableOpacity>
                 )}
            </View>
            <FlatList
                    data={restaurants}
                    marginBottom={32}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) =><ListSearch item={item}/>}
                
                    onEndReachedThreshold={1}

                    onEndReached={() => {
                        if (!onEndReachedCalledDuringMomentum && !isMoreLoading) {
                            getMore()
                        }
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={() => {
                                onRefresh()
                                console.log("refresh")
                            }}
                        />
                    }
                    ListFooterComponent={renderFooter}
                    onMomentumScrollBegin={() => { onEndReachedCalledDuringMomentum = false; }}
                 
                />
                
        </View>
    )
}

export default SearchScreen13