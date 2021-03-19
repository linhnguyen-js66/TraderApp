import React from 'react'
import {TouchableOpacity} from "react-native"
import {Icon} from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
const HeaderView = ({name,type,color,onPress}) => {
    return(
        <TouchableOpacity
        onPress={onPress}
        >
            <Icon name={name} type={type} size={30} style={{alignItems:'flex-start',marginLeft:8}} color={color}/>
        </TouchableOpacity>
    )
}
export default HeaderView