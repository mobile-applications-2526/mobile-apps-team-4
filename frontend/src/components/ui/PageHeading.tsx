import useGlobalStyles from "@/styles/global";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { IconSymbol } from "./icon-symbol";
import { Colors } from "@/constants/theme";

interface Props {
  name: string,
  onAdd?: () => void,
  onExtraOptions?: () => void,
};

const PageHeading = ({ name, onAdd, onExtraOptions }: Props) => {
  const styles = useGlobalStyles();
  const isDark = useColorScheme() === 'dark';
  
  const hasButtons = !!onAdd || !!onExtraOptions;
  
  return (
    <View style={{...styles.pageHeading, borderWidth: 0, height: 90 }}>

      <View style={{ display: 'flex', flexDirection: 'row' }}>
        {onExtraOptions && (
          <TouchableOpacity
            onPress={onExtraOptions}
            style={{
              padding: 4,
              backgroundColor: 'lightgrey',
              borderRadius: 50,
              width: 26,
              height: 26,
            }}
          >
            <IconSymbol size={18} name="ellipsis" color={Colors.light.text} />
          </TouchableOpacity>
        )}

        {onAdd && (
          <TouchableOpacity
            onPress={onAdd}
            style={{
              padding: 4,
              backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint, 
              borderRadius: 50,
              marginLeft: 'auto',
              width: 26,
              height: 26,
            }}
          >
            <IconSymbol size={18} name="plus" color={isDark ? Colors.light.text : Colors.dark.text} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={{...styles.pageHeading, marginTop: 'auto', marginBottom: 8 }}>
        {name}
      </Text>
    </View>
  );
};


export default PageHeading;