import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, StyleSheet } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen } from "app/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"
import Video from 'react-native-video';

const { width } = Dimensions.get('window');

interface VideoPlayerScreenProps extends AppStackScreenProps<"VideoPlayer"> {}

export const VideoPlayerScreen: FC<VideoPlayerScreenProps> = observer(function VideoPlayerScreen(_props) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const {route:{params:{videoUrl}}} = _props;

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={styles.container} preset="fixed">
       <Video
        source={{ uri: videoUrl }}
        style={styles.video}
        controls
      />
    </Screen>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  video: {
    width: width,
    height: width * (9 / 16),
  },
});