import { useSession } from "../../context/AuthContext";
import { useRef, useState } from "react";
import { TextInput, Text, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, View, ScrollView } from "react-native";
import { Image } from 'expo-image';
import { images } from "@/../assets/images";
import { useRouter } from "expo-router";
import useGlobalStyles, { useColor } from "@/styles/global";
import UserService from "@/services/UserService";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Login() {
  const { signIn } = useSession();
  const router = useRouter();
  const styles = useGlobalStyles();
  const color = useColor();
  
  const passwordInputRef = useRef<TextInput>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);

    if (!email || !email.includes('@')) {
      setError('No valid email given');
      setLoading(false);
      return;
    }

    if (!password) {
      setError('No password given');
      setLoading(false);
      return;
    }

    // sign in api request
    try {
      const res = await UserService.login(email.trim(), password);
      if (res && res.name) signIn();
      else setError('Email or password not correct');
    } catch (err) {
      setError(String(err));
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
        placeholderTextColor={color}
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
        placeholderTextColor={color}
        returnKeyType="done"
        onSubmitEditing={handleLogin}
        style={styles.input}
      />

      {error ? <Text style={{ color: 'red', paddingBottom: 8 }}>{error}</Text> : null}

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