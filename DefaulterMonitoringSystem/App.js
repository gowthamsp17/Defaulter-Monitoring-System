import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import StaffLogin from './Pages/StaffLogin';
import Scanner from './Pages/Scanner';
import AdminLogin from './Pages/AdminLogin';
import HomePage from './Pages/HomePage';
import Select from './Pages/Select';
import DefaulterMarking from './Pages/DefaulterMarking'
import AdminSelect from './Pages/AdminSelect';
import RegisterStaff from './Pages/RegisterStaff';
import checkdefaulter from './Pages/checkDefaulter';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export const ipAddress = "192.168.239.7";

const StaffStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="StaffLogin" component={StaffLogin} options={{headerShown: false} } />
      <Stack.Screen name="Select" component={StaffNav} options={{ headerShown: false }} /> 
      <Stack.Screen name="DefaulterMarking" component={DefaulterMarking} options={{ headerShown: false}}/>
      <Stack.Screen name="Scanner" component={Scanner} options={{headerShown: false}} />
      <Stack.Screen name="CheckDefaulter" component={checkdefaulter} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};
const StaffNavScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Select1" component={Select} options={{ headerShown: false }}/>
      <Stack.Screen name="DefaulterMarking" component={DefaulterMarking} options={{ headerShown: false}}/>
      <Stack.Screen name="Scanner" component={Scanner} options={{headerShown: false}}/>
      <Stack.Screen name="CheckDefaulter" component={checkdefaulter} options={{headerShown: false}}/>
      <Stack.Screen name="Homee" component={HomeNav} options={{headerShown: false, }} />
    </Stack.Navigator> 
  ); 
};
const AdminStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AdminLogin" component={AdminLogin} options={{headerShown: false}} />
      <Stack.Screen name="Scanner" component={Scanner} options={{headerShown: false}}/>
      <Stack.Screen name="AdminSelect" component={AdminSelect} options={{headerShown: false}}/>
      <Stack.Screen name="Register" component={RegisterStaff} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};

const CustomHeader = () => {
  return (
    <View>
        <Image
          source={require('./assets/VCET_Logo.png')} // Replace 'path_to_your_image.png' with the actual path to your image file
          style={{height: 35, width: 35, marginRight: 20, marginTop: 3}}
        />
    </View>
  );
};

const CustomDrawerContent = (props) => {
  const navigation = useNavigation(); // Hook for accessing navigation object
  return (
    <DrawerContentScrollView {...props} style={{backgroundColor: '#EBFEFD'}}>

      <View style={{alignItems:"center", marginTop: 20,}}>
        <Image 
            source={require('./assets/VCET_Logo.png')} 
            style={{height: 80, width: 80}} />
      </View>

      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>DMS</Text>
      </View>

      <View style={{borderBottomColor: "#BFBFBF", borderBottomWidth: 1, width: "90%", left: '5%', paddingBottom: 15}}>
      <DrawerItemList {...props} />
      </View>

      <View style={styles.signout}>
      <DrawerItem
        label="Sign Out"
        onPress={() => {
          AsyncStorage.setItem('isLoggedIn', '');
          navigation.navigate('Home'); 
        }}
        icon={({ color, size }) => <Ionicons name="log-out-outline" size={size} color={color} />} // Using Ionicons as the icon
      />
      </View>

      <View style={styles.footer}>
        <Text style={{color: 'white'}}>Velammal College of Engineering and Technology © 2024,</Text>
        <Text style={{color: 'white'}}>Designed and Developed by IT Department</Text>
      </View>
      
    </DrawerContentScrollView>
  );
};
const CustomDrawerContentStaff = (props) => {
  const navigation = useNavigation(); // Hook for accessing navigation object
  return (
    <DrawerContentScrollView {...props} style={{backgroundColor: '#EBFEFD'}}>

      <View style={{alignItems:"center", marginTop: 20,}}>
        <Image 
            source={require('./assets/VCET_Logo.png')} 
            style={{height: 80, width: 80}} />
      </View>

      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>DMS</Text>
      </View>

      <View style={{borderBottomColor: "#BFBFBF", borderBottomWidth: 1, width: "90%", left: '5%', paddingBottom: 15}}>
      <DrawerItemList {...props} />
      </View>

      <View style={styles.signoutstaff}>
      <DrawerItem
        label="Sign Out"
        onPress={() => {
          AsyncStorage.setItem('isLoggedIn', '');
          // AsyncStorage.setItem('token', '');
          // Add navigation logic here
          navigation.navigate('Homee'); 
        }}
        icon={({ color, size }) => <Ionicons name="log-out-outline" size={size} color={color} />} // Using Ionicons as the icon
      />
      </View>

      <View style={styles.footerstaff}>
        <Text style={{color: 'white'}}>Velammal College of Engineering and Technology © 2024,</Text>
        <Text style={{color: 'white'}}>Designed and Developed by IT Department</Text>
      </View>
      
    </DrawerContentScrollView>
  );
};

const HomeNav = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />} 
        screenOptions={{ 
          drawerActiveTintColor: 'black',
          drawerActiveBackgroundColor: '#009EFF',
          drawerType: 'slide',
          drawerPosition: 'left',
          headerTitleAlign: 'center'
        }}>
        <Drawer.Screen name="Home" component={HomePage} 
          options={{ 
            title : 'Defaulter Monitor System',
            drawerLabel: 'Home',
            headerStyle: { backgroundColor: '#009EFF'}, 
            headerRight: () => <CustomHeader/>,
            drawerIcon: ({ color, size }) => <Ionicons name="home" size={20} color={color} />, }} 
        />
        <Drawer.Screen name="Admin" component={AdminStackScreen} options={{ headerShown: false, drawerLabel: 'Admin Login', drawerIcon: ({ color, size }) => <Ionicons name="settings" size={20} color={color} />, }} />
        <Drawer.Screen name="Staff" component={StaffStackScreen} options={{ headerShown: false, drawerLabel: 'Staff Login', drawerIcon: ({ color, size }) => <Ionicons name="person-circle" size={23} color={color} />, }} />
      </Drawer.Navigator>
  )
};

const StaffNav = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContentStaff {...props} />} 
        screenOptions={{ 
          drawerActiveTintColor: 'black',
          drawerActiveBackgroundColor: '#009EFF',
          drawerType: 'slide',
          drawerPosition: 'left',
          headerTitleAlign: 'center'
        }}>
        <Drawer.Screen name="StaffNav" component={StaffNavScreen} options={{ headerShown: false, drawerLabel: 'Scan / Check', drawerIcon: ({ color, size }) => <Ionicons name="checkmark-circle-outline" size={23} color={color} />, }} />
        
      </Drawer.Navigator>
  )
}
 
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function getData(){
    const data = await AsyncStorage.getItem('isLoggedIn');
    console.log(data, 'at App.js');
    setIsLoggedIn(data === 'true');
  }
 
  useEffect(() => {
    getData();
  }, []); 

  return (
    <NavigationContainer>
      {isLoggedIn ? <StaffNav /> : <HomeNav />}
      {/* <HomeNav /> */}
      {/* <StaffNav /> */}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    width: '90%',
    left: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 20,
    //marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#BFBFBF'
  },
  drawerHeaderText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 3
  },
  footer: {
    position: 'relative',
    marginTop: '105%',
    bottom: 0,
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#4ABAFF',
  },
  footerstaff: {
    position: 'relative',
    marginTop: '150%',
    bottom: 0,
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#4ABAFF',
  },
  signout: {
    top: 280, 
    borderColor: "#E2F1FF", 
    borderWidth: 1, 
    width: "90%", 
    left: '5%', 
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#E2F1FF',
    height: 55
  },
  signoutstaff: {
    top: 400, 
    borderColor: "#E2F1FF", 
    borderWidth: 1, 
    width: "90%", 
    left: '5%', 
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#E2F1FF',
    height: 55
  }
});

export default App;

