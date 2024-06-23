import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';


const AdminSelect = ({ navigation }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

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

  const handleButton1Press = () => {
    navigation.navigate('Register');
  };

//   const handleButton2Press = () => {
//     // Action for button 2 press
//     navigation.navigate('Scanner');
//   };

  return (
    <LinearGradient colors={['#7F7FD5', '#86A8E7', '#91EAE4']} style={styles.container}>
      <View style={styles.container1} >
        <StatusBar></StatusBar>
        <Image source={require('../assets/VCET_Logo.png')} style={styles.image3} />
        <BlurView style={styles.check} intensity={40} tint="systemMaterial" borderRadius={40} experimentalBlurMethod='dimezisBlurView' >
          <Image source={require('../assets/CD-icon1.png')} style={styles.image1} />
          <Animated.View style={[styles.button, styles.button1, { transform: [{ scale: scaleAnim }] }]}>           
            <TouchableOpacity onPress={handleButton1Press}>
              <Animated.Text style={[styles.buttonText, { opacity: fadeAnim }]}>Add Staff</Animated.Text>
            </TouchableOpacity>
          </Animated.View>
        </BlurView>
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
    width: 100,
    height: 100,
    // position: 'absolute',
    // top: 130,
    zIndex: 2,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 2

  },

//   image2: {
//     width: 100,
//     height: 100,
//     // position: 'absolute',
//     // top: 500,
//     zIndex: 5,
//     borderRadius: 20,
//     backfaceVisibility: 'visible',
//     borderColor: "black",
//     borderWidth: 2
//   },

  image3: {
    width: 150,
    height: 150,
    position: 'absolute',
    top:'10%',
    opacity:1  
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
    height:300,
    paddingHorizontal: 30,
    borderColor: 'white',
    borderWidth: 5,
    elevation: 20,
    zIndex: 1,
    overflow: 'hidden'

  }
});

export default AdminSelect;