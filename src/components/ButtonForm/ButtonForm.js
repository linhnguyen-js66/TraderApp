import React from 'react'
import { Text,TouchableOpacity,View } from "react-native"
import styles from './style'

const ButtonForm = ({onPress,title, index, disabled}) => {
    return(
        <TouchableOpacity onPress={onPress} 
        style={[styles.buttonForm,index == 1 && {backgroundColor:'#AFED61'}]}
        disabled={disabled}
        >
              <Text style={[styles.textButton, index == 1 && {color:"white"}]}>{title}</Text>
        </TouchableOpacity>
    )
}
export default ButtonForm