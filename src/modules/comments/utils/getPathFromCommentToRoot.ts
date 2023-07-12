import { Post } from "../../posts/types/post";
import { Comment } from "../types/comment";

export const getPathFromCommentToRoot = (post: Post, commentId: string) => {
  let currentCommentId = commentId;
  const path: Comment[] = [];
  while (currentCommentId !== null) {
    const comment = post.comments.find(x => x.id === currentCommentId);
    if (comment) {
      path.push(comment);
    }
    currentCommentId = comment.parentId;
  }
  return path.reverse();
};
