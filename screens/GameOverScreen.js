import { View, Image, StyleSheet, Text, ScrollView, useWindowDimensions } from "react-native"
import PrimaryButton from "../components/ui/PrimaryButton"
import Title from "../components/ui/Title"
import Colors from "../constants/colors"

export default function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {

    const { width, height } = useWindowDimensions();

    let imageSize = 300;

    if (width < 380) {
        imageSize = 150;
    }

    if (height < 400) {
        imageSize = 80;
    }

    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2,
    }

    return (
        <ScrollView style={{flex: 1}}>
            <View style={styles.rootContainer}>
                <Title>GAME OVER!!</Title>
                <View style={[styles.imageContainer, imageStyle]}>
                    <Image style={styles.imageStyle} source={require('../assets/images/success.png')} />
                </View>
                <Text style={styles.summaryText}>Your Phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text>.</Text>
                <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
            </View>
        </ScrollView>
    )
}

// const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    imageContainer: {
        // borderRadius: deviceWidth > 380 ? 75 : 150,
        // width: deviceWidth < 380 ? 150 : 300,
        // height: deviceWidth < 380 ? 150 : 300,
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow: "hidden",
        margin: 36,
    },
    imageStyle: {
        width: '100%',
        height: '100%',
    },
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        textAlign: "center",
        marginBottom: 24,
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500,
    },
})
