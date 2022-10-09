import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cl90gtk3k1kkh01t22th3f852/master",
  cache: new InMemoryCache(),
});
