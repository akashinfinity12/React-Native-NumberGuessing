import { View, StyleSheet, Dimensions } from 'react-native'
import Colors from '../../constants/colors'

export default function Card({ children }) {
    return (
        <View style={styles.inputContainer}>
            {children}
        </View>
    )
}

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    inputContainer: {
        padding: 16,
        marginTop: deviceWidth < 380 ? 18 : 36,
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
})