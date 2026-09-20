import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import MovieCard from "../components/MovieCard";

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await fetch("http://192.168.0.24:3000/favorites");
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
    const response = await fetch(`http://192.168.0.24:3000/favorites/${id}`, {
      method: "DELETE",
    });
    setFavorites(favorites.filter((favorite) => favorite._id !== id));
  } catch (error) {
    console.log("greška pri brisanju filma:", error);
  }
};
  

  return (
    <View style={styles.container}>
      <ScrollView>
        {favorites.length === 0 && <Text>Nemaš još sačuvanih favorita</Text>}

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
    padding: 20,
  },
});
