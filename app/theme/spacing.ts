/**
  Use these spacings for margins/paddings and other whitespace throughout your app.
 */
  import I18n from "i18n-js";
  import { Dimensions, PixelRatio } from "react-native"
  
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
  
  const BASE_WIDTH = 430
  const BASE_HEIGHT = 932
  
  enum LanguageScaling {
    en = 1,
    fr = 1,
    ko = 1,
    ar = 1
  }
  
  export const scale = (size: number, isFontScale?: boolean) => {
    const widthScale = SCREEN_WIDTH / BASE_WIDTH
    const heightScale = SCREEN_HEIGHT / BASE_HEIGHT
    const scale = Math.min(widthScale, heightScale)
  
    const newSize = isFontScale ? size * scale * (LanguageScaling[I18n.locale] ?? 1) : size * scale
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  }
  
export const spacing = {
  xxxs: 2,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const

export type Spacing = keyof typeof spacing
