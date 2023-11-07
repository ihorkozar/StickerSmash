import {Modal, View, Text, Pressable, StyleSheet, GestureResponderEvent} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {styles} from "../styles";

type Props = { isVisible: boolean, children: any, onClose: (event: GestureResponderEvent) => void }
export default function EmojiPicker({isVisible, children, onClose}: Props) {
    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={styles.modalContent}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Choose a sticker</Text>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name="close" color="#fff" size={22}/>
                    </Pressable>
                </View>
                {children}
            </View>
        </Modal>
    );
}

