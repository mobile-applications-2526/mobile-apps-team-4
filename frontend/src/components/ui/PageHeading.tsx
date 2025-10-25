import useGlobalStyles from "@/styles/global";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { IconSymbol } from "./icon-symbol";
import { Colors } from "@/constants/theme";
import OverflowMenu from "./OverflowMenu";
import { OverflowMenuOption } from "@/types";

interface Props {
  name: string,
  onAdd?: () => void,
  extraOptions?: OverflowMenuOption[],
};

const PageHeading = ({ name, onAdd, extraOptions }: Props) => {
  const styles = useGlobalStyles();
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={{...styles.pageHeading, borderWidth: 0, height: 90 }}>

      <View style={{ display: 'flex', flexDirection: 'row' }}>
        {extraOptions && extraOptions.length > 0 && (
          <OverflowMenu options={extraOptions} />
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