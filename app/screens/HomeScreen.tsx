import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { MovieLists, Screen } from "app/components"
import { DemoTabScreenProps } from "app/navigators/DemoNavigator"

interface HomeScreenProps extends DemoTabScreenProps<"Home"> { }

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {

  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={['top']}>
      <MovieLists />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}
