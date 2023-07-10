import { Comment } from "../types/comment";

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
        authorId: item.authorId,
        body: item.body,
        parentId: item.parentId,
        id: item.id,
        children,
        createdAt: item.createdAt,
      };
    });
  return data;
};

export const flatten = (data: TreeNode[]): Comment[] =>
  data.flatMap(
    ({
      __typename,
      authorId,
      body,
      children,
      createdAt,
      id,
      parentId,
    }: TreeNode) => [
      { __typename, authorId, body, createdAt, id, parentId },
      ...flatten(children || []),
    ],
  );

export type TreeNode = {
  __typename: "Comment";
  id: string;
  parentId: string | null;
  authorId: string;
  body: string;
  children: TreeNode[];
  createdAt: string;
};
