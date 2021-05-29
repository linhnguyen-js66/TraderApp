import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from "react-native"
import styles from './style'
import { Icon } from 'react-native-elements'
import { palette } from "../../theme"
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../navigation/screen'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
export const HeaderCustom = ({ uid }) => {
    const navigation = useNavigation()
    const [DataUser, setDataUser] = useState([])

    //Lấy thông tin người dùng
    const getInformation = async () => {
        try {
            let result = []
            let reponse = await firestore().collection("UserInformation").where("uid", "==", uid).get()
            for (let data of reponse.docs) {
                result.push(data.data())
            }
            setDataUser(result)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getInformation()
    },
        [])
    return (
        <View style={{ flex: 1, flexDirection: "row" }}>
            <TouchableOpacity
                onPress={() => navigation.navigate(screen.SearchScreen)}
            >
                <Icon reverse name="search" type="font-awesome"
                    color={palette.colorgray} reverseColor={palette.black}
                    size={18}
                />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center' }}>
                {DataUser.map(item =>
                    <TouchableOpacity key={uid}
                        style={{
                            borderWidth: 2,
                            width: 50, height: 50,
                            borderRadius: 200,
                            borderColor: palette.buttonColor
                        }}
                        onPress={() => navigation.navigate(screen.AccountSetting)}
                    >
                        <Image source={{ uri:item.ava}} style={styles.Image} />
                    </TouchableOpacity>
                )}
            </View>

        </View>
    )
}

// export const Score = () => {
//     let uid = auth().currentUser.uid
//     const [Score,setScore] = useState(0)
//     const getScoreOfUser = async () => {
//         let score
//         try{
//             let snapshot = await firestore().collection("UserInformation").where("uid", "==", uid).get()
//             snapshot.docs.map(item => score = item.data().count)
//             setScore(score)
//         }catch(err){
//             console.log(err)
//         }
//     }
//     const getScore = () => {
        
//     }
//     return (
//         <View style={{ marginTop: 10 }}>
//             <View style={styles.containScore}>
//                 <View>
//                     <Text style={styles.score}>6,677</Text>
//                 </View>
//                 <View style={styles.icon}>
//                     <Icon name="star" type="antdesign" size={15} color="tomato" />
//                 </View>
//             </View>
//             <View style={{ position: 'absolute' }}>
//                 <Image source={require('../../image/diamond.png')} style={styles.imageScore} />
//             </View>
//         </View>
//     )
// }