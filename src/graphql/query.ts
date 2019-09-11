import gql from "graphql-tag";

export const productsFilter = gql`
  query ProductsFilter(
    $names: [String]!
    $dateStart: Float!
    $dateEnd: Float!
  ) {
    ProductsFilter(names: $names, dateStart: $dateStart, dateEnd: $dateEnd) {
      productName
      date
      inventoryLevel
    }
  }
`;

export const productsView = gql`
  query ProductsView($names: [String]!) {
    ProductsView(names: $names) {
      productName
      date
      inventoryLevel
    }
  }
`;

export const allProductsName = gql`
  query {
    products {
      productName
    }
  }
`;
