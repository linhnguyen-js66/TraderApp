import { StyleSheet } from 'react-native'
import { spacing, palette, fontSize } from "../../theme"
export default StyleSheet.create({
    Image: {
        width: 46,
        height: 46,
        borderRadius: 200,
    },
   imageScore:{
       width:30,
       height:30
   },
   containScore:{
    backgroundColor:palette.colorgray,
    height:22,
    marginLeft:15,
    width:87,
    alignItems:'center',
    marginTop:5,
    borderTopEndRadius:10,
    borderBottomEndRadius:10,
    flexDirection:'row'
   },
   score:{
       fontWeight:'bold',
       fontSize:15,
       left:20
   },
   icon:{
       flex:1,
       alignItems:'flex-end',
       marginRight:5
   }
})