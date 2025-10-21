import { StyleSheet, useColorScheme } from 'react-native';


export default function useGlobalStyles() {
  const isDark = useColorScheme() === 'dark';

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 8,
      backgroundColor: isDark ? '#000' : '#fff',
    },
    containerCenter: {
      flex: 1,
      padding: 8,
      backgroundColor: isDark ? '#000' : '#fff',
      justifyContent: 'center',  
    },
    heading: {
      color: isDark ? '#fff' : '#000',
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 8,
    },
    text: {
      color: isDark ? '#fff' : '#000',
    },
    courseTitle: {
      color: isDark ? '#fff' : '#000',
      fontWeight: 'bold',
      fontSize: 20,
      flexShrink: 1,
      paddingLeft: 6,
    },
    courseItem: {
      padding: 12,
      borderBottomWidth: 1,
      borderColor: isDark ? '#555' : '#ccc',
      flexDirection: 'row',
      flex: 1,
    },
    courseItemImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
    },
    courseNavigation: {
      color: isDark ? '#fff' : '#000',
      backgroundColor: isDark ? '#111' : '#eee',
      padding: 14,
    },
    courseNavigationPart: {
      color: isDark ? '#fff' : '#000',
      fontWeight: 'bold',
      paddingVertical: 4,
      fontSize: 24,
    },
    courseNavigationChapter: {
      color: isDark ? '#fff' : '#000',
      paddingVertical: 4,
      paddingLeft: 8,
      fontSize: 20,
    },
    paragraph: {
      color: isDark ? '#fff' : '#000',
      fontSize: 16,
      lineHeight: 22,
      marginVertical: 4,
    },
    link: {
      color: isDark ? '#63ABF8' : '#0965C8',
      textDecorationLine: 'underline',
    },
    listItem: {
      color: isDark ? '#fff' : '#000',
      marginVertical: 2,
      paddingLeft: 16,
    },
    quote: {
      color: isDark ? '#fff' : '#000',
      borderLeftWidth: 4,
      borderLeftColor: '#ccc',
      paddingLeft: 8,
      marginVertical: 8,
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
      backgroundColor: '#4cb43c',
      borderRadius: 4,
    },
    buttonText: {
      padding: 14,
      fontSize: 16,
      color: isDark ? '#000' : '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    fab: {
      position: 'absolute',
      bottom: 24,
      right: 24,
      backgroundColor: '#4cb43c',
      width: 54,
      height: 54,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5, // shadow for Android
      shadowColor: '#000', // shadow for iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    label: {
      color: isDark ? '#fff' : '#000',
      fontWeight: 'bold',
      marginBottom: 4,
    },
    input: {
      color: isDark ? '#fff' : '#000',
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 8,
      marginBottom: 12,
      borderRadius: 6,
    },
    error: {
      color: 'red',
      marginBottom: 8,
    },
  });
}