import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

export default function AdminLogin() {
  const navigation = useNavigation(); // Initialize navigation hook

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userError, setuserError] = useState(null);
  const [passError, setpassError] = useState(null);

  const handlechangetext=(text)=>{
    setpassError(null);
    setuserError(null);
  }

  const handleLogin = () => {
    // Assuming 'username' and 'password' are defined somewhere in your code
    if (username === 'Admin' && password === '12345') {
      console.log("Navigating to AdminSelect");
      navigation.navigate('AdminSelect');

    } 
    else if(username === '' && password === '') {
      // Handle case when username or password is null
      console.error("Username or password is null");
      setuserError("Please Enter Username");
      setpassError("Please Enter Password");
      return;
    }
    else if(username !== 'Admin' || password !== '12345') {
      // Handle case when username or password is null
      console.error("Username or password is null");
      setuserError("Incorrect Username");
      setpassError("Incorrect Password");
      return;
    }
 
  };

  return (
    <View style={styles.container}>

      <Text style={styles.heading}>ADMIN - LOGIN</Text>
      
      <View style={{alignItems:"center"}}>
        <Image 
            source={require('../assets/VCET_Logo.png')} 
            style={styles.image} />
      </View>
      

      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder="User Name"  onChangeText={(text)=>{setUsername(text);handlechangetext(text)}} />
        <Text style={styles.errorText}>{userError}</Text>
        <TextInput style={styles.textInput} placeholder="Password" onChangeText={(text)=>{setPassword(text);handlechangetext(text);}}/>
        <Text style={styles.errorText}>{passError}</Text>
        <Button title="Login" onPress={handleLogin} color='#00D4FF' />
        <View style = {styles.notice}>
          <Text style= {{fontWeight: 'bold'}}>NOTE : </Text>
          <Text style = {{color : 'blue',}}>Admin Login Only. Thank You !!</Text>
        </View>
        
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#D6FFFE", 
    paddingTop:50,
    alignItems:'center' 
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
    backgroundColor: '#ADF2FB',
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
    letterSpacing: 2,
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
    top : 40, 
    flexDirection: 'row', 
    columnGap: 5, 
    justifyContent: 'center',
    
  }
});

