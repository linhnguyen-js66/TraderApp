import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, RefreshControl, ActivityIndicator } from "react-native"
import styles from './style'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../navigation/screen'
import { HeaderCustom } from '../../components/HeaderCustom'
import Score from '../../components/Score'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { fontSize, palette } from '../../theme'

const ListHorizontal = ({ data, onPress, theme }) => {
    const navigation = useNavigation()
    const { name, image, idField, index, id} = data
    return (
        <TouchableOpacity style={{ marginLeft: 16, marginBottom: 16 }} onPress={()=>navigation.navigate(screen.DetailNewScreen,{
            idPost: id
        })}>
            {theme.map(item => {
                if (item.id == idField) {
                    return <View style={styles.containTheme} key={item.id}>
                        <Image source={{ uri: item.image }} style={styles.imgTheme} />
                        <Text style={styles.texttheme}>{item.name}</Text>
                    </View>
                }
            })}

            <View>
                <Image source={{ uri: image }} style={styles.imageList} />
                <View style={{ position: 'absolute' }}>

                    <View style={styles.containText}>
                        <Text style={styles.title}>
                            {name.substring(0, 50)}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const List3 = ({ data, onPress }) => {
    const { image, name, description, dating, id } = data
    return (
        <TouchableOpacity style={{ flexDirection: 'row', marginBottom: 16, marginHorizontal: 16 }}
            onPress={onPress}
            key={id}
        >
            <View style={{ height: 80 }}>
                <Image source={{ uri: image }} style={styles.imageList3} />
            </View>
            <View style={styles.descrptionList3}>
                <Text style={styles.titleFirst}>{name}</Text>
                {dating !== "" && <Text style={styles.detailList3}>{dating}</Text>}

                <Text style={styles.detailList3}>
                    {description.substring(0, 40)} ...
                </Text>
            </View>
        </TouchableOpacity>
    )
}
const HeaderTop = ({ data, dataTheme }) => {

    return (
        <View style={{ marginTop: 8 }}>
            <FlatList
                data={data}
                horizontal={true}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => <ListHorizontal data={item} theme={dataTheme} index={index}/>}
            />
        </View>
    )
}
const NewsScreen = () => {
    const navigation = useNavigation()
    let uid = auth().currentUser.uid
    const [dataNewsHorizontal, setDataNewsHorizontal] = useState([])
    //sort
    function byDate(a, b) {
      
        let d1 = new Date(a.createdAt); 
        let d2 = new Date(b.createdAt);

        return d2 - d1

    }

    const getNewsHorizontal = async () => {
        let snapshot = await firestore().collection("DataNews").get()
        let resultData = []
        snapshot.docs.map(item => resultData.push(item.data()))
        let resultOne = resultData.filter(item => item.idField == 1)
        let resultTwo = resultData.filter(item => item.idField == 2)
        let resultThree = resultData.filter(item => item.idField == 3)
        let resultFour = resultData.filter(item => item.idField == 4)
        let lastResult = [
            resultOne.sort(byDate)[0],
            resultTwo.sort(byDate)[0],
            resultThree.sort(byDate)[0],
            resultFour.sort(byDate)[0],           
        ]
        setDataNewsHorizontal(lastResult)
      
    }
    //get DataTheme 
    const [DataTheme, setDataTheme] = useState([])

    const getDataTheme = async () => {
        let result = []
        let snapshot = await firestore().collection('CategoryTheme').get()
        snapshot.docs.map(item => result.push(item.data()))
        setDataTheme(result)
    }
    useEffect(() => {
        getNewsHorizontal()
        getDataTheme()
        getDataNews()
    }, [])
    //data news

    //Hiển thị các sản phẩm trong DataProduct
    const [DataPost, setDataPost] = useState([])
    const [lastDoc, setLastDoc] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    let onEndReachedCalledDuringMomentum = false
    const getDataNews = async () => {
        setIsLoading(true)
        let snapshot = await firestore().collection("DataNews").orderBy('id').limit(10).get()
        if (!snapshot.empty) {
            let listPost = []

            setLastDoc(snapshot.docs[snapshot.docs.length - 1])
            snapshot.docs.map(item => {
                listPost.push(item.data())

            })

            setDataPost(listPost)
        }
        else {
            setLastDoc(null)
        }
        setIsLoading(false)
    }
    const getMoreDataNews = async () => {
        if (lastDoc) {
            setIsMoreLoading(true)

            setTimeout(async () => {
                let snapshot = await firestore().collection("DataNews").orderBy('id').limit(10).startAfter(lastDoc.data().id).get()
                if (!snapshot.empty) {
                    let listPost = DataPost

                    setLastDoc(snapshot.docs[snapshot.docs.length - 1])
                    snapshot.docs.map(item => {
                       listPost.push(item.data())
                        
                    })


                    setDataPost(listPost)
                    if (snapshot.docs.length < 3) setLastDoc(null)
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
            getDataNews()
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
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.header}>
                <HeaderCustom uid={uid} />
                <Score />
            </View>


            {/* List3 */}

            <FlatList
                data={DataPost}
                renderItem={({ item, index }) => <List3 data={item}
                    onPress={() => navigation.navigate(screen.DetailNewScreen,{
                        idPost:item.id
                    })}
                />}
                ListHeaderComponent={() => <HeaderTop data={dataNewsHorizontal} dataTheme={DataTheme} />}
                onEndReachedThreshold={1}

                onEndReached={() => {
                    if (!onEndReachedCalledDuringMomentum && !isMoreLoading) {
                        getMoreDataNews()
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
                onMomentumScrollBegin={() => { onEndReachedCalledDuringMomentum = false; }}
                ListFooterComponent={renderFooter}
                keyExtractor={item => item.id}
            />

        </View>
    )
}

export default NewsScreen