import useGlobalStyles from "@/styles/global";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";

interface Props {
  onPress: () => void,
  label: string,
  highlight?: boolean,
};

const Button = ({ onPress, label, highlight = true }: Props) => {
  const styles = useGlobalStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={highlight ? styles.buttonHighlight : styles.button}
    >
      <Text style={highlight ? styles.buttonHighlightText : styles.buttonText}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;