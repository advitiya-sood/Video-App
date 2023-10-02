import { View, Text } from 'react-native'
import React, { useState } from 'react'
import dataContext from './dataContext'
import Contacts from "../src/Data/Contacts.json" 


function StateProvider  (props) {


const [contacts,setContacts]=useState(Contacts);

  return (
    <dataContext.Provider  value={{contacts}} >
      {props.children}
    </dataContext.Provider>
  )
}

export default StateProvider