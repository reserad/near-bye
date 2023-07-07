import { FeedGetQuery } from "../../../gql/graphql";
import { ArrayChildType } from "../../../shared/types/arrayChildType";

export type FeedItem = ArrayChildType<FeedGetQuery["feedGet"]>;
