import { User } from "../../../store/user/types/user";

export type TreeNode = {
  __typename: "Comment";
  id: string;
  parentId: string | null;
  author: User;
  body: string;
  children: TreeNode[];
  createdAt: string;
};
