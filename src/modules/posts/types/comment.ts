import { PostGetQuery } from "../../../gql/graphql";
import { ArrayChildType } from "../../../shared/types/arrayChildType";

export type Comment = ArrayChildType<
  ArrayChildType<PostGetQuery["postGet"]>["comments"]
>;
