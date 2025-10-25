import { Colors } from "@/constants/theme";
import useGlobalStyles from "@/styles/global";
import { JSX } from "react"
import { useColorScheme } from "react-native";
import { BaseToast, BaseToastProps } from "react-native-toast-message"

const getToastConfig = () => {
  const styles = useGlobalStyles();
  const isDark = useColorScheme() === 'dark';

  return {
      success: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
        <BaseToast
          {...props}
          style={styles.toastSuccess}
          text1Style={{ color: Colors.dark.text, fontSize: 16, fontWeight: 'bold' }}
          text2Style={{ color: Colors.dark.text, fontSize: 14, }}
          text2NumberOfLines={3}
        />
      ),
      info: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
        <BaseToast
          {...props}
          style={styles.toastInfo}
          text1Style={{ color: isDark ? Colors.light.text : Colors.dark.text, fontSize: 16, fontWeight: 'bold' }}
          text2Style={{ color: isDark ? Colors.light.text : Colors.dark.text, fontSize: 14, }}
          text2NumberOfLines={3}
        />
      ),
      error: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
        <BaseToast
          {...props}
          style={styles.toastError}
          text1Style={{ color: Colors.dark.text, fontSize: 16, fontWeight: 'bold' }}
          text2Style={{ color: Colors.dark.text, fontSize: 14, }}
          text2NumberOfLines={3}
        />
      ),
    }
};

export default getToastConfig;