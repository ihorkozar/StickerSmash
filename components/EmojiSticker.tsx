import {View, Image, ImageSourcePropType} from 'react-native';
import {GestureEvent, PanGestureHandler, TapGestureHandler} from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    useAnimatedGestureHandler,
    withSpring,
} from 'react-native-reanimated';


const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);

type Props = { imageSize: number, stickerSource: ImageSourcePropType }

export default function EmojiSticker({imageSize, stickerSource}: Props) {
    const scaleImage = useSharedValue(imageSize);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const onDoubleTap: (event: GestureEvent<any>) => void = useAnimatedGestureHandler({
        onActive: () => {
            if (scaleImage.value !== imageSize * 2) {
                scaleImage.value = scaleImage.value * 2;
            }
        },
    });

    const imageStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value),
        };
    });

    const onDrag = useAnimatedGestureHandler({
        onStart: (_event, context: { translateX: number, translateY: number }) => {
            context.translateX = translateX.value;
            context.translateY = translateY.value;
        },
        onActive: (event, context) => {
            translateX.value = event.translationX + context.translateX;
            translateY.value = event.translationY + context.translateY;
        },
    });

    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value,
                },
                {
                    translateY: translateY.value,
                },
            ],
        };
    });


    return (
        <PanGestureHandler onGestureEvent={onDrag}>
            <AnimatedView style={[containerStyle, {top: -350}]}>
                <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
                    <AnimatedImage
                        source={stickerSource}
                        resizeMode="contain"
                        style={[imageStyle, {width: imageSize, height: imageSize}]}
                    />
                </TapGestureHandler>
            </AnimatedView>
        </PanGestureHandler>
    );
}




