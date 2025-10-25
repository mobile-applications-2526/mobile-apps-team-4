// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
export type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home',
  'house': 'home',
  'person.2.fill': 'group',
  'person.2': 'group',
  'person.fill': 'person',
  'person': 'person',
  'ellipsis': 'more-horiz',
  'plus': 'add',
  'xmark': 'close',
  "figure.walk": "directions-walk",
  "bicycle": "directions-bike",
  "book.fill": "menu-book",
  "music.note": "music-note",
  "fork.knife": "restaurant",
  "cart.fill": "shopping-cart",
  "gamecontroller.fill": "sports-esports",
  "paintpalette.fill": "palette",
  "briefcase.fill": "work",
  "leaf.fill": "eco",
  "camera.fill": "camera-alt",
  "film.fill": "movie",
  "graduationcap.fill": "school",
  "calendar": "calendar-today",
  "sparkles": "auto-awesome",
  "cloud.sun.fill": "wb-sunny",
  "star.fill": "star",
  "moon.fill": "brightness-2",
  "sun.max.fill": "wb-sunny",
  "heart.fill": "favorite",
  "flag.fill": "flag",
  "map.fill": "map",
  "tshirt.fill": "checkroom",
  "bag.fill": "work-outline",
  "music.mic": "mic",
  "theatermasks.fill": "theater-comedy",
  "soccerball": "sports-soccer",
  "basketball.fill": "sports-basketball",
  "flame.fill": "whatshot",
  "airplane": "flight",
  "tent.fill": "terrain",
  "pawprint.fill": "pets",
  "books.vertical.fill": "menu-book",
  "person.3.fill": "groups",
  "megaphone.fill": "campaign",
  "mappin.and.ellipse": "location-on",
  "gift.fill": "card-giftcard",
  "party.popper.fill": "celebration",
  "wineglass.fill": "local-bar",
  "cup.and.saucer.fill": "coffee",
  "music.note.list": "queue-music",
  "guitars.fill": "piano", 
  "paintbrush.pointed.fill": "brush",
  "figure.run": "directions-run",
  "globe.europe.africa.fill": "public",
  "desktopcomputer": "desktop-windows",
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
