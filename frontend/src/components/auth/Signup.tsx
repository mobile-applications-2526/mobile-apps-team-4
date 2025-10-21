import { useSession } from "../../context/AuthContext";
import { useRef, useState } from "react";
import { TextInput, Text, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, View } from "react-native";
import { Image } from 'expo-image';
import { images } from "@/../assets/images";
import { useRouter } from "expo-router";
import isValidEmail from "@/utils/isValidEmail";

export default function Signup() {
  const { signIn } = useSession();
  const router = useRouter();

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmInputRef = useRef<TextInput>(null);
  

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = () => {
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

      setError('');
      signIn();

    } finally {
      setLoading(false);
    }


    // sign in api request

    
  }
  
  return (
    <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', padding: 8 }}>

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
        autoCapitalize="none"
        keyboardType="default"
        placeholder='Name'
        returnKeyType="next"
        onSubmitEditing={() => emailInputRef.current?.focus()}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 8,
          marginBottom: 12,
          borderRadius: 6,
        }}
      />

      <Text style={{ fontWeight: 'bold' }}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        ref={emailInputRef}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder='Email'
        returnKeyType="next"
        onSubmitEditing={() => passwordInputRef.current?.focus()}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 8,
          marginBottom: 12,
          borderRadius: 6,
        }}
      />

      <Text style={{ fontWeight: 'bold' }}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        ref={passwordInputRef}
        secureTextEntry
        placeholder='Password'
        returnKeyType="next"
        onSubmitEditing={() => passwordConfirmInputRef.current?.focus()}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 8,
          marginBottom: 20,
          borderRadius: 6,
        }}
      />

      <Text style={{ fontWeight: 'bold' }}>Confirm password</Text>
      <TextInput
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        ref={passwordConfirmInputRef}
        secureTextEntry
        placeholder='Confirm password'
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 8,
          marginBottom: 20,
          borderRadius: 6,
        }}
      />

      {error ? <Text style={{ color: 'red', paddingBottom: 8 }}>{error}</Text> : null}

      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <TouchableOpacity
            onPress={handleSignup}
            style={{ width: '100%', backgroundColor: 'black', borderWidth: 1, padding: 8, borderRadius: 8, alignItems: 'center', marginBottom: 4 }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
              Sign up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(auth)/sign-in')}
            style={{ width: '100%', backgroundColor: 'white', borderWidth: 1, padding: 8, borderRadius: 8, alignItems: 'center', marginBottom: 4 }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>
              Log in
            </Text>
          </TouchableOpacity>
        </>
      )}

    </KeyboardAvoidingView>
  );
};