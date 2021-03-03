import React, { useEffect, useState } from 'react'
import { TextInput, ToastAndroid } from 'react-native'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, Dimensions, RefreshControl, ActivityIndicator } from "react-native"
import { Icon } from 'react-native-elements'
import styles from './style'
import HeaderView from '../../components/Header'
import CommentForm from '../../components/CommentForm'
import { screen } from '../../navigation/screen'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { palette } from '../../theme'

const ListComment = ({ item, onPress, onClick, dataUser }) => {
    const { uid, comment, idComment, idPost, repComment, createdAt, id } = item
    return (
        <View style={{ marginBottom: 16 }} >
            {dataUser.map(user => {
                if (user.uid == uid) {
                    return <View style={styles.contain} key={idComment}  >
                        <View style={styles.containImg}>
                            <Image source={{ uri: user.ava }} style={styles.avatar} />
                        </View>
                        <View style={styles.containComment}>
                            <View style={styles.comment}>
                                <Text style={styles.name} key={user.uid}>{user.name}</Text>
                                <Text style={styles.textComment}>{comment}</Text>
                            </View>
                            <View style={styles.containRepComment}>
                                <Text style={styles.time}>{createdAt}</Text>
                                <TouchableOpacity onPress={onPress}>
                                    <Text style={styles.rep}>Trả lời</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                }
            }

            )}

            {repComment.length !== 0 && repComment.map(value => {
                for (let item of dataUser) {
                    if (item.uid == value.uid) {
                        return <View style={styles.contain2} key={value.idRep}>
                            <View style={styles.containImg} key={item.uid}>
                                <Image source={{ uri: item.ava }} style={styles.avatar2} />
                            </View>
                            <View style={styles.containComment}>
                                <View style={styles.comment}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.textComment}>{value.rep}</Text>
                                </View>
                                <View style={styles.containRepComment}>
                                    <Text style={styles.time}>{value.time.split("/").reverse().join("/")}</Text>
                                    <TouchableOpacity>
                                        <Text style={styles.rep}>Trả lời</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    }
                }
            }

            )}
        </View>
    )
}
const DetailComment18 = ({ route }) => {
    const navigation = useNavigation()
    const { idPost } = route.params

    const [comment, setComment] = useState('')
    const [DataComment, setDataComment] = useState([])
    const [lastDoc, setLastDoc] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isMoreLoading, setIsMoreLoading] = useState(false);

    let uid = auth().currentUser.uid
    //Load Data comment
    const getDataComment = async () => {
        setIsLoading(true)
        let snapshot = await firestore().collection("DataComment").orderBy('idComment').limit(10).get()
        if (!snapshot.empty) {
            let listComment = []

            setLastDoc(snapshot.docs[snapshot.docs.length - 1])
            await firestore().collection("DataComment").orderBy('idComment').limit(10).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    listComment.push({ id: doc.id, ...doc.data() })
                })
            })
            let result = listComment.filter(item => item.idPost == idPost)
            setDataComment(result)

        }
        else {
            setLastDoc(null)
        }
        setIsLoading(false)
    }
    let onEndReachedCalledDuringMomentum = false
    const getMoreDataComment = async () => {
        if (lastDoc) {
            setIsMoreLoading(true)

            setTimeout(async () => {
                let snapshot = await firestore().collection("DataComment").orderBy('idComment').limit(10).startAfter(lastDoc.data().idComment).get()
                if (!snapshot.empty) {
                    let listComment = DataComment

                    setLastDoc(snapshot.docs[snapshot.docs.length - 1])
                    await firestore().collection("DataComment").orderBy('idComment').limit(10).startAfter(lastDoc.data().idComment).get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            listComment.push({ id: doc.id, ...doc.data() })
                        })
                    })

                    let result = listComment.filter(item => item.idPost == idPost)
                    setDataComment(result)
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
            getDataComment()
        }, 1000)
    }
    //upload comment
    const [refresh, setRefresh] = useState([])
    const uploadComment = async () => {
        let d = new Date()
        let ngay = d.getDate()
        let thang = d.getMonth() + 1
        let nam = d.getFullYear();

        //Array receive value in DataComment then add new comment. Its can new comment display right now
        let resultData = DataComment
        let newComment = {
            idComment: makeID(),
            idPost: idPost,
            comment: comment,
            createdAt: `${ngay}/${thang}/${nam}`,
            repComment: [],
            uid: uid
        }
        await firestore().collection("DataComment").add(newComment)
        resultData.push(newComment)
        setRefresh([])
        setDataComment(resultData)
        setComment("")
        // onRefresh()
    }
    const [addRepComment, setAddRepComment] = useState(false)
    const [receiveIdComment, setReceiveIdComment] = useState('')
    const [receiveID, setReceiveID] = useState('')
    const uploadRepComment = async (id) => {
        console.log(receiveIdComment)
        let d = new Date()
        let ngay = d.getDate()
        let thang = d.getMonth() + 1
        let nam = d.getFullYear();
        let newRepComment = {
            idRep: makeIDRepComment(),
            idPost: idPost,
            rep: comment,
            time: `${ngay}/${thang}/${nam}`,
            uid: uid
        }
        let resultData = DataComment
        resultData.map(item => {
            if (item.idComment == receiveIdComment) {
                item.repComment.push(newRepComment)
            }
        })
        await firestore().collection("DataComment").doc(id).update({
            repComment: firestore.FieldValue.arrayUnion(newRepComment)
        })
        setRefresh([])
        setDataComment(resultData)
        setComment("")
        setAddRepComment(false)
    }
    function makeID() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text
    }
    function makeIDRepComment() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 8; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text
    }
    //Get data User
    const [DataUser, setDataUser] = useState([])
    const getDataUserInfomation = async () => {
        let resultData = []
        let dataUser = await firestore().collection("UserInformation").get()
        dataUser.docs.map(item => resultData.push(item.data()))
        setDataUser(resultData)
    }
    const renderFooter = () => {
        if (!isMoreLoading) return true
        return (
            <ActivityIndicator
                size='large'
                color={palette.buttonColor}
                style={{ marginBottom:120}}
            />
        )
    }
    useEffect(() => {
        getDataUserInfomation()
        getDataComment()
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <View style={styles.containHead}>
                <HeaderView name="left" type="antdesign" onPress={() => navigation.navigate(screen.QuestionScreen)} />
                <Text style={styles.containTextView}>Bình luận</Text>
            </View>
            <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
                <FlatList
                    data={DataComment}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => <ListComment item={item}

                        onPress={() => {
                            setAddRepComment(true)
                            setReceiveIdComment(item.idComment)
                            setReceiveID(item.id)
                        }}
                        dataUser={DataUser}
                    />}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={() => {
                                onRefresh()
                            }}
                        />
                    }
                    onEndReachedThreshold={1}

                    onEndReached={() => {
                        if (!onEndReachedCalledDuringMomentum && !isMoreLoading) {
                            getMoreDataComment()
                        }
                    }}
                    onMomentumScrollBegin={() =>  onEndReachedCalledDuringMomentum = false }
                    ListFooterComponent={renderFooter}
                />

            </View>

            <View style={[styles.footer, comment.trim() !== "" && { flexDirection: 'row' }]}>
                <CommentForm
                    value={comment}
                    onChangeText={(text) => setComment(text)}
                    placeHolder="Thêm bình luận..."
                />
                {comment.trim() !== "" &&
                    <TouchableOpacity style={styles.containSend}
                        onPress={() => addRepComment == false ? uploadComment() : uploadRepComment(receiveID)}
                    >
                        <Text style={styles.send}>Gửi</Text>
                    </TouchableOpacity>
                }

            </View>
        </View>
    )
}

export default DetailComment18