import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"

const IncomingCall = () => {




const handleDecline=()=>{

}

const handleAccept=()=>{

}


  return (
    <View style={Styles.main} >
      
      <View style={Styles.info}>
        <Text style={{fontSize:28,fontWeight:"500"}} >John Smith</Text>
        <Text style={{fontSize:18,fontWeight:"400"}}>Video...</Text>
      </View>

      <View style={{marginBottom:50}} >
            <View>
                
            </View>
            <View style={Styles.callActionButton} >
                <Pressable onPress={handleDecline} style={[{backgroundColor:"#C0392B"},Styles.ButtonStyle]} ><AntDesign name="close" size={40} color="white" /></Pressable>
                <Pressable onPress={handleAccept} style={[{backgroundColor:"#2980B9"},Styles.ButtonStyle]} ><AntDesign name="check" size={40} color="white" /></Pressable>
            </View>
        </View>

    </View>
  )
}


const Styles=StyleSheet.create({
    main:{
        
        height:"100%",
        display:'flex',
        justifyContent:"space-between",
        
    },
    info:{
        justifyContent:"center",
        alignItems:"center",
        marginTop:86

    },
    callActionButton:{
        flexDirection:"row",
        justifyContent:'space-between',
        paddingHorizontal:33, 
    },
    ButtonStyle:{
        padding:16,
        borderRadius:50,
    }

})

export default IncomingCall