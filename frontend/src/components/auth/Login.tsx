import { useAuth } from "../../context/AuthContext";
import { useRef, useState } from "react";
import { TextInput, Text, ActivityIndicator, TouchableOpacity, View } from "react-native";
import { Image } from 'expo-image';
import { images } from "@/../assets/images";
import { useRouter } from "expo-router";
import useGlobalStyles from "@/styles/global";
import UserService from "@/services/UserService";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import showErrorToast from "@/utils/showErrorToast";
import Toast from "react-native-toast-message";

export default function Login() {
  const { onLogin } = useAuth();
  const router = useRouter();
  const styles = useGlobalStyles();
  
  const passwordInputRef = useRef<TextInput>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    if (!email?.includes('@')) {
      Toast.show({
        type: 'error',
        text1: 'No valid email given',
      });
      setLoading(false);
      return;
    }

    if (!password) {
      Toast.show({
        type: 'error',
        text1: 'No password given',
      });
      setLoading(false);
      return;
    }

    // sign in api request
    try {
      const res = await UserService.login(email.trim(), password);

      console.log(res)
      
      if (res) {
        onLogin?.(res);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Email or password not correct',
        });
      }
    } catch (err) {
      showErrorToast(err);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.containerCenter}
      bounces={false}
      enableOnAndroid
      extraHeight={15}
      extraScrollHeight={15}
    >

      <View style={{ padding: 8, alignItems: 'center' }}>
        <Image
          source={images.logo}
          style={{ width: 310, height: 80 }}
        />
      </View>

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder='Email'
        placeholderTextColor={styles.placeholderText.color}
        returnKeyType="next"
        onSubmitEditing={() => passwordInputRef.current?.focus()} 
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        ref={passwordInputRef}
        onChangeText={setPassword}
        autoCapitalize="none"
        secureTextEntry
        placeholder="Password"
        placeholderTextColor={styles.placeholderText.color}
        returnKeyType="done"
        onSubmitEditing={handleLogin}
        style={styles.input}
      />

      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <TouchableOpacity
            onPress={handleLogin}
            style={styles.buttonHighlight}
          >
            <Text style={styles.buttonHighlightText}>
              Log in
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(auth)/signUp')}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              Sign up
            </Text>
          </TouchableOpacity>
        </>
      )}

    </KeyboardAwareScrollView>
  );
};