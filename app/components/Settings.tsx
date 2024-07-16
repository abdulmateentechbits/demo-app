import React from "react"
import { observer } from "mobx-react-lite"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { Icon, Text } from "app/components"
import I18n from "i18n-js"
import * as storage from '../utils/storage'
import { useStores } from "app/models"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"
import { uniqBy } from 'lodash';
import { colors, scale, spacing, typography } from "app/theme"
import { Dropdown } from "react-native-element-dropdown"
import { setLocale } from "app/i18n"

export interface SettingsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

// Assuming I18n is already defined and populated
const languages = uniqBy(
  Object.keys(I18n.translations).map((key) => {
    const translation = I18n.translations[key] as { name: string } | undefined;

    if (!translation || !translation.name) {
      console.error(`Translation for key "${key}" is missing or does not have a "name" property`);
      return null; // Skip this entry if name is missing
    }

    return {
      label: translation.name,
      value: key,
    };
  }).filter(item => item !== null), // Remove null entries
  'label'
);


export const Settings = observer(function Settings(props: SettingsProps) {
  console.log("Selected Language: ", languages);
  const { authenticationStore: { logout } } = useStores();

  const onChangeLanguage = async ({ value }) => {
    console.log("🚀 ~ onChangeLanguage ~ value:", value)
    await storage.save("locale", value)
    setLocale(value as string);
    logout();
  }

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', columnGap: 5 }}>
      <View>
        <Text>Change Language</Text>
      </View>
      <View>
        <View style={$container}>
          <Dropdown
            accessibilityLabel="language select"
            style={$dropdown}
            placeholderStyle={[$dropdownText, $dropdownPlaceholder]}
            selectedTextStyle={[$dropdownText, $dropdownSelected]}
            data={languages}
            itemContainerStyle={{
              backgroundColor: colors.palette.neutral300,
            }}
            containerStyle={$dropdownContainer}
            itemTextStyle={$dropdownText}
            activeColor={colors.palette.neutral400}
            value={I18n.locale}
            labelField="value"
            valueField="value"
            onChange={onChangeLanguage}
            renderRightIcon={() => (
              <Icon
                icon="settings"
                size={28}
                containerStyle={$dropdownRightAccessory}
              />
            )}
          />
        </View>
      </View>
    </View>
  )
})

const $dropdown: ViewStyle = {
  width: "100%",
  height: scale(30),
  overflow: "hidden",
}

const $dropdownContainer: ViewStyle = {
  backgroundColor: colors.palette.primary500,
  borderRadius: scale(10),
  marginTop: -scale(40),
  borderWidth: 0,
}

const $dropdownPlaceholder: TextStyle = {
  color: colors.palette.neutral900,
}

const $dropdownSelected: TextStyle = {
  color: "#000000",
}

const $dropdownText: TextStyle = {
  flex: 1,
  textAlign: "left",
  fontFamily: typography.primary.normal,
  fontSize: 18,
  paddingVertical: 0,
  paddingHorizontal: 0,
  marginHorizontal: scale(spacing.sm),
  textAlignVertical: "center",
  color: colors.palette.neutral200,
}

const $dropdownRightAccessory: ViewStyle = {
  height: scale(56),
  justifyContent: "center",
  alignItems: "center",
}
const $container: ViewStyle = {
  width: 200,
  backgroundColor: 'white',
  padding: 16,
}
