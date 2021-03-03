import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, Switch, Alert } from "react-native"
import { Icon } from 'react-native-elements'
import styles from './style'
import InputForm from '../../components/InputForm'
import ButtonFrom from '../../components/ButtonForm'
import { palette } from '../../theme'
import { SaveInformationUser } from '../../service/auth'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
const AddInformation20 = ({route}) => {
    const { email } = route.params
    const navigation = useNavigation()
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [chooseType,setChooseType] = useState('')
    const [name,setName] = useState('')
    const [DataType,setDataType] = useState([])
    const [photo,setPhoto] = useState(null)
    //lấy avatar 
    const handleChoosePhoto = () => {
        const options = {
            noData: true
        }
        launchImageLibrary(options, response => {
            if (response.uri) {
                setPhoto(response.uri)
            }
        })
    }
    //Lấy dữ liệu của kiểu tài khoản 
    const getDataTypeAccount = async () => {
       const listType = []
       const getDataType = await firestore().collection('TypeAccount').get()
       for(let item of getDataType.docs){
           listType.push(item.data())
       }
       setDataType(listType)
    }
    
    useEffect(()=>{getDataTypeAccount()},[])
    //Kiểm tra quá trình điền thông tin
    const [processSaveInfo,setProcessSaveInfo] = useState(false)
    return (
        <View style={{ flex: 1, backgroundColor:palette.white}}>
            {/**Header */}
            <ScrollView>
            <View style={styles.containAva}>
                <Image source={{uri:photo}} style={styles.addava} />
                <TouchableOpacity style={styles.containPlus}
                onPress={()=>{
                   handleChoosePhoto()   
                }}
                >
                    <Icon
                        name="plus"
                        type="antdesign"
                        style={styles.iconplus}
                        color="white"
                        size={15}
                    />
                </TouchableOpacity>
            </View>
            {/**Nhập tên công ty */}
            <View style={styles.containInput}>
                <InputForm 
                title="Tên" 
                placeholder="Nhập..." 
                value={name}
                onChangeText={(text)=>setName(text)}
                />
            </View>
            {/**Choose Acount */}
            <View style={styles.containChooseType}>
                {DataType.map(item => 
                       <TouchableOpacity style={{ flex: 1 }} key={item.id}
                          onPress={()=>setChooseType(item.name)}
                       >
                       <Image source={{uri:item.image}} style={styles.imgCompany} />
                       <Text style={styles.type}>{item.name}</Text>
                       {chooseType == item.name ?
                        <View style={styles.iconCheck}>
                           <Icon name="check" type="entypo" size={40} color="#00ff00" />
                       </View> : null
                       }
                      
                   </TouchableOpacity>
                )}
            </View>
            {/**Nút bật thông báo */}
            <View style={styles.containerSwitch}>
                <Text style={styles.titleSwitch}>Bật thông báo</Text>
                <View style={styles.buttonSwitch}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#33cc33" }}
                        thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>
            </ScrollView>
           
            {/**Nút đi tiếp tới màn hình home */}
            <View style={styles.buttonFooter}>
                <ButtonFrom title="Đi tiếp" 
                    onPress={async ()=>{
                       setProcessSaveInfo(true)
                       let uid = auth().currentUser.uid
                       let isSaveInfo = await SaveInformationUser(uid,email,name,chooseType,isEnabled,photo)
                       setProcessSaveInfo(false)
                       if(isSaveInfo){
                           Alert.alert("Thông báo","Đăng kí thành công")
                           navigation.navigate("Home")
                       }
                    }}
                    disabled={processSaveInfo}
                />
            </View>
        </View>
    )
}
export default AddInformation20