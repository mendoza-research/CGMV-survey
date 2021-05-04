import { ApolloClient, InMemoryCache } from "@apollo/client";

export default function createApolloClient() {
  return new ApolloClient({
    uri: "https://cgmv-hasura.roundpool.com/v1/graphql",
    cache: new InMemoryCache(),
  });
}
