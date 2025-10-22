import Button from "@/components/inputs/Button";
import { useSession } from "@/context/AuthContext";
import useGlobalStyles from "@/styles/global";
import ModalHeading from "@/components/ui/ModalHeading";
import { SafeAreaView } from "react-native-safe-area-context";

const Logout = () => {
  const { signOut } = useSession();
  const style = useGlobalStyles();

  return (
    <SafeAreaView style={style.container}>

      <ModalHeading name={'Do you wish to log out?'} />
      <Button
        onPress={signOut}
        label='Sign out'
      />
    </SafeAreaView>
  );
};

export default Logout;