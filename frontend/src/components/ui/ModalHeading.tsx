import useGlobalStyles from "@/styles/global";
import { Text, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "./icon-symbol";
import { Colors } from "@/constants/theme";
import { router } from "expo-router";

interface Props {
  name: string,
  showClose?: boolean,
};

const ModalHeading = ({ name, showClose = true }: Props) => {
  const styles = useGlobalStyles();
  
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
      {process.env.EXPO_OS === 'ios' && showClose && (
        <View style={{ width: 26, height: 26 }} />
      )}

      <Text style={{...styles.text, fontWeight: 'bold', fontSize: 20, textAlign: 'center', flex: 1 }}>
        {name}
      </Text>

      {process.env.EXPO_OS === 'ios' && showClose && (
        <TouchableOpacity onPress={router.back} style={{ padding: 4, backgroundColor: 'lightgrey', borderRadius: 50, height: 26 }}>
          <IconSymbol size={18} name="xmark" color={Colors.light.text} />
        </TouchableOpacity>
      )}
    </View>
  );
};


export default ModalHeading;