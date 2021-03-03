import React, { useState } from 'react'
import { View,TextInput } from 'react-native'
import styles from './style'

const CommentForm = ({source,placeHolder,value, onChangeText}) => {
  return(
  
          <View style={styles.containTextInput}>
              <TextInput
               placeholder={placeHolder}
               value={value}
               onChangeText={onChangeText}
               style={styles.input}
               multiline={true}
               autoFocus={true}
               
              />
          </View>
 
  )
}
export default CommentForm