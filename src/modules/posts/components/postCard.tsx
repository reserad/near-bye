import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Theme } from "../../../shared/theme";
import { formatDate } from "../../feed/utils/formatDate";
import { VoteButton, VoteButtonType } from "../../feed/components/voteButton";
import { VoteType } from "../../../gql/graphql";
import { Post } from "../types/post";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PostBody } from "../types/post-body";
import FastImage from "react-native-fast-image";

export type CardProps = {
  item: Post;
  onClick?(): void;
  onVote(payload: VotePayload): void;
  onShowImageModal(imageUris: string[], index: number): void;
};

export type VotePayload = {
  postId: string;
  voteType: VoteType;
};

export const PostCard = ({
  item,
  onClick,
  onVote,
  onShowImageModal,
}: CardProps) => {
  const { body, author, score, createdAt, userVoteStatus, comments } = item;
  const { text, imageUrls }: PostBody = JSON.parse(body);
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onClick}
      disabled={!!!onClick}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.authorPicture}>
            {author.profileImage ? (
              <FastImage
                source={{
                  uri: author.profileImage,
                }}
                style={styles.authorPicture}
              />
            ) : null}
          </View>
          <Text>{author.name}</Text>
          <Text> . {formatDate(createdAt)}</Text>
        </View>

        <View style={styles.bodyContainer}>
          <Text style={styles.bodyText}>{text}</Text>
          {imageUrls && imageUrls.length > 0 ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}>
              {imageUrls.map((uri, index) => {
                return (
                  <TouchableOpacity
                    key={uri}
                    style={{
                      width: imageUrls.length > 1 ? 160 : 320,
                      height: imageUrls.length > 1 ? 160 : 320,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => onShowImageModal(imageUrls, index)}>
                    <View>
                      <FastImage
                        source={{
                          uri,
                        }}
                        style={{
                          borderRadius: Theme.padding.P3,
                          width: imageUrls.length > 1 ? 150 : 300,
                          height: imageUrls.length > 1 ? 150 : 300,
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.vote}>
            <VoteButton
              type={VoteButtonType.UP}
              status={userVoteStatus}
              onPress={() =>
                onVote({ postId: item.id, voteType: VoteType.Upvote })
              }
            />
            <View style={styles.scoreContainer}>
              <Text>{score}</Text>
            </View>
            <VoteButton
              type={VoteButtonType.DOWN}
              status={userVoteStatus}
              onPress={() =>
                onVote({ postId: item.id, voteType: VoteType.Downvote })
              }
            />
          </View>
          <View style={styles.commentContainer}>
            <MaterialCommunityIcons
              name="comment-outline"
              size={20}
              color={Theme.color.darkGray}
            />
            <Text style={styles.commentCount}>{comments.length}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: 250,
    padding: Theme.padding.P4,
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
  bodyText: {
    marginBottom: Theme.padding.P2,
  },
  bodyContainer: {
    flex: 1,
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
  footerContainer: {
    flexDirection: "row",
    marginTop: Theme.padding.P2,
  },
  vote: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.color.lightGray,
    borderRadius: Theme.padding.P3,
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
  commentContainer: {
    width: Theme.padding.P14,
    height: Theme.padding.P10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: Theme.padding.P2,
    backgroundColor: Theme.color.lightGray,
    borderRadius: Theme.padding.P3,
  },
  commentCount: {
    color: Theme.color.darkGray,
    marginStart: Theme.padding.P1,
  },
});
