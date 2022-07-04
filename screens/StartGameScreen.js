import { ScrollView, TextInput, useWindowDimensions, View, StyleSheet, Alert, KeyboardAvoidingView } from "react-native"
import PrimaryButton from "../components/ui/PrimaryButton"
import { useState } from 'react'
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

export default function StartGameScreen({ onPickNumber }) {

  const [enteredNumber, setEnteredNumber] = useState('');

  const { width, height } = useWindowDimensions();

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  function resetInputHandler() {
    setEnteredNumber('');
  }

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid Number',
        'Number should be in between 1 and 99',
        [{ text: 'Okay', style: "destructive", onPress: resetInputHandler }],
      );
      return;
    }

    // continue game
    onPickNumber(chosenNumber);

  }

  const marginTopDistance = height < 380 ? 30 : 100;


  return (
    <ScrollView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={"position"}>
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter a number</InstructionText>
            <TextInput style={styles.numberInput} onChangeText={numberInputHandler} value={enteredNumber} maxLength={2} keyboardType={"number-pad"} />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

// const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  instructionText: {
    color: Colors.accent500,
    fontSize: 24,
  },
  inputContainer: {
    padding: 16,
    marginTop: 36,
    backgroundColor: Colors.primary800,
    marginHorizontal: 24,
    borderRadius: 8,
    // -----------------------
    // Shadow for Android
    elevation: 4,
    // Shadow for IoS
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    // -----------------------
    justifyContent: "center",
    alignItems: "center",
  },
  numberInput: {
    height: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    width: 50,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    // marginTop: deviceHeight < 380 ? 30 : 100,
    alignItems: "center",
  },
})
