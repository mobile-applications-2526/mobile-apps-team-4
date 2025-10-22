import ColorSelector from "@/components/inputs/ColorSelector";
import IconSelector from "@/components/inputs/IconSelector";
import { IconSymbolName } from "@/components/ui/icon-symbol";
import ModalHeading from "@/components/ui/ModalHeading";
import { Colors } from "@/constants/theme";
import useGlobalStyles from "@/styles/global";
import { useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateActivity = () => {
  const styles = useGlobalStyles();

  const [icon, setIcon] = useState<{ name: IconSymbolName, color: string } | undefined>(undefined);

  return (
    <SafeAreaView style={styles.container}>

      <ModalHeading name="Create a new activity" />

      <Text style={styles.label}>Choose an icon</Text>
      <IconSelector
        color={icon?.color || Colors.light.tint}
        setIcon={i => setIcon({ name: i, color: icon?.color || Colors.light.tint })}
        selectedIcon={icon?.name || undefined}
      />

      <Text style={styles.label}>Choose a color</Text>
      <ColorSelector
        color={icon?.color}
        setColor={c => setIcon({ name: icon?.name || 'figure.walk', color: c })}
      />


    </SafeAreaView>
  );
};

export default CreateActivity;