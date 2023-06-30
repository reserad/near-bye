import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Theme } from "../../../shared/theme";
import { Post } from "../../../store/post/types/post";
import { formatDate } from "../utils/formatDate";

export type CardProps = {
  post: Post;
  onClick(): void;
};

export const Card = ({ post, onClick }: CardProps) => {
  const { id, body, author, createdAt } = post;
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onClick}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.authorPicture}></View>
          <Text>{author.phoneNumber}</Text>
          <Text> . {formatDate(createdAt)}</Text>
        </View>

        <View style={styles.bodyContainer}>
          <Text style={styles.body}>{body}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 250,
    padding: Theme.padding.P3,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: Theme.color.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  title: {
    fontSize: Theme.fontSize.medium,
    flex: 1,
    flexWrap: "wrap",
  },
  body: {},
  bodyContainer: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: Theme.color.purpleDesaturated,
    padding: Theme.padding.P3,
  },
  authorPicture: {
    backgroundColor: Theme.color.purple,
    height: Theme.padding.P10,
    width: Theme.padding.P10,
    borderRadius: Theme.padding.P5,
    marginEnd: Theme.padding.P3,
  },
  author: {},
  header: {
    flexDirection: "row",
    marginBottom: Theme.padding.P3,
    alignItems: "center",
  },
});
