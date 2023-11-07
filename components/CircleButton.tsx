import {View, Pressable, GestureResponderEvent} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {styles} from "../styles";

type Props = { onPress: (event: GestureResponderEvent) => void }

export default function CircleButton({onPress}: Props) {
    return (
        <View style={styles.circleButtonContainer}>
            <Pressable style={styles.circleButton} onPress={onPress}>
                <MaterialIcons name="add" size={38} color="#25292e"/>
            </Pressable>
        </View>
    );
}
