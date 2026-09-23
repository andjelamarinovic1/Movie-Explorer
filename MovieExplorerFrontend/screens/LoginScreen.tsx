import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';


export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.0.24:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      await AsyncStorage.setItem("token", data.token);
      navigation.navigate('Home');
    } catch (error) {
      console.log("Greška", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerText}>
        <Text style={styles.title}>Dobrodošla nazad</Text>
        <Text style={styles.subtitle}>Prijavi se</Text>
      </View>

      <View style={styles.inputGroup}>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={16} color={colors.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.textSecondary}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={16} color={colors.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="Lozinka"
            placeholderTextColor={colors.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>
      </View>

      <Pressable style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Prijavi se</Text>
      </Pressable>

      <Text style={styles.registerText}>
        Nemaš nalog? <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>Registriraj se</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  headerText: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "500",
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 6,
  },
  inputGroup: {
    gap: 12,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.surface,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    paddingVertical: 13,
    fontSize: 14,
    color: colors.text,
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#1A0D02",
    fontSize: 15,
    fontWeight: "600",
  },
  registerText: {
    textAlign: "center",
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 20,
  },
  registerLink: {
    color: colors.primary,
  },
});