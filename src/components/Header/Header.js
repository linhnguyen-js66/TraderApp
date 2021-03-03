import React from 'react'
import {TouchableOpacity} from "react-native"
import {Icon} from 'react-native-elements'
const HeaderView = ({name,type,color,onPress}) => {
    return(
        <TouchableOpacity
        onPress={onPress}
        >
            <Icon name={name} type={type} size={35} style={{alignItems:'flex-start',marginLeft:8}} color={color}/>
        </TouchableOpacity>
    )
}
export default HeaderView