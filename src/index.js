import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";

if (process.env.REACT_APP_API_MOCKING === "enabled") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
  rootElement
);
