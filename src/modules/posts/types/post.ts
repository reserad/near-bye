import { PostGetQuery } from "../../../gql/graphql";
import { ArrayChildType } from "../../../shared/types/arrayChildType";

export type Post = ArrayChildType<PostGetQuery["postGet"]>;
