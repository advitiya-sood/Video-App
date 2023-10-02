import { StyleSheet, TextInput, View,  } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ContactList from '../Components/ContactList'
import dataContext from '../../Context/dataContext'

const ContactScreen = () => {
    const {contacts}=useContext(dataContext);
    const [search,setSearch]=useState('')

    const[mainContacts,setMainContacts]=useState(contacts)

    const   handleSearch=()=>{
        let filtered=contacts.filter((item)=>{
        if( item.user_display_name[0]?.toLowerCase()==search[0]?.toLowerCase() && (item.user_display_name.toLowerCase().includes(search.toLowerCase()) )){
            return true
        }})
        setMainContacts(filtered);
    }


    useEffect(()=>{
        handleSearch()
    },[search])

  return (
    <View>
        <TextInput value={search} onChangeText={(value)=>{setSearch(value)}}  placeholder='Search...' style={Styles.Search} />
      <ContactList contacts={search.length>0? mainContacts :contacts }/>
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

    }
})


export default ContactScreen