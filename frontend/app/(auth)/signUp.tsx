import Signup from "@/components/auth/Signup";
import useGlobalStyles from "@/styles/global";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
  const styles = useGlobalStyles();

  return (
    <SafeAreaView style={styles.containerCenter}>
    
      <Signup />
    </SafeAreaView>
  );
};
