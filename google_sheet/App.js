import { View,Text,StyleSheet,TextInput, } from "react-native";
import {useState} from 'react';



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

      
      const handleInputChange = (rowIndex, colIndex, value) => {
        setInputValues(prevValues => {
          let updatedValues = [...prevValues];
          updatedValues[rowIndex][colIndex] = value;
          return updatedValues;
        });
      };

    console.log(inputValues)
      const renderInput = (rowIndex, colIndex) => {
        return (
          <TextInput 
            
            onFocus={()=>setFocus({row:rowIndex,col:colIndex})}
            // onBlur={()=>setFocus(false)}
            style={[styles.input,
                focus.row==rowIndex && focus.col==colIndex?styles.focused:styles.unfocused
            ]}
            value={inputValues[rowIndex][colIndex]}
            editable={rowIndex===0||colIndex===0 ?false:true}
            
            onChangeText={value => handleInputChange(rowIndex, colIndex, value)}
          />
        );
      };

      
      return (
        <View>
          {inputValues.map((row, rowIndex) => (
            <View key={rowIndex} style={{ flexDirection: 'row',}}>
              {row.map((col, colIndex) => (
                <View key={colIndex} style={{ padding:0,borderWidth:.4,width:'16.666%' }}>
                  {renderInput(rowIndex, colIndex)}
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
        padding:0,
        fontSize:17
        

    },
    focused:{

    borderColor:'blue',
    borderWidth:1

    }
    ,
    unfocused:{

    }
})


