import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native'
import React, { useContext } from 'react'


const ContactList = ({contacts}) => {



  return (
      <FlatList data={contacts} renderItem={(data)=>(
        <View style={Styles.ListStyle} >
         <Text style={Styles.Text} >{data.item.user_display_name}</Text>
         <View style={Styles.Divider} />
        </View>

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