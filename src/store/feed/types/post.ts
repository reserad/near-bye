import { PostCreateMutation } from "../../../gql/graphql";
import { ArrayChildType } from "../../../shared/types/arrayChildType";

export type Post = ArrayChildType<PostCreateMutation["postCreate"]>;
