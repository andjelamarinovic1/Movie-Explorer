import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { colors } from "../theme";
import { Ionicons } from "@expo/vector-icons";

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

    <View style={styles.info}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.rating}>{rating}</Text>
    </View>

    {onDelete && (
      <Pressable style={styles.deleteButton} onPress={onDelete}>
        <Ionicons name="trash-outline" size={18} color={colors.textSecondary} />
      </Pressable>
    )}
  </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  rating: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 4,
  },
  poster: {
    width: 80,
    height: 120,
  },
    info: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 12,
  },

  deleteButton: {
  padding: 8,

},
});
