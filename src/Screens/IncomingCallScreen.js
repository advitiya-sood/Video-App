import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, {useEffect,useState} from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"
import { useNavigation, useRoute } from '@react-navigation/native'
import {Voximplant} from 'react-native-voximplant';

const IncomingCallScreen = () => {

const [caller,setCaller]=useState('')

  const route=useRoute();
  const navigation= useNavigation()
  const Vox=Voximplant.getInstance();
  const{incomingCallEvent}=route.params;    //we get it from the conctas screen when  we receieve the call event  


let call= incomingCallEvent.call;
 
useEffect(() => {         
  setCaller(call.getEndpoints()[0].displayName)
                                                                
  call.on(Voximplant.CallEvents.Disconnected,()=>{          // if the caller hangsup thats why in useEffect
    navigation.navigate('ContactScreen')  
  }) 
}, [])


const handleAccept=()=>{
  navigation.navigate("CallingScreen",{
    call,
    isIncomingCall:true
      })
}
const handleDecline=()=>{
  call.decline()
}


  return (
    <View style={Styles.main} >
      
      <View style={Styles.info}>
        <Text style={{fontSize:28,fontWeight:"500"}} >{caller}</Text>
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

export default IncomingCallScreen