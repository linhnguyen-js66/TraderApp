import React, { useEffect, useState } from 'react'
import { Text, View, Alert, TouchableOpacity, Image, FlatList, ActivityIndicator, RefreshControl } from "react-native"
import styles from './style'
import LikeAndComment from '../../components/LikeAndComment'
import { HeaderCustom, Score } from '../../components/HeaderCustom'
import ButtonForm from '../../components/ButtonForm'
import { StackRouter, useNavigation } from '@react-navigation/native'
import { screen } from '../../navigation/screen'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { palette } from '../../theme'
import { Icon } from 'react-native-elements'
const ListTheme = ({ data, onPress}) => {
    const { id, image, name } = data
    return (
        <View style={{ flex: 1 }} >
            <TouchableOpacity style={styles.containTheme}
                onPress={onPress}
                key={id}
            >
                <Image source={{ uri: image }} style={styles.imageIcon} />
            </TouchableOpacity>
            <Text style={styles.texttheme}>{name}</Text>
        </View>
    )
}
const ListPost = ({ item, onClick, user, Comment, snapshot, datatheme, clickDelete}) => {
    const { createdAt, image, idUser, status, id, idPost, idUserLike, like, theme, saved } = item

    const [isLike, setIsLike] = useState(like)
    const [isSave, setIsSave] = useState(saved)
    //Button Like Post

    const [amountLike, setAmountLike] = useState(snapshot)
    let uid = auth().currentUser.uid

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
    const navigation = useNavigation()
    //Refresh Data
    const [Refresh,setRefresh] = useState([])
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
           setRefresh([])
           
        });
        return unsubscribe;
    }, [navigation])
    //////////
    useEffect(() => {
        setIsLike(like ? true : false)
        getDataComment()
        setIsSave(saved ? true : false)
    }, [Refresh])
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

    const [open, setOpen] = useState(false)
    //Save Post 
    const onClickSave = () => {
        Alert.alert(
            'Thông báo',
            'Bạn có chắc muốn lưu bài viết này ?',
            [
                {
                    text: 'Hủy'
                },
                {
                    text: 'Lưu lại',
                    onPress: () => {
                        setIsSave(true)
                        uploadUserSavePost()
                    }
                }
            ]
        )
    }
    const onClickDeleteSave = () => {
        Alert.alert(
            'Thông báo',
            'Bạn có chắc muốn bỏ lưu bài viết này ?',
            [
                {
                    text: 'Hủy'
                },
                {
                    text: 'Bỏ lưu',
                    onPress: () => {
                        setIsSave(false)
                        deleteUserSavePost()
                    }
                }
            ]
        )
    }
    const uploadUserSavePost = async () => {
        try {
            let newUser = {
                uid: uid
            }

            // idUserSaved.push({uid:uid})
            await firestore().collection('DataStatus').doc(id).update({
                idUserSaved: firestore.FieldValue.arrayUnion(newUser)
            })
            await firestore().collection('DataSavedPost').doc(id).set({
                ...item,
                idType: 2,
                user: uid,
                id: id
            })
            await firestore().collection('DataSavedPost').doc(id).update({
                idUserSaved: firestore.FieldValue.arrayUnion(newUser)
            })
        } catch (error) {
            console.log(error)
        }
    }
    const deleteUserSavePost = async () => {
        try {
            let userNotSave = {
                uid: uid
            }
            await firestore().collection('DataStatus').doc(id).update({
                idUserSaved: firestore.FieldValue.arrayRemove(userNotSave)
            })
            await firestore().collection('DataSavedPost').doc(id).delete()
        } catch (error) {

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
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.userName}>{item.name}</Text>
                                    {idUser == uid ?
                                        <View style={styles.containDot}>
                                            <TouchableOpacity style={styles.dot} onPress={() => setOpen(open ? false : true)}>
                                                <Icon name="dots-three-horizontal" type="entypo" />
                                            </TouchableOpacity>
                                            {open ? <TouchableOpacity style={styles.containDelete}
                                                onPress={clickDelete}
                                            >
                                                <Text style={styles.titleDelete}>Xóa bài viết</Text>
                                                <View style={{ paddingRight: 12, paddingVertical: 8 }}>
                                                    <Icon name="delete" type="antdesign" color="tomato" />
                                                </View>
                                            </TouchableOpacity> : null}
                                        </View> :
                                        null
                                    }

                                </View>

                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <Text style={styles.date}>{createdAt.split("/").reverse().join("/")}</Text>
                                    {datatheme.map(data => {
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
                    <LikeAndComment name={isSave ? "md-paper-plane" : "md-paper-plane-outline"} type="ionicon"
                        onPress={() => {

                            isSave ? onClickDeleteSave() : onClickSave()
                        }}
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
const Header = ({ onPress, onClick, DataTheme, DataPost }) => {
    const navigation = useNavigation()

    return (
        <View>
            <View style={styles.containHeader}>
                <View>
                    <Image source={require('../../image/talk.png')} style={styles.imageHeader} />
                    <View style={styles.containTextHead}>
                        <Text style={styles.text1}>Hỏi & đáp kinh doanh</Text>
                        <Text style={styles.text2}>
                            Bạn có thắc mắc cần giải đáp? Hãy chia sẻ cùng
                            cộng động
                       </Text>
                    </View>
                </View>


                {/**Đặt câu hỏi */}
                <View style={{ marginHorizontal: 80, marginBottom: 16 }}>
                    <ButtonForm index={1} title="Đặt câu hỏi" onPress={onPress} />
                </View>
            </View>
            {/**Theme*/}
            <View style={{ marginTop: 16, marginHorizontal: 8 }}>
                <FlatList
                    data={DataTheme}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => <ListTheme data={item} onPress={() => navigation.navigate(screen.ThemeScreen, {
                        idTheme: item.id
                    })} />}
                    numColumns={3}
                />
            </View>
            {DataPost.length == 0 && <View style={{ alignItems: 'center', marginTop: 32 }}>
                <Text style={{ color: palette.grey }}>(Không có bài viết nào)</Text>
            </View>}
        </View>
    )
}
const QuestionScreen11 = ({ navigation }) => {
    //GetDataStatus from firebase and lazyload
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
            setLastDoc(snapshot.docs[snapshot.docs.length - 1])
            await firestore().collection("DataStatus").orderBy('idPost').limit(3).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    listPost.push({ id: doc.id, ...doc.data(), like: false, saved: false })
                    let resultData = listPost
                    for (let data = 0; data < resultData.length; data++) {
                        let amountUser = resultData[data].idUserLike
                        for (let user = 0; user < amountUser.length; user++) {
                            if (amountUser[user].uid == uid) {
                                resultData[data].like = true
                            }
                        }
                    }
                    //Save Post
                    for (let data = 0; data < resultData.length; data++) {
                        let amountUser = resultData[data].idUserSaved
                        for (let user = 0; user < amountUser.length; user++) {
                            if (amountUser[user].uid == uid) {
                                resultData[data].saved = true
                            }
                        }
                    }
                })
            })

            setDataPost(listPost)
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

                    setLastDoc(snapshot.docs[snapshot.docs.length - 1])
                    await firestore().collection("DataStatus").orderBy('idPost').limit(3).startAfter(lastDoc.data().idPost).get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            listPost.push({ id: doc.id, ...doc.data(), like: false, saved: false })
                            let resultData = listPost
                            for (let data = 0; data < resultData.length; data++) {
                                let amountUser = resultData[data].idUserLike
                                for (let user = 0; user < amountUser.length; user++) {
                                    if (amountUser[user].uid == uid) {
                                        resultData[data].like = true
                                    }
                                }
                            }
                            //Save Post
                            for (let data = 0; data < resultData.length; data++) {
                                let amountUser = resultData[data].idUserSaved
                                for (let user = 0; user < amountUser.length; user++) {
                                    if (amountUser[user].uid == uid) {
                                        resultData[data].saved = true
                                    }
                                }
                            }
                        })
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
    //Refresh Data
    const [Refresh, setRefresh] = useState([])
    useEffect(() => {
        getDataPost()
        getDataUserInfomation()
        getDataTheme()
    
    }, [])
    //id User
    let uid = auth().currentUser.uid
    //sort
    function byDate(a, b) {
        //by month and then by day
        let d1 = new Date(a.createdAt); // 1993-02-15T00:00:00Z =>   1993-02-14T20:00:00EST
        let d2 = new Date(b.createdAt);

        return d2 - d1

    }
    //Datatheme
    const [DataTheme, setDataTheme] = useState([])
    const getDataTheme = async () => {
        let result = []
        let snapshot = await firestore().collection('Fields').get()
        snapshot.docs.map(item => result.push(item.data()))
        setDataTheme(result)
    }
    //Delete Post 
    const onClickDeletePost = async (idPost, id) => {
        let resultData = DataPost
        let filterData = resultData.filter(item => item.idPost !== idPost)
        setDataPost(filterData)
        await firestore().collection('DataStatus').doc(id).delete()
        await firestore().collection('DataSavedPost').doc(id).delete()
    }

    return (
        <View style={{ flex: 1, backgroundColor: palette.white }} >
            {/**Header*/}
            <View style={styles.contain}>
                <View style={styles.header}>
                    <HeaderCustom uid={uid} />
                    <Score />
                </View>
            </View>
            <View style={{ marginBottom: 64 }}>
                <FlatList
                    data={DataPost.sort(byDate)}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => <ListPost item={item}
                        onClick={() => navigation.navigate(screen.DetailComment, {
                            idPost: item.idPost
                        })}

                        user={DataUser}
                        snapshot={DataPost}
                        datatheme={DataTheme}
                        clickDelete={() => onClickDeletePost(item.idPost, item.id)}
                    />}

                    ListHeaderComponent={() => <Header
                        DataPost={DataPost}
                        onPress={() => navigation.navigate(screen.StatusScreen, {
                            idType: ""
                        })}
                        DataTheme={DataTheme}
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
                    ListFooterComponent={renderFooter}
                />
            </View>
        </View>



    )
}
export default QuestionScreen11