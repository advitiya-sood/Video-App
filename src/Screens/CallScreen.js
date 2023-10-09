import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CallButtonComponent from '../Components/CallButtonComponent'

const CallScreen = () => {
  return (
    <View style={Styles.main}>
        <View>

    <View style={Styles.miniScreen}>

    </View>

        </View>
      <CallButtonComponent/>
    </View>
  )
}



const Styles=StyleSheet.create({
    main:{
        height:"100%",
        display:'flex',
        justifyContent:"space-between"
    },
    miniScreen:{
        width:100,
        height:150,
        backgroundColor:"pink",
        borderRadius:12,
        position:"absolute",
        right:10,
        top:50
    }

})
export default CallScreen