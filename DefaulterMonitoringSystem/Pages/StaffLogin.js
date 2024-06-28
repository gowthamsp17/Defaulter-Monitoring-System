import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
//import axios from 'axios';
// import {openDatabase} from 'react-native-sqlite-storage';
import * as SQLite from 'expo-sqlite';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ipAddress } from '../App';

export default function LoginPage() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handlechangetext=(text)=>{
    setpassError(null);
    setuserError(null);
  }
  
  const handleSubmit = () => {
    
    console.log(username, password);
    const userData = {
      username: username,
      password
    }
    axios
      .post(`${ipAddress}/login-user`, userData)
      .then(res => {
        console.log(res.data);
        if(res.data.status == 'ok')
        {
          console.log("Login success")
          //Alert.alert('Login success!');
          AsyncStorage.setItem("token", res.data.data);
          AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
          navigation.navigate('Select');
        }
        else{
          Alert.alert(JSON.stringify(res.data));
        }
      });
      
  }

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='always'>
    <View style={{ flex: 1, backgroundColor: "#D6FFFE", paddingTop: 50, alignItems: 'center' }}>

      <Text style={styles.heading}>STAFF - LOGIN</Text>

      <View style={{ alignItems: "center" }}>
        <Image
          source={require('../assets/VCET_Logo.png')}
          style={styles.image} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder="User Name" onChange={(e) => setUsername(e.nativeEvent.text)} />
        {/* <Text style={styles.errorText}>{userError}</Text> */}
        <Text></Text>
        <TextInput style={styles.textInput} placeholder="Password" onChange={(e) => setPassword(e.nativeEvent.text)} />
        {/* <Text style={styles.errorText}>{passError}</Text> */}
        <Text></Text>
        <Button title="Login" onPress={() => handleSubmit()} color='#00D4FF' />

        <View style={styles.notice}>
          <Text style={{ fontWeight: 'bold' }}>NOTE : </Text>
          <Text style={{ color: 'green', }}>Staff Login Only. Thank You !!</Text>
        </View>

      </View>

    </View>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "lightblue"
  },
  inputContainer: {
    height: 350,
    width: 330,
    marginTop: 60,
    borderColor: '#75EDFC',
    borderWidth: 3,
    borderRadius: 25,
    paddingTop: 50,
    padding: 20,
    backgroundColor: '#ADF2FB'
  },
  textInput: {
    marginBottom: 10,
    padding: 8,
    borderRadius: 15,
    backgroundColor: 'white',
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: 'grey'
  },
  heading: {
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: "center",
    letterSpacing: 3,
    lineHeight: 55,
    backgroundColor: '#46D6FC',
    marginBottom: 20,
    borderTopColor: '#009EFF',
    borderBottomColor: '#009EFF',
    borderBottomWidth: 2,
    borderTopWidth: 2,
    marginTop: 10
  },
  image: {
    width: 100,
    height: 110,
    position: 'relative',
  },
  notacc: {
    width: 170,
    height: 170,
    fontSize: 15,
    position: 'relative',
    left: 25,
    top: 45,
  },
  signup: {
    position: 'relative',
    left: 190,
    top: -125,
    color: "red",
  },
  shadow: {
    position: "relative",
    borderRadius: 10,
    elevation: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  notice: {
    backgroundColor: '#75EDFC',
    padding: 5,
    borderRadius: 7,
    position: 'relative',
    top: 40,
    flexDirection: 'row',
    columnGap: 5,
    justifyContent: 'center',
  }
});

