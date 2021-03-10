import React from 'react'
import { Text, TextInput,View } from "react-native"
import styles from './style'
const InputForm = ({title,placeholder,isPassWord,onChangeText,value}) => {
    return(
        <View>
            <Text style={styles.title}>{title}</Text>
             <TextInput style={styles.textInput}
              value={value} 
              onChangeText={onChangeText} 
              placeholder={placeholder} 
              secureTextEntry={isPassWord}
     
              />
        </View>
    )
}

export default InputForm