import { View, Text, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { colors } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect , useState } from "react";

type DetailScreenRouteProp = RouteProp<RootStackParamList, "Detail">;

export default function DetailScreen() {
  const route = useRoute<DetailScreenRouteProp>();
  const { movie } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState<string | null>(null);

  const addToFavorites = async () => {
    try {

      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://192.168.0.24:3000/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          'Authorization': token || '', },
        body: JSON.stringify({
          movieId: movie.id,
          title: movie.title,
          posterPath: movie.poster_path,
          rating: movie.vote_average,
        }),
      });
      const savedFavorite = await response.json();
      setIsFavorite(true);
    } catch (error) {
      console.log('Greška:', error);
    }
  };



const checkIfFavorite = async () => {

  try{

    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`http://192.168.0.24:3000/favorites/check/${movie.id}`, {
        method: 'GET',
        headers: { 
          'Authorization': token || '', },
      
      });

      const data = await response.json();
      setIsFavorite(data.isFavorite);
      setFavoriteId(data.favoriteId);


  }catch (error) {

    console.log(error);

  }
}

useEffect(() => {

  checkIfFavorite();
}, []);

const toggleFavorite = async () => {
  const token = await AsyncStorage.getItem('token');

  if (isFavorite) {
    

  await fetch(`http://192.168.0.24:3000/favorites/${favoriteId}`, {
    method: 'DELETE',
    headers: { Authorization: token || '' },
  });
  setIsFavorite(false);


  } else {
   await addToFavorites();
  }
};


  return (
    <ScrollView style={styles.container}>
      <View>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.poster}
        />
        <Pressable style={styles.favoriteFloatingButton} onPress={toggleFavorite}>
          <Ionicons name={isFavorite ?  "heart" : "heart-outline"} size={20} color={colors.primary} />
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{movie.title}</Text>

        <View style={styles.metaRow}>
          <View style={styles.ratingPill}>
            <Ionicons name="star" size={13} color={colors.primary} />
            <Text style={styles.ratingText}>{movie.vote_average}</Text>
          </View>
          <Text style={styles.releaseDate}>{movie.release_date}</Text>
        </View>

        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  poster: {
  width: "100%",
  height: 320,
  borderRadius:32,

},
  favoriteFloatingButton: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(10,14,26,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 21,
    fontWeight: '500',
    color: colors.text,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 10,
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surface,
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 6,
  },
  ratingText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '500',
  },
  releaseDate: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  overview: {
    fontSize: 14,
    lineHeight: 22,
    marginTop: 16,
    color: colors.textSecondary,
  },
});