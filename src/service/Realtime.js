
import firestore from '@react-native-firebase/firestore'
export const listenRealtimeUpdate = async (updateData) => {
    await firestore().collection("DataStatus").onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
            if(change.type == "added"){
                
                 updateData()
            }
            else if(change.type == 'modified'){
              
                updateData()
            }
        })
    })
}