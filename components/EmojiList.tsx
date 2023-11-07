import {FlatList, Image, Platform, Pressable, ImageSourcePropType} from 'react-native';
import {styles} from "../styles";

type Props = { onCloseModal: VoidFunction, onSelect: (value: ImageSourcePropType) => void }
export default function EmojiList({onSelect, onCloseModal}: Props) {
    const emoji = [
        require('../assets/images/emoji1.png'),
        require('../assets/images/emoji2.png'),
        require('../assets/images/emoji3.png'),
        require('../assets/images/emoji4.png'),
        require('../assets/images/emoji5.png'),
        require('../assets/images/emoji6.png'),
    ];

    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={Platform.OS === 'web'}
            data={emoji}
            contentContainerStyle={styles.listContainer}
            renderItem={({item, index}) => {
                return (
                    <Pressable
                        onPress={() => {
                            onSelect(item);
                            onCloseModal();
                        }}>
                        <Image source={item} key={index} style={styles.image}/>
                    </Pressable>
                );
            }}
        />
    );
}


