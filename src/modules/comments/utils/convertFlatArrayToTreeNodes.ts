import { Comment } from "../types/comment";
import { TreeNode } from "../types/treeNode";

export const convertFlatArrayToTreeNodes = (
  items: Comment[],
  id: string = null,
): TreeNode[] => {
  const startingItems = [...items].sort(
    (a, b) => -a.createdAt.localeCompare(b.createdAt),
  );

  const data = startingItems
    .filter(item => item.parentId === id)
    .map((item: Comment): TreeNode => {
      const children = convertFlatArrayToTreeNodes(items, item.id).sort(
        (a, b) => -a.createdAt.localeCompare(b.createdAt),
      );
      return {
        __typename: item.__typename,
        author: { ...item.author },
        body: item.body,
        parentId: item.parentId,
        id: item.id,
        children,
        createdAt: item.createdAt,
      };
    });
  return data;
};
