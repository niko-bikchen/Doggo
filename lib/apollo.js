import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

const Apollo = () => {
  const client = new ApolloClient({
    uri: "https://doggo.co.ua/graphql",
    cache: new InMemoryCache(),
  });

  return client;
};

const ApolloProtected = (token) => {
  const link = createHttpLink({
    uri: "/graphql",
  });
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache(),
  });

  return client;
};

const ApolloUploadImg = () => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createUploadLink({
      uri: "https://doggo.co.ua/graphql",
    }),
  });

  return client;
};

export default Apollo();
export { ApolloProtected, ApolloUploadImg };
