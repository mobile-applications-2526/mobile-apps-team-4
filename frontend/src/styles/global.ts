import { Colors } from '@/constants/theme';
import { StyleSheet, useColorScheme } from 'react-native';
import { baseButton } from './base';


export default function useGlobalStyles() {
  const isDark = useColorScheme() === 'dark';
  const color = isDark ? Colors.dark.text : Colors.light.text;

  return StyleSheet.create({
    container: {
      backgroundColor: isDark ? Colors.dark.background : Colors.light.background,
      flex: 1,
      padding: 12,
    },
    containerCenter: {
      backgroundColor: isDark ? Colors.dark.background : Colors.light.background,
      flex: 1,
      padding: 8,
      justifyContent: 'center',  
    },
    containerNoPadding: {
      backgroundColor: isDark ? Colors.dark.background : Colors.light.background,
      flex: 1,
    },
    heading: {
      color,
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 8,
    },
    pageHeading: {
      color,
      fontSize: 32,
      fontWeight: 'bold',
      // marginTop: 28,
      // marginBottom: 8,
    },
    text: {
      color,
    },
    borderColor: {
      borderColor: isDark ? Colors.dark.border : Colors.light.border,
    },
    image: {
      width: 200,
      height: 200,
      marginVertical: 8,
    },
    part: {
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    button: {
      ...baseButton,
      borderColor: isDark ? Colors.dark.tint : Colors.light.tint,
      backgroundColor: isDark ? Colors.dark.background : Colors.light.background,
    },
    buttonHighlight: {
      ...baseButton,
      borderColor: isDark ? Colors.dark.tint : Colors.light.tint,
      backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint,
    },
    buttonText: {
      color: isDark ? Colors.dark.tint : Colors.light.tint,
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
    },
    buttonHighlightText: {
      color: isDark ? Colors.light.text : Colors.dark.text,
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
    },
    label: {
      color,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    input: {
      color,
      borderColor: isDark ? Colors.dark.border : Colors.light.border,
      borderWidth: 1,
      padding: 8,
      marginBottom: 12,
      borderRadius: 6,
    },
    error: {
      color: 'red',
      marginBottom: 8,
    },
    listItem: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderColor: isDark ? Colors.dark.border : Colors.light.border,
      flexDirection: 'row',
      flex: 1,
    },
    listItemSmall: {
      paddingHorizontal: 8,
      paddingVertical: 8,
      borderBottomWidth: 1,
      gap: 8,
      borderColor: isDark ? Colors.dark.border : Colors.light.border,
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    map: {
      flex: 1,
      borderRadius: 12,
      height: 500,
    },
  });
};