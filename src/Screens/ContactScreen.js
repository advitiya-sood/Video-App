import { StyleSheet, Text, TextInput, View,  } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ContactList from '../Components/ContactList'
import dataContext from '../../Context/dataContext'
import {Voximplant} from 'react-native-voximplant';

const ContactScreen = ({navigation}) => {
    const {contacts}=useContext(dataContext);
    const [search,setSearch]=useState('')

    const[mainContacts,setMainContacts]=useState(contacts)
    const Vox=Voximplant.getInstance();

    const handleSearch=()=>{
        let filtered=contacts.filter((item)=>{
        if( item.user_display_name[0]?.toLowerCase()==search[0]?.toLowerCase() && 
        (item.user_display_name.toLowerCase().includes(search.toLowerCase()) )){
            return true
        }})
        setMainContacts(filtered);
    }

    const handlePress =(item)=>{
        navigation.navigate("CallingScreen",{user:item})

    }



    useEffect(()=>{                                                                  
      Vox.on(Voximplant.ClientEvents.IncomingCall, (incomingCallEvent)=>{                   //handling the incoming call event
        navigation.navigate('IncomingCallScreen',{incomingCallEvent:incomingCallEvent})
  
      } )

      return ()=>{
        Vox.off(Voximplant.ClientEvents.IncomingCall)
      }
  
  
    },[])


    useEffect(()=>{
        handleSearch()
    },[search])

  return (
    <View style={{paddingHorizontal:4}}>
        <View style={Styles.ContactHeader}>
            <Text style={{color:"#3498DB",fontWeight:"500",fontSize:16}}>Groups</Text>
            <Text style={{fontWeight:"500",fontSize:16}}>Contacts</Text>
            <Text style={{color:"#3498DB",fontWeight:"500",fontSize:16}}>Add</Text>

        </View>
        <TextInput value={search} onChangeText={(value)=>{setSearch(value)}}  placeholder='Search...' style={Styles.Search} />
      <ContactList  handlePress={handlePress} contacts={search.length>0? mainContacts :contacts }/>
    </View>
  )
}


const Styles=StyleSheet.create({
    Search:{
        width:"100%",
        height:42,
        borderRadius:12,
        padding:12,
        borderColor:"grey",
        borderWidth:1

    },
    ContactHeader:{
        height:40,
        marginBottom:10,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
})


export default ContactScreen