import {
    Image,
    ImageSourcePropType
} from 'react-native';
import {styles} from "../styles";

type Props = { placeholderImageSource: ImageSourcePropType, selectedImage: string | null }
export default function ImageViewer({placeholderImageSource, selectedImage}: Props) {
    const imageSource: ImageSourcePropType = selectedImage ? {uri: selectedImage} : placeholderImageSource;

    return <Image source={imageSource} style={styles.imageViewerImage}/>;
}
