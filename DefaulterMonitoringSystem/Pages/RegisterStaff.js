import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
//import { Feather } from 'react-native-feather';
import { Eye, EyeOff } from 'react-native-feather';
import axios from 'axios';
import { ipAddress } from '../App';

const RegisterStaff = () => {
  const [username, setUserName] = useState('');
  const [usernameVerify, setUsernameVerify] = useState(false);
  const [email, setEmail] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);
  const [mobile, setMobile] = useState('');
  const [mobileVerify, setMobileVerify] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false)


  const handleSubmit = () => {
    const userData = {
      username : username,
      email,
      mobile,
      password,
    };

    if(usernameVerify && emailVerify && mobileVerify && passwordVerify)
    {
      axios
        .post(`${ipAddress}/reg`, userData)
        .then(res => {console.log(res.data)
        if(res.data.status == 'ok'){
          Alert.alert('Registration Successful!!');
        }
        else{
          Alert.alert(JSON.stringify(res.data));
        }
        })
        .catch(e => console.log(e));
    }
    else{
      Alert.alert("Fill mandatory details")
    }
  }


  const handleName = (e) => {
    const nameVar = e.nativeEvent.text;
    setUserName(nameVar);
    setUsernameVerify(false)

    if(nameVar.length > 1)
    {
      setUsernameVerify(true);
    }
  }

  const handleEmail = (e) => {
    const emailVar = e.nativeEvent.text;
    setEmail(emailVar)
    setEmailVerify(false)

    if(/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar))
    {
      setEmail(emailVar);
      setEmailVerify(true);
    }
  }

  const handleMobile = (e) => {
    const mobileVar = e.nativeEvent.text;
    setMobile(mobileVar)
    setMobileVerify(false)

    if(/[6-9]{1}[0-9]{9}/.test(mobileVar))
    {
      setMobile(mobileVar)
      setMobileVerify(true)
    }
  }

  const handlePassword = (e) => {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar)
    setPasswordVerify(false)
      setPassword(passwordVar)
      setPasswordVerify(true)
      console.log("passsss");
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <ScrollView 
        contentContainerStyle={{flexGrow: 1}} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps= 'always'>
    <View style={styles.container}>
      <Text style={styles.header}>Staff Registration</Text>

      <View style={{alignItems:"center"}}>
        <Image 
            source={require('../assets/VCET_Logo.png')} 
            style={styles.image} />
      </View>

      <View style={styles.inputContainer}>
      
        <TextInput
          style={styles.input}
          placeholder="User Name"
          // value={username}
          onChange={e => handleName(e)}
        />
        {username.length < 1 ? <Text></Text> : usernameVerify ? <Text></Text> :
          <Text
          style={{
            marginLeft: 10,
            color: "red",
            top: -10,
            fontSize: 12,
          }}>
            Name should be more then 1 characters.
          </Text>
        }      

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          onChange={e => handleEmail(e)}
        />
        {email.length < 1 ? <Text></Text> : emailVerify ? <Text></Text> :
            <Text
            style={{
              marginLeft: 10,
              color: "red",
              top: -10 ,
              fontSize: 12,           
              }}>
              Enter Proper Email address.
            </Text>
        }   
      

        <TextInput
          style={styles.input}
          placeholder="Mobile"
          keyboardType='phone-pad'
          onChange={e => handleMobile(e)}
          maxLength={10}
        />
        {mobile.length < 1 ? <Text></Text> : mobileVerify && mobile.length < 11 ? <Text></Text> :
            <Text
            style={{
              marginLeft: 10,
              color: "red",
              top: -10,
              fontSize: 12,
            }}>
              Phone number with 6-9 and remaining 9 digit with 0-9.
            </Text>
        }  

        <View style={{flexDirection: 'row'}}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!showPassword}
          onChange={e => handlePassword(e)}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eye}>
          {password.length < 1 ? null :showPassword ? 
            <EyeOff size={10} color={ passwordVerify ? "#62FF6E": "#FF6762"} /> : 
            <Eye size={10} color={ passwordVerify ? "#62FF6E": "#FF6762"} />
          }
        </TouchableOpacity>
        </View>
        {password.length < 1 ? <Text></Text> : passwordVerify ? <Text></Text> :
            <Text
            style={{
              marginLeft: 10,
              color: "red",
              top: -10,
              fontSize: 12,
            }}>
              Uppercase, Number and 6 or more characters.
            </Text>
        } 

        <View style={{marginTop: 10}}>
            <Button title="Register" color='#00D4FF' onPress={handleSubmit} />
        </View>      

      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "#D6FFFE", 
    paddingTop:50,
    alignItems:'center'
  },
  header: {
    width: '100%',
    fontSize: 22,
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
  inputContainer: {
    height: 450,
    width: 330,
    marginTop: 60,
    borderColor: '#75EDFC',
    borderWidth: 3,
    borderRadius: 25,
    paddingTop: 50,
    padding: 20,
    backgroundColor: '#ADF2FB',
  },
  input: {
    marginBottom: 10,
    padding: 8,
    borderRadius: 15,
    backgroundColor: 'white',
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: 'grey',
    width: '100%'
  },
  image: {
    width: 100,
    height: 110,
    position: 'relative',
  },
  eye: {
    position: 'absolute', 
    zIndex: 10, 
    right: 15,
    top: 11,
  }
});

export default RegisterStaff;