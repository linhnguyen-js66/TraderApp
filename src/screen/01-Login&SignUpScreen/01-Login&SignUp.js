import React, { useEffect, useState } from 'react'
import { Text, Alert, ScrollView, TouchableOpacity, View,Image, AsyncStorage} from "react-native"
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import styles from './style'
import {palette, spacing} from "../../theme"
import InputForm from '../../components/InputForm'
import ButtonForm from '../../components/ButtonForm'
import { useNavigation } from '@react-navigation/native'
import {screen} from '../../navigation/screen'
import { SignUpWithEmailAndPassword, SignInWithEmailAndPassword } from '../../service/auth'
const LoginSignUp = () => {
    const [modalViewVisible, setModalViewVisible] = useState(false)
    const [signUpView, setSignUpView] = useState(false)
    const navigation = useNavigation()
    //Phần email và mật khẩu để đăng kí, đăng nhập
    const [email, setEmail] = useState("admin@gmail.com")
    const [password, setPassword] = useState("123456")
    const [confirmPw, setConfirmPw] = useState("123456")
    //Phần để kiểm tra quá trình đăng kí có xảy ra lỗi hay không 
    const [processSignUp,setProcessSignUp] = useState(false)
    const [processSignIn,setProcessSignIn] = useState(false)
    return (
        <KeyboardAwareScrollView>
            <View style={{marginTop:64}}>
                <Image source={require('../../image/logo.png')} style={styles.logo}/>
            </View>
            
            {!modalViewVisible && (
                <KeyboardAwareScrollView>
                    {/* signInView */}
                    <View style={styles.containerTopTab}>
                        <TouchableOpacity style={styles.signInContain} onPress={() => {
                            setModalViewVisible(false)
                        }}>
                            <Text
                                style={[styles.signInTitle,
                                {
                                    color: palette.buttonColor,
                                    borderBottomWidth: 4,
                                    borderBottomColor: palette.buttonColor
                                }
                                ]}>Đăng nhập</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.signUpContain}
                            onPress={() => {
                                setModalViewVisible(true)
                                setSignUpView(true)
                            }}
                        >
                            <Text style={styles.signUpTitle}>Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.signInView}>
                        <View style={styles.containInput}>
                            <View>
                                <InputForm title="Email" onChangeText={(text)=> setEmail(text)}
                                  value={email}
                                />
                            </View>
                            <View style={styles.password}>
                                <InputForm title="Mật khẩu" isPassWord={true} 
                                onChangeText={(text)=>setPassword(text)}
                                value={password}
                                />
                            </View>
                            <View>
                                <ButtonForm title="Đăng nhập" 
                                onPress={async ()=>{
                                  setProcessSignIn(true)
                                  let isSignIn = await SignInWithEmailAndPassword(email,password)
                                  setProcessSignIn(false)
                                  if(isSignIn){
                                      navigation.navigate("Home")
                                  }
                                }}
                                disabled = {processSignIn}
                                />
                                <TouchableOpacity style={styles.forgotPassword}
                                   onPress={()=>navigation.navigate(screen.ForgotPassword)}
                                >
                                    <Text style={styles.forgotTitle}>Bạn đã quên mật khẩu?</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            )}
            {
                modalViewVisible && signUpView && (
                    <KeyboardAwareScrollView>
                        {/* signUpView */}
                        <View style={styles.containerTopTab}>
                            <TouchableOpacity style={styles.signInContain} onPress={() => {
                                setModalViewVisible(false)
                            }}>
                                <Text style={styles.signInTitle}>Đăng nhập</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.signUpContain}
                                onPress={() => {
                                    setModalViewVisible(true)
                                    setSignUpView(true)
                                }}
                            >
                                <Text style={[styles.signUpTitle, {
                                    color: palette.buttonColor,
                                    borderBottomWidth: 4,
                                    borderBottomColor: palette.buttonColor
                                }]}>Đăng ký</Text>
                            </TouchableOpacity>
                        </View>
                        {/* bodySignUp */}
                        <View style={styles.signInView}>
                            <View style={styles.containInput}>
                                <View>
                                    <InputForm title="Email" 
                                    onChangeText={(text)=> setEmail(text)}
                                    value={email}
                                    />
                                </View>
                                <View style={styles.email}>
                                    <InputForm title="Mật khẩu" isPassWord={true} 
                                    onChangeText={(text)=> setPassword(text)}
                                    value={password}
                                    />
                                </View>
                                <View style={styles.password}>
                                    <InputForm title="Nhập lại mật khẩu" isPassWord={true} 
                                    onChangeText={(text)=> setConfirmPw(text)}
                                    value={confirmPw}
                                    />
                                </View>
                                <View>
                                    <ButtonForm title="Tạo tài khoản" 
                                     onPress={async ()=>{
                                       setProcessSignUp(true)
                                       let isSignUpSuccess = await SignUpWithEmailAndPassword(email,password,confirmPw)
                                       setProcessSignUp(false)
                                       if(isSignUpSuccess){
                                           navigation.navigate(screen.AddInformation,{
                                               email:email
                                           })
                                       }
                                     }}
                                     disabled = {processSignUp}
                                    />
                                </View>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                )
            }

        </KeyboardAwareScrollView>
    )
}

export default LoginSignUp

