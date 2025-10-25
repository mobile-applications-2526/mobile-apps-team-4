import React from 'react';
import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { IconSymbol } from './icon-symbol';
import { Colors } from '@/constants/theme';
import { BlurView } from 'expo-blur';
import useGlobalStyles from '@/styles/global';

interface Props {
  options: {
    label: string,
    onPress: () => void,
    disabled?: boolean,
  }[],
};

const OverflowMenu = ({ options }: Props) => {
  const styles = useGlobalStyles();
  const isDark = useColorScheme() === 'dark';
  const isAndroid = process.env.EXPO_OS !== 'ios';

  if (!options || options.length === 0) return;

  return (
    <Menu>
      <MenuTrigger customStyles={{ TriggerTouchableComponent: TouchableOpacity }}>
        <View
          style={{
            padding: 4,
            backgroundColor: 'lightgrey',
            borderRadius: 50,
            width: 26,
            height: 26,
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <IconSymbol size={18} name="ellipsis" color={Colors.light.text} />
        </View>
      </MenuTrigger>

      <MenuOptions
        customStyles={{
          optionsContainer: {
            borderRadius: 8,
            overflow: 'hidden',
            backgroundColor: '#00000000'
          }
        }}
        >

          <BlurView intensity={isAndroid ? 0 : 100}>
        {options.map((option, i) => (
            <MenuOption
              onSelect={option.onPress}
              disabled={option.disabled}
              key={i}
              style={[
                {
                  padding: 12,
                },
                isAndroid && {
                  backgroundColor: isDark ? Colors.dark.background : Colors.light.background,
                },
                options.length !== i + 1 && {
                  borderBottomWidth: 1,
                  borderColor: isDark ? Colors.dark.background : Colors.light.background,
                }
              ]}
            >
              <Text
                style={[
                  styles.text,
                  option.disabled && { color: isDark ? Colors.dark.border : Colors.light.border }
                ]}
              >
                {option.label}
              </Text>
            </MenuOption>
        ))}
        </BlurView>

      </MenuOptions>
    </Menu>
  );
};

export default OverflowMenu;
