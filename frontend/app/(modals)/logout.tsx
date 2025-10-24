import Button from "@/components/inputs/Button";
import useGlobalStyles from "@/styles/global";
import ModalHeading from "@/components/ui/ModalHeading";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";

const Logout = () => {
  const { onLogout } = useAuth();
  const style = useGlobalStyles();

  return (
    <SafeAreaView style={style.container}>

      <ModalHeading name={'Do you wish to log out?'} />
      <Button
        onPress={() => onLogout && onLogout()}
        label='Sign out'
      />
    </SafeAreaView>
  );
};

export default Logout;