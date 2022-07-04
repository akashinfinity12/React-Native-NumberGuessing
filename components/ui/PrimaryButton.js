import { View, Text, Pressable, StyleSheet } from 'react-native'
import Colors from '../../constants/colors'

export default function PrimaryButton({children, onPress}) {

    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                style={(pressed) => pressed ? [styles.container, styles.pressed] : styles.container}
                onPress={onPress}
                android_ripple={{ color: Colors.primary600 }}>
                    <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
    },
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    // Dedicated for IoS
    pressed: {
        opacity: 0.75,
    },
})
