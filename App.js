
import React from 'react';
import {SafeAreaView, ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ContactList from './src/Components/ContactList';
import StateProvider from './Context/StateProvider';
import ContactScreen from './src/Screens/ContactScreen';



function App() {
  const isDarkMode = useColorScheme() === 'dark';
  

 

  return (
    <StateProvider>
      <SafeAreaView style={styles.sectionContainer} >
        <StatusBar barStyle={'dark-content'}/> 
         <ContactScreen/>
      </SafeAreaView>
    </StateProvider>
    
    
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 8,
    paddingHorizontal: 8,
  }
});

export default App;
