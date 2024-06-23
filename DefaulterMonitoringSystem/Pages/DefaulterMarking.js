import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

const StudentInfo = ({ route }) => {
    const [db, setDb] = useState(SQLite.openDatabase('example.db'));
    const navigation = useNavigation();
    const { RollNos, RollNo} = route.params;
    const reversedRollNos = RollNos.slice().reverse();
    const [studentInfos, setStudentInfos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // db.transaction(tx => {
        //     tx.executeSql('DROP TABLE IF EXISTS student_infos');
        //     console.log('Table droped')
        // });
        // db.transaction(tx => {
        //     tx.executeSql('INSERT INTO student_infos (rollNo, name, dob, year_of_study, department, section) VALUES (?, ?, ?, ?, ?, ?)', ['21ITB35', 'Manivelan K', '2004-04-03', 3, 'Information Technology', 'B'],
        //       (txObj, resultSet) => {
        //         console.log('Student info added successfully');
        //       },
        //       (txObj, error) => console.log(error)
        //     );
        //   });
        db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS student_infos (\
                id INTEGER PRIMARY KEY AUTOINCREMENT,\
                rollNo VARCHAR(10),\
                name TEXT,\
                dob DATE,\
                year_of_study INTEGER,\
                department TEXT,\
                section TEXT\
            )'); console.log('Table Created')
        });
        
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM student_infos',
                null,
                (txObj, resultSet) => {
                    const studentInfoData = resultSet.rows._array;
                    setStudentInfos(studentInfoData);
                    setIsLoading(false);
                },
                (txObj, error) => console.log(error)
            ); console.log('Data Fetched')
        });
    }, [db]);

    const handleLatebtn = () => {
        navigation.navigate('Scanner');
    }
    
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent} >
            <View style={{}}>
            
                {studentInfos.map((studentInfo, index) => {
                    // Check if rollNo is equal to "21ITB19"
                    if (studentInfo.rollNo === RollNo) {
                        return (
                            // <View key={index} style={styles.row}>
                            //     <Text>Roll No: {studentInfo.rollNo}</Text>
                            //     <Text>Name: {studentInfo.name}</Text>
                            //     <Text>Department: {studentInfo.department}</Text>
                            // </View>
                            <LinearGradient colors={['#020024', '#020024', '#040455']} key={index} style={styles.container}>
                <View style={styles.imgflex}>
                    <Image source={require('../assets/profile_pic.png')} style={styles.profile_pic} />
                </View>
                <View style={[styles.infoflex, { color: 'white' }]}>
                    <Text style={styles.heading}>STUDENT INFORMATION</Text>
                    <View style={styles.rowflex}>
                        <View style={[styles.ques, { fontSize: 16 }]}>
                            <Text style={styles.text}>Name:</Text>
                            <Text style={styles.text}>Roll No:</Text>
                            <Text style={styles.text}>Date of birth:</Text>
                            <Text style={styles.text}>Department:</Text>
                            <Text style={styles.text}>Section:</Text>
                            <Text style={styles.text}>Year:</Text>
                        </View>
                        <View style={styles.ans}>
                            <Text style={styles.text}>{studentInfo.name}</Text>
                            <Text style={styles.text}> {studentInfo.rollNo}</Text>
                            <Text style={styles.text}>{studentInfo.dob}</Text>
                            <Text style={styles.text}>{studentInfo.department}</Text>
                            <Text style={styles.text}>{studentInfo.section}</Text>
                            <Text style={styles.text}>{studentInfo.year_of_study}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.flexbtn}>
                    <Button title="Late Comer" titleStyle={{ color: 'black' }} color={'red'} onPress={handleLatebtn} />
                    <View style={{ marginLeft: 10 }}>
                        <Button title="Dress Code" titleStyle={{ color: 'black' }} color={'red'} />
                    </View>
                </View>
            </LinearGradient>
                            
                        );
                    } else {
                        return null; // Render nothing if rollNo does not match
                    }
                })}
                <StatusBar style="auto" />
            </View>
            {/* <LinearGradient colors={['#020024', '#020024', '#040455']} style={styles.container}>
                <View style={styles.imgflex}>
                    <Image source={require('../assets/profile_pic.png')} style={styles.profile_pic} />
                </View>
                <View style={[styles.infoflex, { color: 'white' }]}>
                    <Text style={styles.heading}>STUDENT INFORMATION</Text>
                    <View style={styles.rowflex}>
                        <View style={[styles.ques, { fontSize: 16 }]}>
                            <Text style={styles.text}>Name:</Text>
                            <Text style={styles.text}>Roll No:</Text>
                            <Text style={styles.text}>Date of birth:</Text>
                            <Text style={styles.text}>Department:</Text>
                            <Text style={styles.text}>Section:</Text>
                            <Text style={styles.text}>Year:</Text>
                        </View>
                        <View style={styles.ans}>
                            <Text style={styles.text}>Abdul Khaliq</Text>
                            <Text style={styles.text}>{RollNo}</Text>
                            <Text style={styles.text}>06/12/2003</Text>
                            <Text style={styles.text}>Information Technology</Text>
                            <Text style={styles.text}>B</Text>
                            <Text style={styles.text}>III</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.flexbtn}>
                    <Button title="Late Comer" titleStyle={{ color: 'black' }} color={'red'} onPress={handleLatebtn} />
                    <View style={{ marginLeft: 10 }}>
                        <Button title="Dress Code" titleStyle={{ color: 'black' }} color={'red'} />
                    </View>
                </View>
            </LinearGradient> */}
            {reversedRollNos.map((rollno, index) => (
                <LinearGradient key={index} colors={['#020024', '#020024', '#040455']} style={styles.containerScanned}>
                    <View style={[styles.infoflexScanned, { color: 'white' }]}>
                        <Text style={styles.heading}>SCANNED STUDENTS</Text>
                        <View style={styles.rowflex}>
                            <View style={[styles.ques, { fontSize: 16 }]}>
                                <Text style={styles.text}>Name:</Text>
                                <Text style={styles.text}>Roll No:</Text>
                                <Text style={styles.text}>Date of birth:</Text>
                                <Text style={styles.text}>Department:</Text>
                                <Text style={styles.text}>Section:</Text>
                                <Text style={styles.text}>Year:</Text>
                            </View>
                            <View style={styles.ans}>
                                <Text style={styles.text}>Abdul Khaliq</Text>
                                <Text style={styles.text}>{rollno}</Text>
                                <Text style={styles.text}>06/12/2003</Text>
                                <Text style={styles.text}>Information Technology</Text>
                                <Text style={styles.text}>B</Text>
                                <Text style={styles.text}>III</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            ))}
            

        </ScrollView>
    );
};



const styles = StyleSheet.create({
    container: {
        padding: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 10,
        borderWidth: 6,
        borderColor: 'white',
        height: 600,
        borderRadius: 20,
        elevation: 10,


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
        color: 'white'

    },
    infoflex: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        height: '55%',
        width: '100%',
        borderRadius: 10

    },
    infoflexScanned: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        height: '85%',
        width: '100%',
        borderRadius: 10

    },
    imgflex: {
        borderWidth: 5,
        borderColor: 'white',
        width: '48%',
        alignItems: 'center',
        borderRadius: 100,
    },
    rowflex: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: 'center'
    },
    ques: {
        justifyContent: 'space-evenly',
        height: 250,
    },
    ans: {
        justifyContent: 'space-evenly',
        height: 250,
    },
    text: {
        fontSize: 15,
        color: 'white'
    },
    flexbtn: {
        flexDirection: 'row'
    }


})

export default StudentInfo;