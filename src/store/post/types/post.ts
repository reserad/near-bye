import { PostGetAllQuery } from "../../../gql/graphql";
import { ArrayChildType } from "../../../shared/types/arrayChildType";

export type Post = ArrayChildType<PostGetAllQuery["postGetAll"]>;
