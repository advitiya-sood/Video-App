import { View, Text, ScrollView, FlatList, StyleSheet, Pressable } from 'react-native'
import React, { useContext } from 'react'


const ContactList = ({contacts,handlePress}) => {



  return (
      <FlatList data={contacts} renderItem={(data)=>(
        <Pressable onPress={handlePress.bind(this,data.item)} style={Styles.ListStyle} >
         <Text style={Styles.Text} >{data.item.user_display_name}</Text>
         <View style={Styles.Divider} />
        </Pressable>

  )}  />

  )
}


const Styles=StyleSheet.create({
  ListStyle:{
    marginTop:16, 
  },
  Divider:{
    height:1,
    width:"100%",
    backgroundColor:"#d4d9d7",
    marginTop:8,
  },
  Text:{
    fontSize:24

  }

})

export default ContactList