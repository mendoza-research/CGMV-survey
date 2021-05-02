import "styles/globals.scss";
import { ApolloProvider } from "@apollo/client/react";
import createApolloClient from "lib/apollo-client";

const client = createApolloClient();

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
