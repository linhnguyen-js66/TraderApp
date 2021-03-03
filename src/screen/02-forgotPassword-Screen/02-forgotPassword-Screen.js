import React, { useEffect, useState } from 'react'
import { Text,View} from "react-native"
import styles from './style'
import InputForm from '../../components/InputForm'
import ButtonForm from '../../components/ButtonForm'
import {Icon} from 'react-native-elements'

const forgotPasswordScreen = () => {
    return(
        <View>
            <View style={styles.containTitle}>
               <Text style={styles.textHead}>Bạn đã quên mật khẩu</Text> 
               <Text style={styles.description}>Hãy nhập địa chỉ email của bạn. Sau đó bạn sẽ nhận được 1 đường dẫn để tạo mật khẩu mới</Text>
            </View>
            <View style={styles.input}>
                <View style={styles.Icon}>
                    <Icon name="keyboard" type="Entypo" color="black"/>
                </View>
                <View style={styles.textInput}>
                    <InputForm placeholder="Email của bạn"/>
                </View>
                
            </View>
            <View style={styles.button}>
                <ButtonForm title="Gửi đi"/>
            </View>
        </View>
    )
}

export default forgotPasswordScreen