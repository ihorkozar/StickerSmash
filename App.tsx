import {StatusBar} from "expo-status-bar";
import {View, Platform, ImageSourcePropType} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import Button from './components/Button';
import ImageViewer from './components/ImageViewer';
import React, {useRef, useState} from 'react';
import IconButton from "./components/IconButton";
import CircleButton from "./components/CircleButton";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import * as MediaLibrary from 'expo-media-library';
import {captureRef} from 'react-native-view-shot';
import domToImage from 'dom-to-image';
import {styles} from './styles';

const PlaceholderImage = require('./assets/images/background-image.png');

export default function App() {
    const [selectedImage, setSelectedImage] = useState<null | string>(null);
    const [showAppOptions, setShowAppOptions] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | null>(null);
    const [status, requestPermission] = MediaLibrary.usePermissions();
    const imageRef: React.MutableRefObject<null> = useRef(null);
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            setShowAppOptions(true);
        } else {
            alert('You did not select any image.');
        }
    };

    const onReset = () => {
        setShowAppOptions(false);
    };

    const onAddSticker = () => {
        setIsModalVisible(true);
    };

    const onModalClose = () => {
        setIsModalVisible(false);
    };

    const onSaveImageAsync = async () => {
        if (Platform.OS !== 'web') {
            try {
                const localUri = await captureRef(imageRef, {
                    height: 440,
                    quality: 1,
                });
                await MediaLibrary.saveToLibraryAsync(localUri);
                if (localUri) {
                    alert('Saved!');
                }
            } catch (e) {
                console.log(e);
            }
        } else if (imageRef.current) {
            try {
                const dataUrl = await domToImage.toJpeg(imageRef.current, {
                    quality: 0.95,
                    width: 320,
                    height: 440,
                });

                let link = document.createElement('a');
                link.download = 'sticker-smash.jpeg';
                link.href = dataUrl;
                link.click();
            } catch (e) {
                console.log(e);
            }
        }
    };

    if (status === null) {
        requestPermission();
    }

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <View ref={imageRef} collapsable={false}>
                        <ImageViewer
                            placeholderImageSource={PlaceholderImage}
                            selectedImage={selectedImage}
                        />
                        {pickedEmoji !== null ? <EmojiSticker imageSize={40} stickerSource={pickedEmoji}/> : null}
                    </View>
                </View>
                {showAppOptions ? (
                    <View style={styles.optionsContainer}>
                        <View style={styles.optionsRow}>
                            <IconButton icon="refresh" label="Reset" onPress={onReset}/>
                            <CircleButton onPress={onAddSticker}/>
                            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync}/>
                        </View>
                    </View>
                ) : (
                    <View style={styles.footerContainer}>
                        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync}/>
                        <Button label="Use this photo" onPress={() => setShowAppOptions(true)}/>
                    </View>
                )}
                <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
                    <EmojiList onSelect={(value: ImageSourcePropType) => setPickedEmoji(value)}
                               onCloseModal={onModalClose}/>
                </EmojiPicker>
                <StatusBar style="light"/>
            </View>
        </GestureHandlerRootView>
    );
}
