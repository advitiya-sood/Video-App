import React, { useEffect, useState,useContext } from 'react';
import { ScrollView } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { View, Text, Alert,StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import {Voximplant} from 'react-native-voximplant';
import dataContext from '../../Context/dataContext';



export default function Login({navigation}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors,setErrors]=useState({})
    const {contacts,setContacts}=useContext(dataContext);

    const Vox=Voximplant.getInstance();
    
    let VoxuserName=`${username}@${"p2p-video"}.${"advitiya-sood"}.voximplant.com`


useEffect(()=>{
  const voxCheck= async ()=>{
    try{
        let state = await Vox.getClientState();
        console.log("state",state)
        if (state === Voximplant.ClientState.DISCONNECTED) {
            await Vox.connect();
            }
            else if(state === Voximplant.ClientState.LOGGED_IN ){
                redirectHome()
            }

    } catch(e){
        Alert.alert(e.name + " "+e.message)
    }
}

    voxCheck()
},[])

    


    const handleLogin = async() => {
        try{
            let authResult = await Vox.login(VoxuserName, password);
            console.log("auth result--",authResult.displayName)
            redirectHome();
        }catch(e){
            Alert.alert(e.code + " "+e.message)
        }
    }



    const validate = async () => {
      let isValid = true;
      if (!username) {
        handleError('Please input email', 'email');
        isValid = false;
      }
      if (!password) {
        handleError('Please input password', 'password');
        isValid = false;
      }
      if (isValid) {
        handleLogin();
      }
    };


      const handleRegister = () => {
        
      };

      const handleError = (error, input) => {
        setErrors(prevState => ({...prevState, [input]: error}));
      };


      const redirectHome=()=>{
        navigation.reset({
            routes:[
                {
                    name:"ContactScreen",
                }  
            ]
        })

      }

  return (
    <KeyboardAvoidingView behavior="height" style={{flex:1}}>
    <View style={{flex:1}}>
      <View  style={Styles.TopCircle} />

      <View style={{width:"100%",marginLeft:40,marginTop:50}} >
    <Text style={{fontSize:30,fontWeight:"500"}}>Welcome!</Text>
    <Text style={Styles.HeadingText}>Login </Text>
      </View>

    <ScrollView contentContainerStyle={{justifyContent:"center",alignItems:"center", gap:5}}
    style={{width:"100%",marginTop:40}} >
      <Input
        placeholder="Email"
        value={username}
        onFocus={() => handleError(null, 'email')}
        errorMessage={errors.email}
        onChangeText={(text) => setUsername(text)}
        inputStyle={{ paddingLeft: 10 }}
        containerStyle={{ width: '85%', marginBottom: 20 }}
        />
      <Input
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onFocus={() => handleError(null, 'password')}
        errorMessage={errors.password}
        onChangeText={(text) => setPassword(text)}
        inputStyle={{ paddingLeft: 10 }}
        containerStyle={{ width: '85%', marginBottom: 30 }}
        />
      <Button
        title="Login"
        onPress={validate}
        buttonStyle={{ backgroundColor: '#1A5276' }}
        containerStyle={{ width: '50%', marginBottom: 10,borderRadius:50 }}
        />
    </ScrollView >
    
    <View>
    <Text  style={Styles.BelowText}
        onPress={handleRegister}
        >Dont have an account? <Text style={{color:"#1A5276"}} >Register</Text></Text>
    </View>
  </View>
  </KeyboardAvoidingView>
  )
}

const Styles=StyleSheet.create({

    TopCircle:{
        backgroundColor:"#1A5276",
        height:150,
        width:150,
        borderBottomEndRadius:130

    },

    LoginForm:{
        flex: 1, 
        justifyContent: "flex-start", 
        alignItems: "center", 
        width:"100%",
        marginTop:40,
        padding:5,
    },
    HeadingText:{
        fontSize: 38,
         marginBottom: 30,
         fontWeight:"bold"
    },

    BelowText:{
        fontSize:15, 
        bottom:10,
        fontWeight:"500", 
        padding:10,
        width:"100%",
        marginHorizontal:85,
    },
})