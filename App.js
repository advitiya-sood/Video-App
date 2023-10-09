
import React from 'react';
import {SafeAreaView, ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ContactList from './src/Components/ContactList';
import StateProvider from './Context/StateProvider';
import ContactScreen from './src/Screens/ContactScreen';
import CallingScreen from './src/Screens/CallingScreen';
import IncomingCall from './src/Screens/IncomingCall';
import CallScreen from './src/Screens/CallScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



function App() {
  const isDarkMode = useColorScheme() === 'dark';
  

  const Stack = createNativeStackNavigator();

  return (
    <StateProvider  >
        <StatusBar barStyle={"light-content"}/> 
        <View style={styles.sectionContainer}>
        <NavigationContainer  >
          <Stack.Navigator  >
            <Stack.Group screenOptions={{headerShown:false}} >
              <Stack.Screen name="ContactScreen" component={ContactScreen}  />
              <Stack.Screen name="CallScreen" component={CallScreen} />
              <Stack.Screen name="IncomingCall" component={IncomingCall} />
             <Stack.Screen name="CallingScreen" component={CallingScreen}  />
            </Stack.Group>
            
          </Stack.Navigator>
        </NavigationContainer>
        </View>
        
    </StateProvider>
    
    
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex:1,
    marginTop: 22,
    paddingHorizontal: 8,
  }
});

export default App;
