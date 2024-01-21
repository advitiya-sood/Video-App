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
    const [videoStreamId, setVideoStreamId]=useState({
        localVideoStreamId: null,
        remoteVideoStreamId: null
    })

    const route=useRoute()
    const {call:incomingCall,isIncomingCall}=route.params                 // when redirecting from incoming call screen(receivening) // same call event but diffrent name
                                                             // in case of receiving call we dont have a call object in this screen
    const User=route.params?.user    // grab the user
    const displayName=route.params?.user?.user_display_name  

    let call = useRef(incomingCall);                        // to prevent call from rerendering every time the component is rerendered
                                                            // incoming call default value for receiveing the call will beb undefined in case we start the call

    let endpoint = useRef(null);

    const permissions=[
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
    ]

    const callSettings = {
        video: {
        sendVideo: true,
        receiveVideo: true,
        },
    };


    const handleCallFailed=(event)=>{
        Alert.alert(
            'Call falied',
        `Status:${event.code},${event.reason}`,
        [{
            text:'Ok',
            onPress:()=>navigation.navigate('ContactScreen')
        }])
    }


    const handleOnTerminate=()=>{
        call.current.hangup()
    }

    const handlePress=()=>{
        navigation.goBack()
    }


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
        }else{ 
            setHasPermission(true)
        }
    },[])

    useEffect(()=>{
        if (!hasPermissions){
            return;
        }

        // noraml call events
    const subscribeToEvents=()=>{
        call.current.on(Voximplant.CallEvents.Failed, handleCallFailed)   //subscribe to event
        call.current.on(Voximplant.CallEvents.ProgressToneStart, ()=>setCallState("Ringing...")) 
        call.current.on(Voximplant.CallEvents.Connected, ()=>setCallState("Connected")) 
        call.current.on(Voximplant.CallEvents.Disconnected, ()=>{
            setCallState("Disconnected")
            navigation.navigate('ContactScreen')
        }) 
        call.current.on(Voximplant.CallEvents.LocalVideoStreamAdded,(event)=>{
            setVideoStreamId((prev)=>({...prev,"localVideoStreamId":event.videoStream.id}));
        })
        call.current.on(Voximplant.CallEvents.EndpointAdded,(event)=>{
            endpoint.current= event.endpoint
            subscribeToEndpointEvents()
        })

    }

    // subscribing to endpoint event
    const subscribeToEndpointEvents=()=>{
        endpoint.current.on(Voximplant.EndpointEvents.RemoteVideoStreamAdded,(event)=>{
            setVideoStreamId((prev)=>({...prev,"remoteVideoStreamId":event.videoStream.id}))
            
        })

    }

  


    // only one of the scenario will run one one device so code accordingly.
    const makeCall= async()=>{
        call.current = await Vox.call(User.user_name,callSettings)
        subscribeToEvents() 
    }

    const answerCall=()=>{
        call.current.answer(callSettings)
        subscribeToEvents()

        // for the case that receieve the call  endpoint is already added so will have to the event on ans call
        endpoint.current=call.current.getEndpoints()[0];                 
        subscribeToEndpointEvents()
    }


    if (isIncomingCall){
       answerCall()
    }else{
        makeCall()
    }

        // closing the events
    return ()=>{
        call.current.off(Voximplant.CallEvents.Failed)
        call.current.off(Voximplant.CallEvents.ProgressToneStart)
        call.current.off(Voximplant.CallEvents.Connected)
        call.current.off(Voximplant.CallEvents.Disconnected)
        call.current.off(Voximplant.EndpointEvents.RemoteVideoStreamAdded)
        call.current.off(Voximplant.CallEvents.EndpointAdded)
    }
    },[hasPermissions])


  return (
    <View style={Styles.main} >
        <Pressable  onPress={handlePress} style={Styles.BackIcon} >
            <Ionicons name="arrow-back" size={30} color="black" />
        </Pressable >
    

        <View style={Styles.info}>
      <Text style={{fontSize:28,fontWeight:"500"}} >{displayName}</Text>
      <Text style={{fontSize:18,fontWeight:"400"}}>{callState}</Text>
        </View>
     
        <Voximplant.VideoView
            videoStreamId={videoStreamId.remoteVideoStreamId}
            style={Styles.remoteScreen}
        />

        <Voximplant.VideoView
            videoStreamId={videoStreamId.localVideoStreamId}
            style={Styles.miniScreen}
        />

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
    miniScreen:{
        width:100,
        height:150,
        backgroundColor:"pink",
        borderRadius:12,
        position:"absolute",
        zIndex:99,
        right:10,
    },
    remoteScreen:{
        width:'100%',
        height:"100%",
        backgroundColor:"#F2FAFF",
        borderRadius:12,
        position:"absolute",
        left:0,
        top:0,
        right:0,
        zIndex:1,
        bottom:0
    },
    BackIcon:{
        position:"absolute",
        top:25,
        left:10
    }

})

export default CallingScreen