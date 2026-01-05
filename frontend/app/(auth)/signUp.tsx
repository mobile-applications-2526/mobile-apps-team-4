import Signup from "@/components/auth/Signup";
import BackendStatus from "@/components/ui/BackendStatus";
import useGlobalStyles from "@/styles/global";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
  const styles = useGlobalStyles();

  return (
    <SafeAreaView style={styles.containerCenter}>
      <BackendStatus />
      <Signup />
    </SafeAreaView>
  );
};
