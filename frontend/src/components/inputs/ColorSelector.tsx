import selectableColors from "@/constants/selectableColors";
import { Colors } from "@/constants/theme";
import { View, TouchableOpacity, useColorScheme } from "react-native";

interface Props {
  color?: string,
  setColor: (color: string ) => void,
};

const ColorSelector = ({ color, setColor }: Props) => {
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={{ padding: 8, flexWrap: 'wrap', flexDirection: 'row', gap: 8 }}>

      {selectableColors.map(c => {
        const isSelectedColor = color === c;

        return (
          <TouchableOpacity
            key={c}
            onPress={() => setColor(c)}
            style={[
              isSelectedColor ? {
                borderColor: isDark ? Colors.dark.tint : Colors.light.tint,
              } : {
                borderColor: '#00000000',
              },
              {
                borderWidth: 2,
                padding: 2,
                borderRadius: 50,
              },
            ]}
          >

            <View
              style={{
                backgroundColor: c,
                width: 50,
                height: 50,
                borderRadius: 50,
              }}
            />
            
          </TouchableOpacity>
        );
      })}

    </View>
  );

};

export default ColorSelector;