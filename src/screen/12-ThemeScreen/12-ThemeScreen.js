import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, RefreshControl, ActivityIndicator } from "react-native"
import styles from './style'
import HeaderView from '../../components/Header'
import ButtonForm from '../../components/ButtonForm'
import LikeAndComment from '../../components/LikeAndComment'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../navigation/screen'
import { palette } from '../../theme/palette'
const ListPost = ({ item, onClick, user, Comment, SavePost, snapshot, datatheme }) => {
    const { createdAt, image, idUser, status, id, idPost, idUserLike, like, theme } = item

    const [isLike, setIsLike] = useState(like)

    //Button Like Post

    const [amountLike, setAmountLike] = useState(snapshot)
    let uid = auth().currentUser.uid
    let check = false


    const addLikes = (idPost, uid) => {
        let resultData = []
        resultData = amountLike

        resultData.map(data => {
            if (data.idPost == idPost) {
                let findIndex = data.idUserLike.findIndex(item => item.uid == uid)
                if (findIndex < 0) {
                    data.idUserLike.push({ uid: uid })
                }
            }
        }
        )
        setAmountLike(resultData)

    }

    const disLikes = (idPost, uid) => {
        let resultData = []
        resultData = amountLike
        resultData.map(results => {
            if (results.idPost == idPost) {
                let disLike = results.idUserLike.filter(item => item.uid !== uid)
                results.idUserLike = [...disLike]
            }
        })
        setAmountLike(resultData)

    }
    const [DataComment, setDataComment] = useState([])
    const getDataComment = async () => {
        let result = []
        let snapshot = await firestore().collection("DataComment").get()
        result = snapshot.docs.filter(item => item.data().idPost == idPost)
        setDataComment(result)
    }
    useEffect(() => {
        setIsLike(like ? true : false)
        getDataComment()
    }, [])
    const onClickLike = () => {
        setIsLike(true)
        addLikes(idPost, uid)
        uploadLikeFirebase(uid, id)
    }
    const onClickDisLike = () => {
        setIsLike(false)
        disLikes(idPost, uid)
        deleteLikeFirebase(uid, id)
    }
    const uploadLikeFirebase = async (uid, id) => {
        try {
            let newUser = {
                uid: uid
            }
            await firestore().collection('DataStatus').doc(id).update({
                idUserLike: firestore.FieldValue.arrayUnion(newUser)
            })
        } catch (error) {
            console.log(error)
        }
    }
    const deleteLikeFirebase = async (uid, id) => {
        try {
            let userdislike = {
                uid: uid
            }
            await firestore().collection('DataStatus').doc(id).update({
                idUserLike: firestore.FieldValue.arrayRemove(userdislike)
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <View style={{ marginTop: 16 }} >
            {/**Avatar và tên người dùng */}
            {
                user.map(item => {
                    if (item.uid == idUser) {
                        return <View style={styles.containAva} key={id}>
                            <View>
                                <Image source={{ uri: item.ava }} style={styles.imgAva} />
                            </View>
                            <View style={styles.containUserName}>
                                <Text style={styles.userName}>{item.name}</Text>
                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <Text style={styles.date}>{createdAt.split("/").reverse().join("/")}</Text>
                                    {theme !== "" && datatheme.map(data => {
                                        if (data.id == theme) {
                                            return <View style={styles.containtexttheme}>
                                                <Text style={styles.theme} key={data.id}>#{data.name}</Text>
                                            </View>
                                        }
                                    })}
                                </View>

                            </View>
                        </View>
                    }
                }
                )
            }

            {/**Status của người dùng */}
            <View style={styles.containStatus}>
                <Text style={styles.status}>
                    {status}
                </Text>
            </View>
            {/**Ảnh kèm theo*/}
            {image == null ? null :
                <View>
                    <Image source={{ uri: image }} style={styles.imgPost} />
                </View>
            }
            {/**Nút like bình luận*/}
            <View style={styles.containLikeandComment}>
                <View>
                    <LikeAndComment name={isLike ? "heart" : "hearto"} type="antdesign"
                        onPress={() => {

                            isLike ? onClickDisLike() : onClickLike()
                        }

                        }
                        color={isLike ? "tomato" : "black"}
                    />
                </View>
                <View style={{ marginLeft: 16 }}>
                    <LikeAndComment name="chatbubble-outline"
                        type="ionicon"
                        style={{ transform: [{ rotateY: '180deg' }] }}
                        onPress={Comment}
                    />
                </View>
                <View style={{ marginLeft: 16 }}>
                    <LikeAndComment name="md-paper-plane-outline" type="ionicon"
                        onPress={SavePost}
                    />
                </View>
            </View>
            {/**Số lượng bình luận và lượt thích*/}
            <View style={styles.commentandlike}>
                {
                    amountLike.map(item => {
                        if (item.idPost == idPost) {
                            return <Text style={styles.like} key={item.idPost}>{item.idUserLike.length} lượt thích</Text>
                        }
                    })
                }


                {/* {amountLike.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} */}
                <TouchableOpacity onPress={onClick}>
                    <Text style={styles.comment}>Xem tất cả {DataComment.length} bình luận</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const HeaderOfTab = ({ data, id }) => {
    const navigation = useNavigation()
    return (
        data.map(item => {
            if (item.id == id) {
                return <View style={styles.containHeader} key={item.id}>

                    <Image source={{ uri: item.image }} style={styles.imageHeader} />
                    <View style={styles.containTextHead}>
                        <Text style={styles.text1}>{item.name}</Text>
                        <Text style={styles.text2}>
                            {item.description}
                        </Text>
                    </View>
                    <View style={{ marginHorizontal: 80, marginBottom: 16 }}>
                        <ButtonForm index={1} title="Đặt câu hỏi"
                            onPress={() => navigation.navigate(screen.StatusScreen, {
                                idType: id
                            })} />
                    </View>
                </View>
            }
        })
    )
}
const ThemeScreen12 = ({ route }) => {
    const { idTheme } = route.params
    const navigation = useNavigation()

    //Datatheme
    const [DataTheme, setDataTheme] = useState([])

    const getDataTheme = async () => {
        let result = []
        let snapshot = await firestore().collection('Fields').get()
        snapshot.docs.map(item => result.push(item.data()))
        setDataTheme(result)
    }
    //Data status
    const [DataPost, setDataPost] = useState([])
    const [lastDoc, setLastDoc] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    let onEndReachedCalledDuringMomentum = false
    const getDataPost = async () => {
        setIsLoading(true)
        let snapshot = await firestore().collection("DataStatus").orderBy('idPost').limit(3).get()
        if (!snapshot.empty) {
            let listPost = []
            let resultData
            setLastDoc(snapshot.docs[snapshot.docs.length - 1])
            await firestore().collection("DataStatus").orderBy('idPost').limit(3).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    listPost.push({ id: doc.id, ...doc.data(), like: false })

                    resultData = listPost.filter(item => item.theme == idTheme)

                    for (let data = 0; data < resultData.length; data++) {
                        let amountUser = resultData[data].idUserLike
                        for (let user = 0; user < amountUser.length; user++) {
                            if (amountUser[user].uid == uid) {
                                resultData[data].like = true
                            }
                        }
                    }
                })
            })

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
                let snapshot = await firestore().collection("DataStatus").orderBy('idPost').limit(3).startAfter(lastDoc.data().idPost).get()
                if (!snapshot.empty) {
                    let listPost = DataPost
                    let resultData
                    setLastDoc(snapshot.docs[snapshot.docs.length - 1])
                    await firestore().collection("DataStatus").orderBy('idPost').limit(3).startAfter(lastDoc.data().idPost).get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            listPost.push({ id: doc.id, ...doc.data(), like: false })
                            resultData = listPost.filter(item => item.theme == idTheme)

                            for (let data = 0; data < resultData.length; data++) {
                                let amountUser = resultData[data].idUserLike
                                for (let user = 0; user < amountUser.length; user++) {
                                    if (amountUser[user].uid == uid) {
                                        resultData[data].like = true
                                    }
                                }
                            }
                        })
                    })


                    setDataPost(resultData)
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
    //GetDataUser from firebase 

    const [DataUser, setDataUser] = useState([])
    const getDataUserInfomation = async () => {
        let resultData = []
        let dataUser = await firestore().collection("UserInformation").get()
        dataUser.docs.map(item => resultData.push(item.data()))
        setDataUser(resultData)
    }
    useEffect(() => {
        getDataPost()
        getDataUserInfomation()
        getDataTheme()
    }, [])
    //id User

    let uid = auth().currentUser.uid
    //sort date
    function byDate(a, b) {
        //by month and then by day
        let d1 = new Date(a.createdAt); // 1993-02-15T00:00:00Z =>   1993-02-14T20:00:00EST
        let d2 = new Date(b.createdAt);

        return d2 - d1

    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.header}>
                <View style={{ marginTop: 4 }}>
                    <HeaderView name="chevron-left" type="entypo" onPress={() => navigation.navigate(screen.QuestionScreen)} />
                </View>
                <Image source={require('../../image/logo.png')} style={styles.ImageLogo} />
            </View>


            <View style={styles.listpost}>
                <FlatList
                    data={DataPost.sort(byDate)}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => <ListPost item={item}
                        onClick={() => navigation.navigate(screen.DetailComment, {
                            idPost: item.idPost
                        })}

                        user={DataUser}
                        snapshot={DataPost}
                        datatheme={DataTheme} />}
                    ListHeaderComponent={() => <HeaderOfTab data={DataTheme} id={idTheme} />}

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
                    ListFooterComponent={renderFooter}
                />
            </View>

        </View>
    )
}
export default ThemeScreen12