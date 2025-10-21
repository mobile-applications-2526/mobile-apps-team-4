import Button from "@/components/inputs/Button";
import { useSession } from "@/context/AuthContext";
import useGlobalStyles from "@/styles/global";
import { View } from "react-native";

const Logout = () => {
  const { signOut } = useSession();
  const style = useGlobalStyles();

  return (
    <View style={style.containerCenter}>
      <Button
        onPress={signOut}
        label='Sign out'
      />
    </View>
  );
};

export default Logout;