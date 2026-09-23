import { View, Text, StyleSheet, Pressable } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme';
import { Ionicons } from '@expo/vector-icons';


export default function ProfileScreen() {
  const [email, setEmail] = useState('');
  const [favoriteCount, setfavoriteCount] = useState(0);
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate("Login");
    } catch (error) {
      console.log('Neuspješno');
    }
  };

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://192.168.0.24:3000/me`, {
        method: 'GET',
        headers: { Authorization: token || '' },
      });
      const data = await response.json();
      setEmail(data.email);
      setfavoriteCount(data.count);
    } catch (error) {
      console.log('greška');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{email.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.email}>{email}</Text>
      </View>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={18} color="#E24B4A" />
        <Text style={styles.logoutText}>Odjavi se</Text>
      </Pressable>

<View>

  <Text style={styles.logoutText}> Broj favorita je {favoriteCount}</Text>
</View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  avatarText: {
    color: '#1A0D02',
    fontSize: 26,
    fontWeight: '600',
  },
  email: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surface,
    borderWidth: 0.5,
    borderColor: '#E24B4A',
    borderRadius: 12,
    padding: 14,
    justifyContent: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#E24B4A',
    fontSize: 14,
    fontWeight: '500',
  },
});