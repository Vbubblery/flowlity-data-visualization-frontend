import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ObjectWithStringKey } from "../interfaces/utils";
describe("First React component test with Enzyme", () => {
  let client: any;
  beforeAll(() => {
    client = new ApolloClient({
      uri: process.env.REACT_APP_BACKEND,
      cache: new InMemoryCache({
        dataIdFromObject: (object: ObjectWithStringKey) => object.key
      })
    });
  });

  it("renders without crashing", () => {
    shallow(<App client={client} />);
  });
});
