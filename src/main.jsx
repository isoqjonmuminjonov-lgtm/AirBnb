import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { graphqlClient } from "./components/graphql.jsx";
import { ApolloProvider } from "@apollo/client/react";
import { ToastContainer } from 'react-toastify';

import App from "./App.jsx";


createRoot(document.getElementById("root")).render(
  <ApolloProvider client={graphqlClient}>
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
  </ApolloProvider>

);
