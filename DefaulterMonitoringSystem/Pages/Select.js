import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Select = ({ navigation }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [userData, setUserData] = useState("");

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, fadeAnim]);


  async function getData(){
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    axios
      .post("http://192.168.137.234:5001/userdata", {token: token})
      .then(res => {
        console.log(res.data);
        setUserData(res.data.data);
      });
  }

  useEffect(() => {
    getData();
  }, []);  

  const handleButton1Press = () => {
    // Action for button 1 press
    // navigation.navigate('Login');
    navigation.navigate('CheckDefaulter');
  };

  const handleButton2Press = () => {
    // Action for button 2 press
    navigation.navigate('Scanner');
  };



  return (
    /* <LinearGradient colors={['#6190E8',  '#A7BFE8']} style={styles.container}> */
    <LinearGradient colors={['#7F7FD5', '#86A8E7', '#91EAE4']} style={styles.container}>
      <View style={styles.container1} >
        <StatusBar></StatusBar>
        <Image source={require('../assets/VCET_Logo.png')} style={styles.image3} />
        <View style={{flex : 0.3}}></View>
        <View style={styles.namedes}>
        <Text style={{fontWeight: 'bold', color: 'white', fontSize: 15, letterSpacing: 1}}>{userData.username}  :  {userData.email}</Text>
        </View>
        <BlurView style={styles.check} intensity={40} tint="systemMaterial" borderRadius={40} experimentalBlurMethod='dimezisBlurView' >
          {/* intensity={30} tint="dark" borderRadius={40} experimentalBlurMethod='dimezisBlurView' */}
          <Image source={require('../assets/CD-icon1.png')} style={styles.image1} />
          <Animated.View style={[styles.button, styles.button1, { transform: [{ scale: scaleAnim }] }]}>
            
            <TouchableOpacity onPress={handleButton1Press}>

              <Animated.Text style={[styles.buttonText, { opacity: fadeAnim }]}>Check Defaulter</Animated.Text>
            </TouchableOpacity>
          </Animated.View>
        </BlurView>
       
        <BlurView style={styles.check} intensity={40} tint="systemMaterial" borderRadius={40} experimentalBlurMethod='dimezisBlurView' >
        <Image source={require('../assets/SD-icon1.png')} style={styles.image2} />
          {/* intensity={40} tint="dark" borderRadius={40} experimentalBlurMethod='dimezisBlurView' */}
          <Animated.View style={[styles.button, styles.button2, { transform: [{ scale: scaleAnim }] }]}>
            <TouchableOpacity onPress={handleButton2Press}>
              <Animated.Text style={[styles.buttonText, { opacity: fadeAnim }]}>Scan Defaulter</Animated.Text>
            </TouchableOpacity>
          </Animated.View>
        </BlurView>
        <View style={{flex : 0.1}}></View>
      </View>
    </LinearGradient>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',

  },
  container1: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',

  },
  image1: {
    width: 90,
    height: 90,
    // position: 'absolute',
    // top: 130,
    zIndex: 2,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 2

  },
  image2: {
    width: 90,
    height: 90,
    // position: 'absolute',
    // top: 500,
    zIndex: 5,
    borderRadius: 20,
    backfaceVisibility: 'visible',
    borderColor: "black",
    borderWidth: 2

  },
  image3: {
    width: 100,
    height: 100,
    position: 'absolute',
    top:'5%',
    opacity: 1
  },
  button: {
    width: 200,
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  button1: {
    backgroundColor: '#4b0082', // Background color for button 1
  },
  button2: {
    backgroundColor: '#040455', // Background color for button 2
  },
  button3: {
    backgroundColor: '#0000cd', // Background color for button 3
  },
  check: {
    justifyContent:'space-between',
    alignItems:'center',
    padding: 20,
    paddingTop: 60,
    height:280,
    paddingHorizontal: 30,
    borderColor: 'white',
    borderWidth: 5,
    elevation: 20,
    zIndex: 1,
    overflow: 'hidden'
  },
  namedes: {
    marginTop: 50,
    borderColor: "white",
    borderWidth: 2,
    width: 500,
    alignItems: 'center',
    padding: 5
  }
});

export default Select;