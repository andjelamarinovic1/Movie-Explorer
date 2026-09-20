import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Text,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
}

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // "pamtimo" listu filmova - počinje prazna, punimo je kad API odgovori
  const [movies, setMovies] = useState<Movie[]>([]);

  // "pamtimo" da li se još uvijek učitava - počinje true (učitava se)
  const [loading, setLoading] = useState(true);

  // izvrši se JEDNOM, čim se ekran prvi put prikaže
  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      fetchMovies();
      return;
    }

    const timer = setTimeout(() => {
      searchMovies(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchMovies = async () => {
    try {
      // šaljemo zahtjev ka TMDB-u i čekamo odgovor
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
      );
      const data = await response.json();
      // upisujemo dobijene filmove u state - ekran se automatski osvježi
      setMovies(data.results);
    } catch (error) {
      // ako nešto pukne (npr. nema interneta), hvatamo grešku ovdje
      console.log("Greška pri dohvatanju filmova:", error);
    } finally {
      // izvrši se uvijek na kraju, bilo da je uspjelo ili ne
      setLoading(false);
    }
  };

  // dok se učitava, prikaži spinner umjesto prazne liste
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const searchMovies = async (query: string) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}&query=${query}`,
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.log("Greška pri pretrazi:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.favoritesButton}
        onPress={() => navigation.navigate("Favorites")}
      >
        <Text style={styles.favoritesButtonText}>Moji Favoriti</Text>
      </Pressable>
      <TextInput
        style={styles.searchInput}
        placeholder="Pretraži filmove..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {movies.length === 0 && searchQuery.trim() !== "" && (
          <Text style={styles.noResults}>
            Nema rezultata za "{searchQuery}"
          </Text>
        )}
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            rating={movie.vote_average}
            posterPath={movie.poster_path}
            onPress={() => navigation.navigate("Detail", { movie })}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },

  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginBottom: 12,
    fontSize: 16,
  },

  noResults: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 40,
  },

  favoritesButton: {
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 8,
  },
  favoritesButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
