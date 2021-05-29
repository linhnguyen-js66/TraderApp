import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, TextInput } from "react-native"
import styles from './style'

const SearchInput = ({placeholder,value,onFocus,onChangeText}) => {
    return(
        <View style={styles.textInputContain}>
        <TextInput style={styles.textInput} 
          placeholder={placeholder}
          value={value}
          onFocus={onFocus}
          onChangeText={onChangeText}
        />
    </View>
    )
}
export default SearchInput