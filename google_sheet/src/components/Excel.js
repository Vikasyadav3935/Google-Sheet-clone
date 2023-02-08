import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button,TouchableOpacity,PermissionsAndroid,Alert } from 'react-native';

import RNFetchBlob from 'rn-fetch-blob';

const Excel = ({data})=>{
    const [store,setStore]=useState(false);


    
const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Downloader App Storage Permission',
          message:
            'Downloader App needs access to your Storage ' +
            'so you can download .',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
         convertToExcel();
         setStore(true)
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };


  const convertToExcel = async () => {
    const rows = data.map(row => row.join(',')).join('\n');
    console.log(rows);
    const filePath = `${RNFetchBlob.fs.dirs.DownloadDir}/data${Math.floor(Math.random() * 16) + 5}.csv`;
    await RNFetchBlob.fs.writeFile(filePath, rows, 'utf8');
    if(filePath){
     Alert.alert(`File Path ${filePath}`)
    }
    console.log(`Excel sheet generated at ${filePath}`);

  };



    return (

        <View>
       <Button onPress={()=>{store?convertToExcel():requestStoragePermission()}}    title="Generate Excel"/>
        </View>
    )
}

export default Excel;