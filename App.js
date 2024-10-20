import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function App() {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});
  

  const handleOperation = (operation) => {
    let errors = {};
   

    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);

    if(!firstNumber){
      errors.firstNumber = 'First number is required.';
    }else if(isNaN(num1)){
      errors.firstNumber = 'Invalid input. Do not input a letter.';
    }

    if(!secondNumber){
      errors.secondNumber = 'Second number is required.'
    }else if(isNaN(num2)){
      errors.secondNumber ='Invalid input. Do not input a letter.'
    }

    setErrors(errors);

    if(Object.keys(errors).length > 0) 
    return;

    
    let res;
    switch (operation) {
      case 'add':
        res = num1 + num2;
        break;
      case 'sub':
        res = num1 - num2;
        break;
      case 'multi':
        res = num1 * num2;
        break;
      case 'div':
        if (num2 === 0) {
          Alert.alert('Error', 'Cannot divide by zero.');
          return;
        }
        res = num1 / num2;
        break;
      default:
        return;
    }

    if (isNaN(res)) {
      setResult('');
    } else {
      setResult(res);
    }


  };

  const reset = () => {
    setFirstNumber('');
    setSecondNumber('');
    setResult(null);
   
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Calculator App </Text>

      <View style={styles.inputWrapper}>
        <View style={styles.container2}>
          <Text style={styles.label}> First Number </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter First Number"
            value={firstNumber}
            onChangeText={setFirstNumber}
          />
           
          {errors.firstNumber ? <Text style={styles.errorTxt}>{errors.firstNumber}</Text> : null}
        </View>

        <View style={styles.container2}>
          <Text style={styles.label}> Second Number </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Second Number"
            value={secondNumber}
            onChangeText={setSecondNumber}
          />

         {errors.secondNumber ? <Text style={styles.errorTxt}>{errors.secondNumber}</Text> : null}
        </View>
      </View>

      <View style={styles.buttonCon}>
        <TouchableOpacity style={styles.button} onPress={() => handleOperation('add')}>
          <Text style={styles.txtbutton}> Add </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOperation('sub')}>
          <Text style={styles.txtbutton}> Subtract </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOperation('multi')}>
          <Text style={styles.txtbutton}> Multiply </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOperation('div')}>
          <Text style={styles.txtbutton}> Divide </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.result}>
        Result: {result !== null ? result : ''}
      </Text>

      <View style={styles.resetcon}>
        <TouchableOpacity style={styles.reset} onPress={reset}>
          <Text style={styles.txtbutton}> Reset </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  inputWrapper: {
    width: '80%', 
    marginBottom: 15,
  },
  container2: {
    flexDirection: 'column', 
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    fontSize: 17,
    padding: 4,
    width: '100%', 
  },
  buttonCon: {
    alignItems: 'center',
    marginTop: 5,
  },
  button: {
    marginBottom: 11,
    backgroundColor: 'blue',
    padding: 12,
    width: 225,
    borderRadius: 15,
  },
  txtbutton: {
    fontSize: 17,
    color: 'white',
    textAlign: 'center',
  },
  result: {
    fontSize: 20,
    marginTop: 25,
    fontWeight: '800',
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 17,
    color: 'blue',
  },
  resetcon: {
    alignItems: 'center',
    marginTop: 40,
  },
  reset: {
    backgroundColor: 'red',
    width: 180,
    padding: 5,
    fontSize: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorTxt: {
    color: 'red',
    fontSize: 15,
    marginTop: 5,
  }
  
  
  
});