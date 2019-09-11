import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";

export const client = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND
});
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <App />
      </ApolloHooksProvider>
    </ApolloProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
