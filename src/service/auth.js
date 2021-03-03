import firestore from "@react-native-firebase/firestore"
import auth from '@react-native-firebase/auth'
import { Alert } from "react-native"

export const SignUpWithEmailAndPassword = async (email, password, confirmPw) => {
    try {
        if (email.trim() == "" || password.trim() == "" || confirmPw.trim() == "") {
            Alert.alert("Thông báo", "Thông tin đăng nhập còn trống")
            return false
        }
        if (password.trim() !== confirmPw.trim()) {
            Alert.alert("Lỗi", "Mật khẩu không khớp")
            return false
        }
        await auth().createUserWithEmailAndPassword(email, password)
        return true
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            Alert.alert("Thông báo", "Email đã được sử dụng")
        }
        if (error.code === 'auth/invalid-email') {
            Alert.alert("Thông báo", "Địa chỉ email không hợp lệ")
        }
        console.log(error)
        return false
    }
}
export const SignInWithEmailAndPassword = async (email,password) => {
    try{
      if(email.trim() == "" || password.trim() == ""){
          Alert.alert("Lỗi","Thông tin đăng nhập trống")
          return false
      }
      await auth().signInWithEmailAndPassword(email, password)
      return true
    }catch (error){
        if (error.code === "auth/user-not-found") {
            console.error("Email không tồn tại! Hãy đăng ký tài khoản mới")
          }
          if (error.code === "auth/wrong-password") {
            console.error("Sai mật khẩu! Vui lòng nhập lại")
          }
          if (error.code === "auth/invalid-email") {
            console.error("Email không hợp lệ! Vui lòng nhập lại")
          }
          console.log(error.code)
          console.log(error)
          return false
    }
}
export const SaveInformationUser = async (uid,email,username,type,notification,ava) => {
    try{
       if(username.trim() == "" || type == ""){
          Alert.alert("Thông báo","Thông tin còn trống")
          return false
       }
       await firestore().collection("UserInformation").doc(uid).set({
           name:username,
           email:email,
           type:type,
           notification:notification,
           count:100,
           uid:uid,
           ava:ava
       })
       Alert.alert("Thông báo","Đăng kí thành công")
       return true
    }catch (error){
       Alert.alert("Error",`${error}`)
       return false
    }
}