import { Dimensions, useWindowDimensions, View, StyleSheet, FlatList } from 'react-native'
import Title from '../components/ui/Title';
import Colors from '../constants/colors';
import { useState, useEffect } from 'react'
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import { Alert } from 'react-native';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import { Ionicons } from '@expo/vector-icons';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

export default function GameScreen({ userNumber, onGameOver }) {

    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);

    const { width, height } = useWindowDimensions();


    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver]);


    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, [])


    function nextGuessHandler(direction) {

        if ((direction === 'lower' && currentGuess < userNumber) || (direction === 'higher' && currentGuess > userNumber)) {
            Alert.alert("Don't lie!", "You know this is wrong", [{ text: 'Sorry!', style: 'cancel' }]);
            return;
        }

        if (direction === 'lower') {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }
        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRndNumber);
        setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds]);
    }

    const guessRoundsListLength = guessRounds.length;

    let content = <>
        <NumberContainer>{currentGuess}</NumberContainer>

        <Card>
            <InstructionText style={styles.instructionText}>Higher or Lower</InstructionText>

            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}><Ionicons name='md-remove' size={24} color='white' /></PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}><Ionicons name='md-add' size={24} color='white' /></PrimaryButton>
                </View>
            </View>
        </Card>
    </>

    if (width > 500) {
        content = <>
            {/* <InstructionText style={styles.instructionText}>Higher or Lower</InstructionText> */}
            <View style={buttonsContainerWide}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}><Ionicons name='md-remove' size={24} color='white' /></PrimaryButton>
                </View>
                <NumberContainer>{currentGuess}</NumberContainer>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}><Ionicons name='md-add' size={24} color='white' /></PrimaryButton>
                </View>
            </View>
        </>
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            {content}
            <View style={styles.listContainer}>
                {/* {guessRounds.map(guessRounds => <Text key={guessRounds}>{guessRounds}</Text>)} */}
                <FlatList data={guessRounds} keyExtractor={(item) => item} renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundsListLength - itemData.index} guess={itemData.item} />} />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    buttonsContainerWide: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    listContainer: {
        flex: 1,
        padding: 16,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    },
    screen: {
        flex: 1,
        padding: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.accent500,
        textAlign: 'center',
        borderWidth: 2,
        borderColor: Colors.accent500,
        padding: 12,
    },
    instructionText: {
        marginBottom: 12,
    }
})
