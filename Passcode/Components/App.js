import React, { useState, useRef } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';

const PasscodeScreen = () => {
  const [passcode, setPasscode] = useState(['', '', '', '']);
  const [autofillEnabled, setAutofillEnabled] = useState(false);
  const passcodeInputs = useRef([]);

  const handlePasscodeChange = (index, value) => {
    const updatedPasscode = [...passcode];
    updatedPasscode[index] = value;
    setPasscode(updatedPasscode);

    if (value && index < passcodeInputs.current.length - 1) {
      passcodeInputs.current[index + 1].focus();
    }
  };

  const handleAutofillToggle = () => {
    setAutofillEnabled(!autofillEnabled);
  };

  const handleVerifyPasscode = () => {
    // Replace this with your own passcode verification logic
    const correctPasscode = '1234';
    if (passcode.join('') === correctPasscode) {
      Alert.alert('Success', 'Passcode verified!');
    } else {
      Alert.alert('Error', 'Passcode verification failed!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.passcodeContainer}>
        {passcode.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (passcodeInputs.current[index] = ref)}
            secureTextEntry
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handlePasscodeChange(index, text)}
            style={styles.passcodeBox}
          />
        ))}
      </View>
      <View style={styles.navigationContainer}>
        
        <Button
          title="Previous <-"
          onPress={() => {
            const nextIndex = passcode.findIndex((digit, index) => {
              return index < passcode.length - 1 && passcode[index + 1] === '';
            });
            if (nextIndex !== -1) {
              passcodeInputs.current[nextIndex].focus();
            }
          }}
        />
        <Button
          title="Next ->"
          onPress={() => {
            const previousIndex = passcode.findIndex((digit, index) => {
              return index > 0 && passcode[index - 1] === '';
            });
            if (previousIndex !== -1) {
              passcodeInputs.current[previousIndex].focus();
            }
          }}
        />
      </View>
      <Button title="Verify Passcode" onPress={handleVerifyPasscode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passcodeContainer: {
    flexDirection: 'row',
    justifyContent: "equal-spacing",
    marginBottom: 10,
  },
  passcodeBox: {
    width: 60,
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 24,
    textAlign: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default PasscodeScreen;
