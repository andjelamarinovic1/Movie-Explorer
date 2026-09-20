import { View, Text, StyleSheet, Pressable, Image } from "react-native";

interface MovieCardProps {
  title: string;
  rating: number;
  posterPath: string;
  onDelete?: () => void;

  onPress: () => void;
}

export default function MovieCard({
  title,
  rating,
  posterPath,
  onPress,
  onDelete,
}: MovieCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w200${posterPath}` }}
        style={styles.poster}
      />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.rating}>{rating}</Text>

      {onDelete && (
        <Pressable onPress={onDelete}>
          <Text>Obriši film</Text>
        </Pressable>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  rating: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  poster: {
    width: 80,
    height: 120,
  },
});
