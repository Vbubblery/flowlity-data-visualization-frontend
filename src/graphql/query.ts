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
  query ProductsView(
    $names: [String]!
    $dateStart: Float
    $dateEnd: Float
    $level: Int
  ) {
    ProductsView(
      names: $names
      filter: {
        date: { dateStart: $dateStart, dateEnd: $dateEnd }
        level: $level
      }
    ) {
      productId
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
