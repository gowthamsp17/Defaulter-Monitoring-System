import React from 'react';
import { View, Text, Button, StyleSheet, Pressable, Image } from 'react-native';

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <View style={styles.welcome}>
        <Text style={{color: 'black', fontSize: 40, fontWeight: 'bold'}}>Velammal</Text>
        <Text style={{color: 'black', fontSize: 25, fontWeight: '500'}}>College of Engineering &</Text>
        <Text style={{color: 'black', fontSize: 25, fontWeight: '500'}}>Technology</Text>
        <Text style={{color: 'black', fontSize: 20, fontWeight: '500', lineHeight: 30}}>( Autonomous )</Text>
      </View>

      <View style={{backgroundColor: '#42B7FF', alignItems: 'center', borderRadius: 60, width: '100%', height: 3000, borderWidth: 3, borderColor: '#009EFF'}}>
      <View style={{alignItems: 'center', borderBottomColor: '#4A75FC', borderBottomWidth: 2, width: 80, marginTop: 25}}>
        <Text style={{fontSize: 25, marginTop:20, fontWeight: 'bold', letterSpacing: 3}}>Login</Text>
      </View>
     
      <View style={styles.buttonContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && { backgroundColor: 'lightblue' }, // Change the background color when pressed
        ]}
        onPress={() => navigation.navigate('Admin')}
      >
        {({ pressed }) => (
          <View style={styles.buttonContent}>
            <Image
              source={require('../assets/admin-out.png')} // Replace 'admin_icon.png' with the actual path to your admin icon
              style={[styles.icon, pressed && { opacity: 0.5 }]} // Reduce opacity when pressed
            />
            <Text style={styles.buttonText}>Admin Login</Text>
          </View>
        )}
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && { backgroundColor: 'lightblue' }, // Change the background color when pressed
        ]}
        onPress={() => navigation.navigate('Staff')}
      >
        {({ pressed }) => (
          <View style={styles.buttonContent}>
            <Image
              source={require('../assets/staff-out.png')} // Replace 'staff_icon.png' with the actual path to your staff icon
              style={[styles.icon, pressed && { opacity: 0.5
               }]} // Reduce opacity when pressed
            />
            <Text style={styles.buttonText}>Staff Login</Text>
          </View>
        )}
      </Pressable>
      </View>

      <Text style={{}}>
        
      </Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D6FFFE',

    
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 40,
    paddingTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#BFBFBF',
    marginBottom:50
  },
  welcome: {
    width: '90%',
    paddingTop: 20,
    alignItems: 'center',
    paddingBottom: 30
  },
  loginSection: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#009EFF',
    marginTop: 50,
    borderRadius: 20
  },
  icon: {
    height: 50, 
    width: 50
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#009EFF',
    borderWidth: .5,
    borderColor: '#C1DFFF' //#0074FF
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20, // Adjust the width of the icon as needed
    height: 20, // Adjust the height of the icon as needed
    marginRight: 5, // Adjust the margin as needed
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  },
});

export default HomePage;