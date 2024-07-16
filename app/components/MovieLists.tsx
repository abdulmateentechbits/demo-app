import * as React from "react"
import { FlatList, Image, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"
import { Text } from "./Text"
import { DATA } from "app/utils/movieData"

export interface MovieListsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}


export const MovieLists = observer(function MovieLists(props: MovieListsProps) {
  const navigation = useNavigation()

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('VideoPlayer', { videoUrl: item.Watch })}
    >
      <Image source={{ uri: item.Thumbnail }} style={styles.thumbnail} />
      <Text style={styles.title}>{item.Title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.Id.toString()}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  thumbnail: {
    width: 100,
    height: 100,
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
    alignSelf: 'center',
  },
});