import { UserGetQuery } from "../../../gql/graphql";

export type User = UserGetQuery["userGet"];
