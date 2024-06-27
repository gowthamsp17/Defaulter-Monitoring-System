import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Feather } from '@expo/vector-icons';


import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

export default function DefaulterList() {
  const [defaulterData, setDefaulterData] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [departmentDD, setDepartmentDD] = useState('');
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [isDatePickerVisibleToDate, setDatePickerVisibilityToDate] = useState(false);
  const [isDatePickerVisibleFromDate, setDatePickerVisibilityFromDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.137.234:5001/defaulterFetch');
      setDefaulterData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFilter = async () => {
    try {
      console.log(departmentDD);
      console.log("Filtering data...");
      const response = await axios.get(`http://192.168.137.234:5001/defaulterFetch?fromDate=${fromDate}&toDate=${toDate}&department=${departmentDD}`);
      setDefaulterData(response.data);
      setFilterModalVisible(false); // Close the filter modal after filtering
    } catch (error) {
      console.error('Error filtering data:', error);
    }
  };

  const handleDownloadReport = async () => {
    try {
      // Convert defaulter data to CSV format
      const csvData = convertToCSV(defaulterData);

      // Create a file in the cache directory
      const fileUri = FileSystem.cacheDirectory + 'defaulter_report.csv';

      // Write the CSV data to the file
      await FileSystem.writeAsStringAsync(fileUri, csvData);

      // Share the file
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  const convertToCSV = (data) => {
    // Convert data array to CSV string
    const header = ['Name', 'Roll No', 'Date', 'Type of Defaulter'];
    const rows = data.map(defaulter => [
      defaulter.Name,
      defaulter.RollNo,
      formatDate(defaulter.createdAt),
      getDefaulterTypes(defaulter)
    ]);
    const csvData = [header, ...rows].map(row => row.join(',')).join('\n');
    return csvData;
  };

  const showDatePickerToDate = () => {
    setDatePickerVisibilityToDate(true);
  };
  const showDatePickerFromdate = () => {
    setDatePickerVisibilityFromDate(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibilityFromDate(false);
    setDatePickerVisibilityToDate(false);
  };

  const handleConfirmFromDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    console.log("dfdsf00");
    const formatteddate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
    const formatted = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    console.log(formatteddate);
    console.log(formatted);
    setFromDate(formatted);
    setSelectedDate(date);
    hideDatePicker();
  };
  const handleConfirmToDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    console.log("dfdsf00");
    const formatteddate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
    const formatted = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    console.log(formatteddate);
    console.log(formatted);
    setToDate(formatted);

    hideDatePicker();
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    const hour = date.getHours();
    const minute = date.getMinutes();
    const ampm = hour >= 12 ? 'pm' : 'am';
    const formattedTime = `${hour % 12 || 12}:${minute < 10 ? '0' : ''}${minute} ${ampm}`;

    return `${formattedDate} ${formattedTime}`;
  };

  const getDefaulterTypes = (defaulter) => {
    const types = [];
    if (defaulter.latecomer) types.push('Late Comer');
    if (defaulter.idcard) types.push('No ID Card');
    if (defaulter.dress) types.push('Improper Dress code');
    if (defaulter.beard) types.push('Improper Beard');
    if (defaulter.hair) types.push('Improper Hair');

    // If no defaulter types are true, set to 'None'
    return types.length > 0 ? types.join(' - ') : 'None';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Overall Report</Text>

      <Modal
        visible={isFilterModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Options</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <TextInput
              style={styles.input}
              placeholder="From Date (yyyy-mm-dd)"
              value={fromDate}
              onChangeText={setFromDate}
            />
            <TouchableOpacity activeOpacity={0.8} style={styles.calender} onPress={showDatePickerFromdate}>
              <Feather name="calendar" size={30} color="white" />
            </TouchableOpacity>
            </View>
            {/* <Button title="Select Date" onPress={showDatePickerFromdate} /> */}

            <DateTimePickerModal
              isVisible={isDatePickerVisibleFromDate}
              mode="date"
              onConfirm={handleConfirmFromDate}
              onCancel={hideDatePicker}
            />
              <View style={{flexDirection:'row',alignItems:'center'}}>
            <TextInput
              style={styles.input}
              placeholder="To Date      (yyyy-mm-dd)"
              value={toDate}
              onChangeText={setToDate}
            />
             <TouchableOpacity activeOpacity={0.8} style={styles.calender} onPress={showDatePickerToDate}>
              <Feather name="calendar" size={30} color="white" />
            </TouchableOpacity>
            </View>
            {/* <Button title="Select Date" onPress={showDatePickerToDate} /> */}

            <DateTimePickerModal
              isVisible={isDatePickerVisibleToDate}
              mode="date"
              onConfirm={handleConfirmToDate}
              onCancel={hideDatePicker}
            />
            <Picker
              style={styles.input}
              selectedValue={departmentDD}
              onValueChange={(itemValue, itemIndex) => setDepartmentDD(itemValue)}
            >
              <Picker.Item label="Select Department" value="" />
              <Picker.Item label="IT" value="IT" />
              <Picker.Item label="CSE" value="CSE" />
              <Picker.Item label="ECE" value="ECE" />
              <Picker.Item label="EEE" value="EEE" />
              <Picker.Item label="CIVIL" value="CIVIL" />
              <Picker.Item label="MECH" value="MECH" />
            </Picker>
            <Button title="Apply Filter" onPress={handleFilter} />
          </View>
        </View>
      </Modal>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}  showsVerticalScrollIndicator={false}>
        {defaulterData.map((defaulter, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.name}>{defaulter.Name}</Text>
            <Text style={styles.rollNo}>Roll No: {defaulter.RollNo}</Text>
            <Text style={styles.deptcard}>{defaulter.Dept}</Text>
            <Text style={styles.date}>Date: {formatDate(defaulter.createdAt)}</Text>
            <Text style={styles.details}>
              Type of Defaulter: {getDefaulterTypes(defaulter)}
            </Text>
          </View>
        ))}
        <View style={{height: 100}}></View>
      </ScrollView>
      
      <View style={styles.buttonContainer}>


        <TouchableOpacity activeOpacity={0.9} style={styles.downloadbtn} onPress={handleDownloadReport}>
          {/* () => setModalVisible(!modalVisible) */}
          {/* this function is to add people into db handlecheck "function:handlecheck"*/}
          <Feather name="download" size={24} color="white" />
          <Text style={{ color: 'white', fontWeight: '500', fontSize: 15 }}>DOWNLOAD</Text>

        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={styles.filterbtn} onPress={() => setFilterModalVisible(true)}>
          {/* () => setModalVisible(!modalVisible) */}
          {/* this function is to add people into db handlecheck "function:handlecheck"*/}
          <Feather name="filter" size={24} color="white" />
          <Text style={{ color: 'white', fontWeight: '500', fontSize: 15 }}>FILTER</Text>

        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#52b4fb',
    paddingHorizontal: 20,
    paddingTop: 20,
    // paddingBottom:30
  },
  scrollViewContainer: {
    flexGrow: 1,
    
  },
  heading: {
    color: "white",
    fontWeight: '700',
    fontSize: 30,
    marginLeft: 5,
    marginBottom: 15
  },
 
    
 
  filterbtn: {
    flexDirection: 'row',
    backgroundColor: '#1c80e3',
    alignItems: 'center',
    width: 150,
    paddingHorizontal: 35,
    paddingVertical: 15,
    justifyContent: 'space-between',
    borderRadius: 10,
    elevation:5
  },
  calender: {
    backgroundColor: '#1c80e3',
    padding:5,
    width:40,
    height:42,
    borderRadius:5,
    marginLeft:5,
    marginBottom:10
  },
  downloadbtn: {
    flexDirection: 'row',
    backgroundColor: '#1c80e3',
    alignItems: 'center',
    width: 150,
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: 'space-between',
    borderRadius: 10,
    marginRight: 5,
    elevation:5

  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  deptcard:{
    position:'absolute',
    right:16,
    top:16,
    backgroundColor:'#1c80e3',
    color:'white',
    paddingHorizontal:10,
    paddingVertical:3,
    borderRadius:5,
    fontWeight:'500'
  },
  rollNo: {
    fontSize: 16,
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    // left:25,
    // backgroundColor: '#52b4fb',
    height: 100,
    justifyContent: 'center'

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
});



