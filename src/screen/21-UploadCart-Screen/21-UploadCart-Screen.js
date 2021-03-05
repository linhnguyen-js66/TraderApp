import React, { useEffect, useState } from 'react'
import { TextInput, ToastAndroid } from 'react-native'
import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native"
import { Icon } from 'react-native-elements'
import styles from './style'
import HeaderView from '../../components/Header'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../navigation/screen'
import { fontSize, palette } from '../../theme'
import auth from '@react-native-firebase/auth'
import firestore from "@react-native-firebase/firestore"

const UploadCart21 = () => {
    return (
        <View>
            {/**Header*/}
            <View style={styles.header}>
                <View style={{ marginTop: 4 }}>
                    <HeaderView name="chevron-left" type="entypo"
                        onPress={() => navigation.goBack()}
                    />
                </View>
                <View style={styles.containTitlePage}>  
                    <Text style={styles.titlePage}>Đăng bài</Text>
                </View>
            </View>
            {/**end*/}
            <View>
                <Image source={require('../../image/imageicon.png')} style={styles.imageIcon} />

            </View>

        </View>
    )
}

export default UploadCart21