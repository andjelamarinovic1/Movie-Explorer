import { View, Text, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";

type DetailScreenRouteProp = RouteProp<RootStackParamList, "Detail">;

export default function DetailScreen() {
  const route = useRoute<DetailScreenRouteProp>();
  const { movie } = route.params;

  const addToFavorites = async () => {
  try {
    const response = await fetch('http://192.168.0.24:3000/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        movieId: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        rating: movie.vote_average,
      }),
    });
    const savedFavorite = await response.json();
  } catch (error) {
    console.log('Greška:', error);
  }
};

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{movie.title}</Text>

        <Pressable style={styles.favoriteButton} onPress={addToFavorites}>

          <Text style={styles.favoriteButtonText}> Dodaj u favorite </Text>
          
        </Pressable>
        <Text style={styles.rating}>⭐ {movie.vote_average}</Text>
        <Text style={styles.releaseDate}>
          Datum izlaska: {movie.release_date}
        </Text>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  poster: {
    width: "100%",
    height: 400,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  rating: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
  },
  releaseDate: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  overview: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 16,
  },

  favoriteButton: {
    backgroundColor: '#e91e63',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  favoriteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
