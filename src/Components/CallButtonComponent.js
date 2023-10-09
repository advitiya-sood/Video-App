import { Pressable, Text, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const CallButtonComponent = () => {

    const [icons,setIcons]=useState({
        mic:true,
        cameraOff:true,

    })

const handleCameraReverse=()=>{

}

const handleMic=()=>{
    setIcons({
        ...icons,mic:!icons.mic
    })

}

const handleCallOff=()=>{
   
}

const handleCameraOff=()=>{
    setIcons({
        ...icons,cameraOff:!icons.cameraOff
    })
 

}



  return (
    <View style={Styles.actionButtonsContainer}>
            <Pressable onPress={handleCameraReverse} style={Styles.ButtonStyle} ><Ionicons name="camera-reverse" size={30} /></Pressable>
            <Pressable onPress={handleMic} style={Styles.ButtonStyle} ><Ionicons name={icons.mic?"mic": "mic-off"} size={30} /></Pressable>
            <Pressable onPress={handleCameraOff}style={Styles.ButtonStyle} ><MaterialCommunityIcons name={icons.cameraOff?"camera":"camera-off"} size={30} /></Pressable>
            <Pressable onPress={handleCallOff} style={Styles.ButtonStyle} ><Ionicons name="call" size={30} color="#C0392B" /></Pressable>
        </View>
  )
}
const Styles=StyleSheet.create({
   
    actionButtonsContainer:{
        backgroundColor:"#D7DBDD",
        height:"16%",
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:18,
        paddingBottom:12,
        justifyContent:"space-between",
        borderTopEndRadius:18,
        borderTopLeftRadius:18   
    },
    ButtonStyle:{
        backgroundColor:"#AAB7B8",
        padding:12,
        borderRadius:50
    }
   
    })
export default CallButtonComponent