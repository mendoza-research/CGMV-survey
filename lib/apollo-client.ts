import { ApolloClient, InMemoryCache } from "@apollo/client";

export default function createApolloClient() {
  return new ApolloClient({
    uri: "http://104.131.99.232/v1/graphql",
    cache: new InMemoryCache(),
  });
}
