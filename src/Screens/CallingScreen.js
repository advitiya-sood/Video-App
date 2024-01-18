import { View, Text, StyleSheet, Pressable, PermissionsAndroid, Alert, Platform } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useRoute } from '@react-navigation/native';
import CallButtonComponent from '../Components/CallButtonComponent';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Voximplant} from 'react-native-voximplant';



const CallingScreen = ({navigation}) => {

    const [hasPermissions,setHasPermission]=useState(false)
    const Vox=Voximplant.getInstance();
    const [callState, setCallState]=useState('Initializing....')

const handlePress=()=>{
    navigation.goBack()
}

const route=useRoute()
const User=route.params?.user    // grab the user
const displayName=route.params?.user.user_display_name  

let call = useRef();                        // to prevent call from rerendering every time the component is rerendered




const handleCallFailed=(event)=>{
    Alert.alert(
        'Call falied',
    `Status:${event.code},${event.reason}`,
    [{
        text:'Ok',
        onPress:()=>navigation.navigate('ContactScreen')
    }])
}



const permissions=[
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    PermissionsAndroid.PERMISSIONS.CAMERA,
]

useEffect(()=>{                                              // grab necessory permissions 
    const checkPermission=async()=>{
        try{
            const granted=await PermissionsAndroid.requestMultiple(permissions)

            const grantedRecordAudio=granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO]==='granted'
            const grantedCamera=granted[PermissionsAndroid.PERMISSIONS.CAMERA]==='granted'

            if (grantedRecordAudio && grantedCamera){
                setHasPermission(true)
            }else{
                Alert.alert('Permissions not granted')
            }
        }
        catch(err){
            console.warn("Error:",err)
        }
    }

    if (Platform.OS=='android'){   // only need to fetch permissions for android
        checkPermission()
    }
    else{ 
        setHasPermission(true)
    }

},[])

useEffect(()=>{
    if (!hasPermissions){
        return;
    }

    const callSettings = {
        video: {
          sendVideo: true,
          receiveVideo: true,
        },
      };


const subscribeToEvents=()=>{
    call.current.on(Voximplant.CallEvents.Failed, handleCallFailed)   //subscribe to event
    call.current.on(Voximplant.CallEvents.ProgressToneStart, ()=>setCallState("Ringing...")) 
    call.current.on(Voximplant.CallEvents.Connected, ()=>setCallState("Connected")) 
    call.current.on(Voximplant.CallEvents.Disconnected, ()=>{
        setCallState("Disconnected")
        navigation.navigate('ContactScreen')
    }) 

}

const makeCall= async()=>{
    call.current = await Vox.call(User.user_name,callSettings)
    subscribeToEvents() 
}

makeCall()

    
return ()=>{
    call.current.off(Voximplant.CallEvents.Failed)
    call.current.off(Voximplant.CallEvents.ProgressToneStart)
    call.current.off(Voximplant.CallEvents.Connected)
    call.current.off(Voximplant.CallEvents.Disconnected)
}
},[hasPermissions])

const handleOnTerminate=()=>{
    call.current.hangup()
}

  return (
    <View style={Styles.main} >
        <Pressable  onPress={handlePress} style={Styles.BackIcon} >
            <Ionicons name="arrow-back" size={30} color="black" />
        </Pressable >
    

        <View style={Styles.info}>
      <Text style={{fontSize:28,fontWeight:"500"}} >{displayName}</Text>
      <Text style={{fontSize:18,fontWeight:"400"}}>{callState}</Text>
        </View>

        <CallButtonComponent handleOnTerminate={handleOnTerminate} />

    </View>
  )
}

const Styles=StyleSheet.create({
    main:{
        height:"100%",
        display:'flex',
        justifyContent:"space-between"
    },
    info:{
        justifyContent:"center",
        alignItems:"center",
        marginTop:96

    },
    BackIcon:{
        position:"absolute",
        top:25,
        left:10
        
    }

})

export default CallingScreen