import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, Image, FlatList, Alert, ActivityIndicator, RefreshControl } from "react-native"
import styles from './style'
import HeaderView from '../../components/Header'
import { palette } from '../../theme'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../navigation/screen'
import auth from '@react-native-firebase/auth'
import { Icon } from 'react-native-elements'
import LikeAndComment from '../../components/LikeAndComment'
const ListPost = ({ item, onClick, user, Comment,snapshot, datatheme, clickDelete }) => {
    const { createdAt, image, idUser, status, id, idPost, idUserLike, like, theme, saved} = item
    const navigation = useNavigation()
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
    useEffect(() => {
        setIsLike(like ? true : false)
        getDataComment()
        setIsSave(saved ? true : false)
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

    const [open, setOpen] = useState(false) 
        //Save Post 

        const onClickDeleteSave = () => {
            Alert.alert(
                'Thông báo',
                'Bạn có chắc muốn bỏ lưu bài viết này ?',
                [
                    {
                        text:'Hủy'
                    },
                    {
                        text:'Bỏ lưu',
                        onPress:()=> {
                            setIsSave(false)
                            deleteUserSavePost()
                            navigation.navigate(screen.SavePostScreen23)
                        }
                    }
                ]
            )
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
                navigation.navigate(screen.SavePostScreen23)
            } catch (error) {
                console.log(error)
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
                                <View style={{flexDirection:'row'}}>
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
                                                <View style={{paddingRight:12,paddingVertical:8}}>
                                                   <Icon name="delete" type="antdesign" color="tomato"/> 
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
                    <LikeAndComment name={isSave ?"md-paper-plane":"md-paper-plane-outline"} type="ionicon" 
                         onPress={() => {

                            isSave ? onClickDeleteSave() : null
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
const DetailStatus25 = ({route}) => {
    const {idPost} = route.params
    const navigation = useNavigation()
    //GetDataStatus from firebase and lazyload
    const [DataPost, setDataPost] = useState([])

    const [isLoading, setIsLoading] = useState(false)
 
    const getDataPost = async () => {
        setIsLoading(true)
        let snapshot = await firestore().collection("DataStatus").where('idPost','==',idPost).get()
        if (!snapshot.empty) {
            let listPost = []

         
            await firestore().collection("DataStatus").where('idPost','==',idPost).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    listPost.push({ id: doc.id, ...doc.data(), like: false, saved:false })
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
        
        setIsLoading(false)
    }

    const onRefresh = () => {
        setTimeout(() => {
            getDataPost()
        }, 1000)
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
  
    //Datatheme
    const [DataTheme, setDataTheme] = useState([])
    const getDataTheme = async () => {
        let result = []
        let snapshot = await firestore().collection('Fields').get()
        snapshot.docs.map(item => result.push(item.data()))
        setDataTheme(result)
    }
    //Delete Post 
    const onClickDeletePost = async (idPost,id) => {
        let resultData = DataPost
        let filterData = resultData.filter(item => item.idPost !== idPost)
        setDataPost(filterData)
        await firestore().collection('DataStatus').doc(id).delete()
        await firestore().collection('DataSavedPost').doc(id).delete()
        navigation.navigate(screen.DetailSavePost24)
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.header}>
                <View style={{ marginTop: 4 }}>
                    <HeaderView name="chevron-left" type="entypo"
                        onPress={() => navigation.goBack()}
                    />
                </View>
                <View style={styles.containTextCategory}>
                    <Text style={styles.textCategory}>Bài viết</Text>
                </View>

            </View>
            {/**End */}
            <View>
            <FlatList
                    data={DataPost}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => <ListPost item={item}
                        onClick={() => navigation.navigate(screen.DetailComment, {
                            idPost: item.idPost
                        })}

                        user={DataUser}
                        snapshot={DataPost}
                        datatheme={DataTheme}
                        clickDelete={()=>onClickDeletePost(item.idPost,item.id)}
                    />}

               
                    onEndReachedThreshold={1}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={() => {
                                onRefresh()
                            }}
                        />
                    }
             
                
                />
            </View>
        </View>
    )
}

export default DetailStatus25