
import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from "react-native"
import styles from './style'
import { Icon } from 'react-native-elements'
import { connect, useDispatch } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

const Score = ({Score}) => {
    let uid = auth().currentUser.uid
    
    const dispatch = useDispatch()
    const getScoreOfUser = async () => {
        let score
        try{
            let snapshot = await firestore().collection("UserInformation").where("uid", "==", uid).get()
            snapshot.docs.map(item => score = item.data().count)
            getScore(score)
        }catch(err){
            console.log(err)
        }
    }
    const getScore = (score) => {
        dispatch({
            type:'GET_SCORE',
            payload:score
        })
    }
    useEffect(()=>{
        getScoreOfUser()
    },[])
    return (
        <View style={{ marginTop: 10 }}>
            <View style={styles.containScore}>
                <View>
                    <Text style={styles.score}>{Score}</Text>
                </View>
                <View style={styles.icon}>
                    <Icon name="star" type="antdesign" size={15} color="tomato" />
                </View>
            </View>
            <View style={{ position: 'absolute' }}>
                <Image source={require('../../image/diamond.png')} style={styles.imageScore} />
            </View>
        </View>
    )
}
const maptoStatetoProps = (state)=> ({
    Score: state.data.Score
})
export default connect(maptoStatetoProps,null)(Score) 