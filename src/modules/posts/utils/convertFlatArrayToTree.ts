import { User } from "../../../store/user/types/user";
import { Comment } from "../../comments/types/comment";

export const convertFlatArrayToNodeTree = (
  items: Comment[],
  id: string = null,
): TreeNode[] => {
  const startingItems = [...items].sort(
    (a, b) => -a.createdAt.localeCompare(b.createdAt),
  );

  const data = startingItems
    .filter(item => item.parentId === id)
    .map((item: Comment): TreeNode => {
      const children = convertFlatArrayToNodeTree(items, item.id).sort(
        (a, b) => -a.createdAt.localeCompare(b.createdAt),
      );
      return {
        __typename: item.__typename,
        author: item.author,
        body: item.body,
        parentId: item.parentId,
        id: item.id,
        children,
        createdAt: item.createdAt,
      };
    });
  return data;
};

export type TreeNode = {
  __typename: "Comment";
  id: string;
  parentId: string | null;
  author: User;
  body: string;
  children: TreeNode[];
  createdAt: string;
};
