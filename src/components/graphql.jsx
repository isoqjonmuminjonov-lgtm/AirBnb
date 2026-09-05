import { setContext } from "@apollo/client/link/context";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const httpLink = createHttpLink({
    uri: "https://react-groups-final-project-backend.onrender.com/graphql",
});

const authLink = setContext((_, { headers }) => {
    const token = JSON.parse(localStorage.getItem("authStore"))?.state?.accessToken || "";

    return {
        headers: { ...headers, authorization: token ? `Bearer ${token}` : "" },
    };
});

export const graphqlClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
