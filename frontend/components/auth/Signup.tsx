import { useSession } from "../../context/AuthContext";
import { useState } from "react";
import { TextInput, Text, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, View } from "react-native";
import { Image } from 'expo-image';
import { images } from "@/assets/images";
import { useRouter } from "expo-router";

export default function Signup() {
  const { signIn } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = () => {
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

    setError('');
    signIn();
    setLoading(false);
  }
  
  return (
    <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', padding: 8 }}>

      <View style={{ alignItems: 'center', marginBottom: 32 }}>
        <Image
          source={images.logo}
          style={{ width: 310, height: 80 }}
        />
      </View>

      <Text style={{ fontWeight: 'bold' }}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder='Email'
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
        secureTextEntry
        placeholder='Password'
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