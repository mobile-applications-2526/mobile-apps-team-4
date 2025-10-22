import { TouchableOpacity, useColorScheme, View } from "react-native";
import { IconSymbol, IconSymbolName } from "../ui/icon-symbol";
import selectableIcons from "@/constants/selectableIcons";
import { Colors } from "@/constants/theme";

interface Props {
  color: string,
  setIcon: (icon: IconSymbolName) => void,
  selectedIcon?: IconSymbolName,
};

const IconSelector = ({ color, setIcon, selectedIcon }: Props) => {
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={{ padding: 8, flexWrap: 'wrap', flexDirection: 'row', gap: 8 }}>

      {selectableIcons.map((icon, i) => {
        const isSelectedIcon = icon === selectedIcon;

        return (
          <TouchableOpacity
            key={i}
            onPress={() => setIcon(icon)}
          >
            
            <IconSymbol
              size={32}
              name={icon}
              color={isSelectedIcon ? color : (isDark ? Colors.dark.icon : Colors.light.icon)}
            />

          </TouchableOpacity>
        );
    })}
    
    </View>
  );
};

export default IconSelector;