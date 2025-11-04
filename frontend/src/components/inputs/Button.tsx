import useGlobalStyles from "@/styles/global";
import { StyleProp, TouchableOpacity, ViewStyle, Text } from "react-native";

interface Props {
  onPress: () => void,
  label: string,
  highlight?: boolean,
  style?: StyleProp<ViewStyle>,
};

const Button = ({ onPress, label, highlight = true, style }: Props) => {
  const styles = useGlobalStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[highlight ? styles.buttonHighlight : styles.button, style]}
    >
      <Text style={highlight ? styles.buttonHighlightText : styles.buttonText}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;