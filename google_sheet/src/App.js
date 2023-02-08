import { View,Text,StyleSheet,TextInput,Alert } from "react-native";
import {useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Excel from "./components/Excel";


const App=()=>{

    const [inputValues, setInputValues] = useState([
        [null,"A", "B", "C", "D", "E"],
        ["1", null, null, null, null, null],
        ["2", null, null, null, null, null],
        ["3", null, null, null, null, null],
        ["4", null, null, null, null, null],
        ["5", null, null, null, null, null],
        ["6", null, null, null, null, null],
        ["7", null, null, null, null, null],
        ["8", null, null, null, null, null],
        ["9", null, null, null, null, null],
        ["10", null, null, null, null, null],
      ]);

      

      const [focus,setFocus]=useState({row:"",col:''});

      const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@myArray', jsonValue)
        } catch (e) {
          console.log(e)
        }
      }

      const retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('@myArray')
          if (value !== null) {
            setInputValues(JSON.parse(value))
            return JSON.parse(value)
          }
        } catch (e) {
          console.log(e)
        }
      }

      
      const handleInputChange = (rowIndex, colIndex, value) => {
        setInputValues(prevValues => {
          let updatedValues = [...prevValues];
          updatedValues[rowIndex][colIndex] = value;
          storeData(updatedValues);
          return updatedValues;
        });
      };



      useEffect(()=>{
        retrieveData();
      },[])

    // console.log(inputValues)
      const renderInput = (rowIndex, colIndex) => {
        return (
          <TextInput 
            
            onFocus={()=>setFocus({row:rowIndex,col:colIndex})}
            // onBlur={()=>setFocus(false)}
            style={[styles.input,
                focus.row===rowIndex && focus.col===colIndex?styles.focused:styles.unfocused
            ,{padding:1}]}
            value={inputValues[rowIndex][colIndex]}
            editable={rowIndex===0||colIndex===0 ?false:true}
            
            onChangeText={value => handleInputChange(rowIndex, colIndex, value)}
          />
        );
      };

      
      return (
        <View>
          <View style={{width:"100%",height:50,marginTop:30,borderWidth:.1,marginBottom:10,alignItems:'center',justifyContent:'space-evenly',flexDirection:'row',elevation:3}}>
            <Text style={{fontSize:20,marginRight:25,color:'#1a73e8'}}>Google Sheet</Text>
             <Excel  data={inputValues}  />
          </View>

          {inputValues.map((row, rowIndex) => (
            <View key={rowIndex} style={{ flexDirection: 'row',}}>
              {row.map((col, colIndex) => (
                <View key={colIndex} style={{ padding:0,borderWidth:.4,width:'16.666%' ,borderColor:'gray'}}>
                  {renderInput(rowIndex, colIndex)}
                 <View style={[ focus.row===rowIndex && focus.col===colIndex?styles.blueview:styles.simpleview]}></View>
                </View>
              ))}
            </View>
          ))}
        </View>
      );
      
      
    
    
}

export default App;

const styles=StyleSheet.create({
    input:{
       
        fontSize:15,
        textAlign:'center',
        height:30,

        

    },
    focused:{

    borderColor:'#1a73e8',
    borderWidth:1.5,
    elevation:1

    },
    unfocused:{},
    blueview:{
      width:10,
        height:10,backgroundColor:'#1a73e8',
        position:'absolute',
        bottom:-5,
        right:-5,
        borderColor:'white',
        borderWidth:1,
        zIndex:1
    },
    simpleview:{
      position:'absolute'
    }


})


