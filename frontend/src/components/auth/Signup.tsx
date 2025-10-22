import { useSession } from "../../context/AuthContext";
import { useRef, useState } from "react";
import { TextInput, Text, ActivityIndicator, View } from "react-native";
import { Image } from 'expo-image';
import { images } from "@/../assets/images";
import { useRouter } from "expo-router";
import isValidEmail from "@/utils/isValidEmail";
import useGlobalStyles, { useColor } from "@/styles/global";
import Button from "../inputs/Button";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UserService from "@/services/UserService";

export default function Signup() {
  const { signIn } = useSession();
  const router = useRouter();
  const styles = useGlobalStyles();
  const color = useColor();

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmInputRef = useRef<TextInput>(null);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setLoading(true);

    try {
      if (!name) {
        setError('');
        return;
      }
  
      if (!email || !isValidEmail(email)) {
        setError('No valid email given');
        return;
      }
  
      if (!password) {
        setError('No password given');
        return;
      }
  
      if (!passwordConfirm) {
        setError('Please repeat your password');
        return;
      }
  
      if (password !== passwordConfirm) {
        setError('Passwords do not match');
        return;
      }

      if (password.length < 8) {
        setError('Your password should contain at least 8 characters');
        return;
      }

      // sign in api request
      try {
        const res = await UserService.register(email, password, name);
        if (res && res.name) signIn();
        else setError(JSON.stringify(res));
      } catch (err) {
        setError(String(err));
      } finally {
        setLoading(false);
      }

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

      <View style={{ alignItems: 'center', marginBottom: 32 }}>
        <Image
          source={images.logo}
          style={{ width: 310, height: 80 }}
        />
      </View>

      <Text style={{ fontWeight: 'bold' }}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        keyboardType="default"
        placeholder='Name'
        placeholderTextColor={color}
        returnKeyType="next"
        onSubmitEditing={() => emailInputRef.current?.focus()}
        style={styles.input}
      />

      <Text style={{ fontWeight: 'bold' }}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        ref={emailInputRef}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder='Email'
        placeholderTextColor={color}
        returnKeyType="next"
        onSubmitEditing={() => passwordInputRef.current?.focus()}
        style={styles.input}
      />

      <Text style={{ fontWeight: 'bold' }}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        ref={passwordInputRef}
        secureTextEntry
        placeholder='Password'
        placeholderTextColor={color}
        returnKeyType="next"
        onSubmitEditing={() => passwordConfirmInputRef.current?.focus()}
        style={styles.input}
      />

      <Text style={{ fontWeight: 'bold' }}>Confirm password</Text>
      <TextInput
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        autoCapitalize="none"
        ref={passwordConfirmInputRef}
        secureTextEntry
        placeholder='Confirm password'
        placeholderTextColor={color}
        style={styles.input}
      />

      {error ? <Text style={{ color: 'red', paddingBottom: 8 }}>{error}</Text> : null}

      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Button label="Sign up" onPress={handleRegister} />
          <Button label="Log in" onPress={() => router.push('/(auth)/signIn')} highlight={false} />
        </>
      )}
    </KeyboardAwareScrollView>
  );
};