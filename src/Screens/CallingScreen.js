import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import CallButtonComponent from '../Components/CallButtonComponent';
import Ionicons from 'react-native-vector-icons/Ionicons'


const CallingScreen = ({navigation}) => {

const handlePress=()=>{
    navigation.goBack()
}
const route=useRoute()
const displayName=route.params?.user.user_display_name


  return (
    <View style={Styles.main} >
        <Pressable  onPress={handlePress} style={Styles.BackIcon} >
            <Ionicons name="arrow-back" size={30} color="black" />
        </Pressable >
    

        <View style={Styles.info}>
      <Text style={{fontSize:28,fontWeight:"500"}} >{displayName}</Text>
      <Text style={{fontSize:18,fontWeight:"400"}}>Ringing +9183984928492</Text>
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