import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Theme } from "../../../shared/theme";
import { formatDate } from "../utils/formatDate";
import { FeedItem } from "../../../store/feed/types/feed";
import { VoteButton, VoteButtonType } from "./voteButton";
import { VoteType } from "../../../gql/graphql";

export type CardProps = {
  item: FeedItem;
  onClick(): void;
  onVote(payload: VotePayload): void;
};

export type VotePayload = {
  postId: string;
  voteType: VoteType;
};

export const Card = ({ item, onClick, onVote }: CardProps) => {
  const { body, upvotes, downvotes, authorName, createdAt, userVoteStatus } =
    item;
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onClick}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.authorPicture}></View>
          <Text>{authorName}</Text>
          <Text> . {formatDate(createdAt)}</Text>
        </View>

        <View style={styles.bodyContainer}>
          <Text style={styles.body}>{body}</Text>
        </View>
        <View style={styles.footer}>
          <VoteButton
            type={VoteButtonType.UP}
            status={userVoteStatus}
            onPress={() =>
              onVote({ postId: item.id, voteType: VoteType.Upvote })
            }
          />
          <View style={styles.scoreContainer}>
            <Text>{upvotes - downvotes}</Text>
          </View>
          <VoteButton
            type={VoteButtonType.DOWN}
            status={userVoteStatus}
            onPress={() =>
              onVote({ postId: item.id, voteType: VoteType.Downvote })
            }
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 250,
    padding: Theme.padding.P4,
    borderRadius: Theme.padding.P2,
    marginBottom: Theme.padding.P5,
    backgroundColor: Theme.color.white,
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
    borderRadius: Theme.padding.P2,
    backgroundColor: Theme.color.purpleDesaturated,
    padding: Theme.padding.P4,
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
  footer: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: Theme.padding.P2,
  },
  upvoteButton: {
    marginRight: Theme.padding.P2,
  },
  scoreContainer: {
    marginHorizontal: Theme.padding.P2,
    width: Theme.padding.P10,
    justifyContent: "center",
    alignItems: "center",
  },
});
