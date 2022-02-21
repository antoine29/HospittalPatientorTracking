import { ApolloClient, InMemoryCache } from "@apollo/client";
import { getBackendUrl } from "../tools";

export const client = new ApolloClient({
  //uri: 'http://localhost:4000/',
  uri: getBackendUrl(),
  cache: new InMemoryCache()
});
