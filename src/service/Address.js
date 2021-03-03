import firestore from '@react-native-firebase/firestore'

export let Address = {
    dataResultAddress:[],
    lastVisibleAddress:null
}

export const retrieveDataAddress = async () => {
    try{
      let documentSnapshots = await firestore().collection("Address").get()
      documentSnapshots.docs.map(item => Address.dataResultAddress.push(item.data()))
      let lastVisible = Address.dataResultAddress[Address.dataResultAddress.length - 1].id
      Address.lastVisibleAddress = lastVisible
    }catch(error){
        console.log(error)
    }
}

export const retrieveMoreAddress = async () => {
    try{
       let documentSnapshots = await firestore().collection("Address")
       .startAt(Address.lastVisibleAddress)
       .get()

       documentSnapshots.docs.map(item => Address.lastVisibleAddress.push(item.data()))
       let lastVisibleMore = Address.dataResultAddress[Address.dataResultAddress.length -1].id
       
       Address.lastVisibleAddress = lastVisibleMore
    }catch(error){
        console.log(error)
    }
}
