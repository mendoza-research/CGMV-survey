import type { AppProps } from "next/app";
import "styles/globals.scss";
import { ApolloProvider } from "@apollo/client/react";
import createApolloClient from "lib/apollo-client";

const client = createApolloClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default App;
