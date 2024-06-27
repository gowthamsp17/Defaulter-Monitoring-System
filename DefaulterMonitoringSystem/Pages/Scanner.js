import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Image, StatusBar, TextInput, Pressable, Modal, TouchableOpacity, ScrollView ,Alert} from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import { LinearGradient } from 'expo-linear-gradient';
import Checkbox from 'expo-checkbox';
import { useFonts } from 'expo-font';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';



export default function Scanner() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [latecomer, setlatecomer] = useState(false);
  const [beard, setbeard] = useState(false);
  const [idcard, setidcard] = useState(false);
  const [dress, setdress] = useState(false);
  const [hair, sethair] = useState(false);
  const [fontsLoaded] = useFonts({
    'Oswald-Regular': require('../assets/fonts/Oswald-Regular.ttf'),
  });
  const [rollNo, setrollNo] = useState("");
  const [namedb, setnamedb] = useState("");
  const [rolldb, setrolldb] = useState("");
  const [secdb, setsecdb] = useState("");
  const [deptdb, setdeptdb] = useState("");
  const [yeardb, setyeardb] = useState("");
  const [verrollNo, setverrollNo] = useState(false);




  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleMarkDefaulter = () => {
    // Prepare data to send to the server
    const data = {
      name: namedb,
      rollNo: rolldb,
      dept: deptdb,
      section: secdb,
      latecomer: latecomer,
      idcard: idcard,
      dress: dress,
      beard: beard,
      hair: hair,
    };

    // Check if the roll number has already been scanned today
    axios.get(`http://192.168.137.234:5001/check-scanned-today/${rolldb}`)
      .then((response) => {
        if (response.data.scannedToday) {
          // If already scanned today, show error message
          Alert.alert('Error', 'Roll number has already been scanned today');
        } else {
          // If not scanned today, proceed to mark as defaulter
          // Send POST request to mark the student as a defaulter
          axios.post("http://192.168.137.234:5001/mark-defaulter", data)
            .then((response) => {
              console.log(response.data);
              // Show success message
              Alert.alert('Success', 'Student marked as defaulter successfully');
              setModalVisible(!modalVisible);
            })
            .catch((error) => {
              console.error(error);
              // Show error message
              Alert.alert('Error', 'Failed to mark student as defaulter');
            });
        }
      })
      .catch((error) => {
        console.error(error);
        // Show error message
        Alert.alert('Error', 'Failed to check if roll number is scanned today');
      });
  };




  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setrollNo(data);
    console.log(rollNo);

    if (rollNo == "21ITB29") {
      setverrollNo(true);
    }
    else {
      setverrollNo(false);
    }
    setFlashMode(Camera.Constants.FlashMode.off);
  
    axios.get(`http://192.168.137.234:5001/student/${data}`)
      .then((response) => {
        // Check if the response contains data
        if (response.data) {
          // If the roll number exists, update the name state with the corresponding name
          setnamedb(response.data.Name);
          setrolldb(response.data.RollNo)
          setsecdb(response.data.Section)
          setdeptdb(response.data.Dept)
          setyeardb(response.data.Year)
          console.log(namedb);
          setverrollNo(true); // Set verification status to true
        } else {
          // If the roll number does not exist, reset the name state and verification status
          setnamedb("");

          setverrollNo(false);
        }
      })
      .catch((error) => {
        setnamedb("No Record found");
        console.log(error);
      });

  };
  const handleTorchPress = () => {
    // Handle button press action
    Alert.alert('Button Pressed');
  };
  const toggleFlash = () => {
    setFlashMode(
      flashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.torch
        : Camera.Constants.FlashMode.off
    );
  };
  function handlecheck() {
    const userdata = {
      roll: rollNo,
      name: namedb
    };

    axios.post("http://192.168.137.234:5001/register", userdata).then((res) => console.log(res.data)).catch((e) => console.log(e))

  }
  const resetScanner = () => {
    setScanned(false);
    setBarcodeData(null);
    console.log('Manually entered data:');
  };
  function handlerollNo(e) {
    const rollvar = e.nativeEvent.text;
    setrollNo(rollvar)
    console.log(rollNo);
    console.log(rollvar);
    if (rollvar == "21ITB29") {
      setverrollNo(true);
    }
    else {
      setverrollNo(false);
    }

    axios.get(`http://192.168.137.234:5001/student/${rollvar}`)
      .then((response) => {
        // Check if the response contains data
        if (response.data) {
          // If the roll number exists, update the name state with the corresponding name
          setnamedb(response.data.Name);
          setrolldb(response.data.RollNo)
          setsecdb(response.data.Section)
          setdeptdb(response.data.Dept)
          setyeardb(response.data.Year)
          console.log(namedb);
          setverrollNo(true); // Set verification status to true
        } else {
          // If the roll number does not exist, reset the name state and verification status
          setnamedb("");

          setverrollNo(false);
        }
      })
      .catch((error) => {
        setnamedb("No Record found");
        console.log(error);
      });
  }


  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const viewStyle = scanned ? styles.scannedView : styles.cameraOutline;

  return (
    <View style={{ flex: 1, backgroundColor: '#031F47' }}>
      <View style={styles.container}>
        <Image source={require('../assets/VCET_Logo.png')} style={{ width: 100, height: 100, marginTop: 20 }} />
        <View style={styles.afterscan}>
          <View style={styles.roll}>
            <TextInput placeholder="Enter the Rollno Manually" value={rollNo} onChangeText={setrollNo} onChange={e => handlerollNo(e)} />
            {rollNo.length < 1 ? null : verrollNo ? (<Feather name="check-circle" size={24} color="green" style={{ position: 'absolute', right: 10, top: 12 }} />) :
              (<Feather name="x-circle" size={24} color="red" style={{ position: 'absolute', right: 10, top: 12 }} />)

            }

          </View>
          {rollNo.length < 1 ? null :
            <Text style={styles.dbname}>{namedb}</Text>}

          <View style={styles.decidebtn}>
            {scanned && (
              <View>
                <TouchableOpacity onPress={resetScanner} style={styles.scanAgain}>
                  <Text style={styles.openModalButtonText}>Scan Again</Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={{ marginLeft: 10, paddingHorizontal: 5 }}>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.openModalButton}>
                {/* () => setModalVisible(!modalVisible) */}
                {/* this function is to add people into db handlecheck "function:handlecheck"*/}
                <Text style={styles.openModalButtonText}>Check the Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {isFocused && (
          <View style={viewStyle}>
            <Camera
              ref={cameraRef}
              style={styles.camera}
              flashMode={flashMode}
              type={Camera.Constants.Type.back}
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              ratio={"2:1"}
            />
          </View>)}
        <StatusBar />
        <Image source={require('../assets/newQRBG.png')} style={styles.QrBg} />

        <TouchableOpacity onPress={toggleFlash} style={styles.torch}>
          <Image
            source={require('../assets/torch.png')} // Replace this with your image source

          />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <LinearGradient colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']} style={styles.modalcontainer}>

              <View style={[styles.infoflex, { color: 'white' }]}>
                <Text style={styles.heading}>STUDENT INFORMATION</Text>
                <View style={styles.rowflex}>
                  <View style={[styles.ques, { fontSize: 16 }]}>
                    <Text style={styles.textq}>Name:</Text>
                    <Text style={styles.textq}>Roll No:</Text>
                    <Text style={styles.textq}>Department:</Text>
                    <Text style={styles.textq}>Section:</Text>
                    <Text style={styles.textq}>Year:</Text>
                  </View>
                  <View style={styles.ans}>
                    <Text style={styles.text}>{namedb}</Text>
                    <Text style={styles.text}>{rolldb}</Text>
                    <Text style={styles.text}>{deptdb}</Text>
                    <Text style={styles.text}>{secdb}</Text>
                    <Text style={styles.text}>{yeardb}</Text>
                  </View>
                  
                </View>
                
              </View>
       
              <View style={styles.checkboxflex}>
                <View style={styles.section}>
                  <Checkbox
                    style={styles.checkbox}
                    value={latecomer}
                    onValueChange={setlatecomer}
                    color={latecomer ? '#1e7aff' : undefined}
                  />
                  <Text style={styles.checktext}> Late Comer</Text>
                </View>
                <View style={styles.section}>
                  <Checkbox
                    style={styles.checkbox}
                    value={idcard}
                    onValueChange={setidcard}
                    color={idcard ? '#1e7aff' : undefined}
                  />
                  <Text style={styles.checktext}> No ID Card</Text>
                </View>
                <View style={styles.section}>
                  <Checkbox
                    style={styles.checkbox}
                    value={dress}
                    onValueChange={setdress}
                    color={dress ? '#1e7aff' : undefined}
                  />
                  <Text style={styles.checktext}>Improper Dress code</Text>
                </View>
                <View style={styles.section}>
                  <Checkbox
                    style={styles.checkbox}
                    value={beard}
                    onValueChange={setbeard}
                    color={beard ? '#1e7aff' : undefined}
                  />
                  <Text style={styles.checktext}>Improper Beard</Text>
                </View>
                <View style={styles.section}>
                  <Checkbox
                    style={styles.checkbox}
                    value={hair}
                    onValueChange={sethair}
                    color={hair ? '#1e7aff' : undefined}
                  />
                  <Text style={styles.checktext}>Improper Hair</Text>
                </View>
              </View>
              <View style={styles.flexbtn}>
               
                <View >
                  <Button title="Mark Defaulter" titleStyle={{ color: 'black' }} color={'red'} onPress={handleMarkDefaulter} />
                </View>
              </View>
            </LinearGradient>
          </View>




        </Modal>



      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: 'space-between',
    backgroundColor: "#031F47",
    height: '80%',
  },
  modalcontainer: {

    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    padding: 10,
    width: 230,
    borderColor: '#e3e3e3',
    borderRadius: 5,
    fontWeight: 200,


  },
  checktext: {
    marginLeft: 5,
    color: 'black',
    fontSize: 15,
    fontWeight: '500'
  },

  cameraOutline:
  {

    borderWidth: 4,
    borderRadius: 30,
    borderColor: 'white',
    borderBottomEndRadius: 40,
    width: 278,
    height: 337,
    overflow: 'hidden',

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

  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  openModalButton: {
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 10,
    elevation: 2
  },
  scanAgain: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    elevation: 2
  },
  openModalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    margin: 10,
    width: 200,
    borderRadius: 10,
    backgroundColor: '#009EFF',
    borderWidth: .5,
    borderColor: '#C1DFFF' //#0074FF
  },

  scannedView:
  {

    borderWidth: 4,
    borderRadius: 30,
    borderColor: "#39F930",
    width: 278,
    height: 337,
    overflow: 'hidden',


  },
  textInput: {
    marginLeft: 10,
    padding: 8,
    borderRadius: 15,
    backgroundColor: 'white',
    paddingLeft: 15,
    borderWidth: 2,
    borderColor: '#FF9C9C'
  },
  decidebtn: {
    flexDirection: 'row',

  },

  camera: {
    width: 270,
    height: 330,

    overflow: 'hidden', // Clip the camera inside the outlined view
  },

  barcodeText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15
  },
  // container1: {
  //   flex: 1,
  //   flexDirection: 'column',
  // },
  QrBg: {
    position: 'relative',
    width: 360,
    height: 410,
    marginTop: -375,
  },
  scanText: {
    color: 'white',
    marginTop: '113%',
    fontSize: 20,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  modalView: {
    backgroundColor: 'white',
    width: 300,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  afterscan: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 20,
    marginBottom: 50,
    zIndex: 10
  },
  roll: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 5,
    borderColor: 'lightblue'

  },
  torch: {
    transform: [{ rotate: '225deg' }, { scale: 0.35 }, { translateY: 190 }, { translateX: 190 }],
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 160,
    elevation: 20,
    shadowColor: 'black'

  },
  containerScanned: {
    padding: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
    borderWidth: 6,
    borderColor: 'white',
    height: 400,
    borderRadius: 20,
    elevation: 10,


  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  profile_pic: {
    width: 100,
    height: 150,

  },
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
    color: '#040455'

  },
  infoflex: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    height: 220,
    width: '100%',
    // borderRadius: 10,
    // borderWidth:10,
    // borderColor:'black'

  },
  infoflexScanned: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    height: '85%',
    width: '100%',
    borderRadius: 10,
    borderWidth:10,
    borderColor:'black'

  },
  rowflex: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
    alignItems: 'center'
  },
  ques: {
    justifyContent: 'space-evenly',
    height: 150,
  },
  ans: {
    justifyContent: 'space-evenly',
    height: 150,
  },
  text: {
    fontSize: 15,
    color: 'black',
    fontWeight: '500'
  },
  textq: {
    fontSize: 15,
    fontWeight: '700',
    color: 'grey'
  },
  flexbtn: {
    flexDirection: 'row',
    marginTop:10
  },
  dbname: {
    color: 'white',
    fontWeight: '700',
    fontSize: 17,
    marginBottom: 10
  },
  checkboxflex: {
    height: 300,
    justifyContent: 'space-evenly'
  }

});

