import Button from "@/components/inputs/Button";
import { useSession } from "@/context/AuthContext";
import useGlobalStyles from "@/styles/global";
import { View } from "react-native";
import ModalHeading from "@/components/ui/ModalHeading";

const Logout = () => {
  const { signOut } = useSession();
  const style = useGlobalStyles();

  return (
    <View style={style.container}>

      <ModalHeading name={'Do you wish to log out?'} />
      <Button
        onPress={signOut}
        label='Sign out'
      />
    </View>
  );
};

export default Logout;