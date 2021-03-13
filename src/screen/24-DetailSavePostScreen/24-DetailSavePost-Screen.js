import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, Image, FlatList, Alert, ActivityIndicator, RefreshControl } from "react-native"
import styles from './style'
import HeaderView from '../../components/Header'
import { palette } from '../../theme'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../navigation/screen'
import auth from '@react-native-firebase/auth'
const ListPost = ({item,onPress}) => {
    return(
        <TouchableOpacity style={{flex:1}}
        onPress={onPress}
        key={item.id}
      >
          <Image source={{ uri: item.image }}
              style={[styles.img]} />
      </TouchableOpacity>
    )
}
const DetailSavePost24 = ({ route }) => {
    const { type } = route.params
    const [DataPost, setDataPost] = useState([])
    const [lastDoc, setLastDoc] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const navigation = useNavigation()
    let onEndReachedCalledDuringMomentum = false
    let uid = auth().currentUser.uid
    const getDataPost = async () => {
        setIsLoading(true)
        let snapshot = await firestore().collection("DataSavedPost").orderBy('id').limit(20).get()
        if (!snapshot.empty) {
            let listPost = []

            setLastDoc(snapshot.docs[snapshot.docs.length - 1])
            snapshot.docs.map(item => listPost.push(item.data()))
            let resultData = listPost.filter(item => item.user = uid && item.idType == type)
            setDataPost(resultData)
        }
        else {
            setLastDoc(null)
        }
        setIsLoading(false)
    }
    const getMoreDataPost = async () => {
        if (lastDoc) {
            setIsMoreLoading(true)

            setTimeout(async () => {
                let snapshot = await firestore().collection("DataSavedPost").orderBy('id').limit(20).startAfter(lastDoc.data().id).get()
                if (!snapshot.empty) {
                    let listPost = DataPost

                    setLastDoc(snapshot.docs[snapshot.docs.length - 1])

                    snapshot.docs.map(item => listPost.push(item.data()))
                    let resultData = listPost.filter(item => item.user = uid && item.idType == type)
                    setDataPost(resultData)
                    if (snapshot.docs.length < 20) setLastDoc(null)
                }
                else {
                    setLastDoc(null)
                }
                setIsMoreLoading(false)
            }, 1000)
        }
        onEndReachedCalledDuringMomentum = true
    }
    const onRefresh = () => {
        setTimeout(() => {
            getDataPost()
        }, 1000)
    }

    const renderFooter = () => {
        if (!isMoreLoading) return true
        return (
            <ActivityIndicator
                size='large'
                color={palette.buttonColor}
                style={{ marginBottom: 16 }}
            />
        )
    }
    useEffect(() => {
        getDataPost()
    }, [])
    return (
        <View style={{flex:1,backgroundColor:'white'}}>
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
            <View>
                <FlatList
                    data={DataPost}
                    keyExtractor={item => item.id}
                    numColumns={3}
                    renderItem={({ item, index }) => <ListPost item={item} product={DataPost}
                     onPress={()=>{
                         type == 1 ? navigation.navigate(screen.AddressAndMarket,{
                            id:item.id
                        }) : navigation.navigate("DetailStatus25",{
                            idPost:item.idPost
                        })
                     }}
                    />}
                    onEndReachedThreshold={1}

                    onEndReached={() => {
                        if (!onEndReachedCalledDuringMomentum && !isMoreLoading) {
                            getMoreDataPost()
                        }
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={() => {
                                onRefresh()
                            }}
                        />
                    }
                    onMomentumScrollBegin={() => onEndReachedCalledDuringMomentum = false}
                    ListFooterComponent={renderFooter} />
            </View>

        </View>
    )
}
export default DetailSavePost24