import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import MovieCard from "../components/MovieCard";
import { colors } from "../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch("http://192.168.0.24:3000/favorites", {
       headers:{
         Authorization: token || '',
       }
      });
      const data = await response.json();
    
      setFavorites(data);
    } catch (error) {
      console.log("Greška pri dohvatanju favorita:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFavorite = async (id: string) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://192.168.0.24:3000/favorites/${id}`, {
        method: "DELETE",
       headers:{
         Authorization: token || '',
       }
        

      });
      setFavorites(favorites.filter((favorite) => favorite._id !== id));
    } catch (error) {
      console.log("greška pri brisanju filma:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>

<Text style={styles.headerLabel}>TVOJI FAVORITI</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {favorites.length === 0 && (
          <Text style={styles.emptyText}>Nemaš još sačuvanih favorita</Text>
        )}

        {favorites.map((favorite) => (
          <MovieCard
            key={favorite._id}
            title={favorite.title}
            rating={favorite.rating}
            posterPath={favorite.posterPath}
            onPress={() => {}}
            onDelete={() => {
              deleteFavorite(favorite._id);
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 15,
    color: colors.textSecondary,
    marginTop: 40,
  },

  headerLabel: {
  color: colors.textSecondary,
  fontSize: 11,
  letterSpacing: 0.5,
  paddingHorizontal: 16,
  marginBottom: 16,
},
});