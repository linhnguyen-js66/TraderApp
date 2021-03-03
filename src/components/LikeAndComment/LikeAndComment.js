import React from 'react'
import { Text, TextInput,View,TouchableOpacity } from "react-native"
import styles from './style'
import {Icon} from 'react-native-elements'
const LikeAndComment = ({type,name,color,style, onPress}) => {
    return(
            <TouchableOpacity
              onPress={onPress}
            >
                <Icon name={name} type={type} color={color} style={style} size={24}/>
            </TouchableOpacity>
    )
}

export default LikeAndComment