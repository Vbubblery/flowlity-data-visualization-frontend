import gql from "graphql-tag";

export const createProductParse = gql`
  mutation createProductParse($productName: String!) {
    createProductParse(productInput: { productName: $productName }) {
      status
      errors
      product {
        productId
        productName
        data {
          date
          inventoryLevel
        }
      }
    }
  }
`;

export const updateProductDataParse = gql`
  mutation updateProductDataParse(
    $productName: String!
    $date: Float!
    $inventoryLevel: Int!
  ) {
    updateProductDataParse(
      productName: $productName
      productUpdateInput: { date: $date, inventoryLevel: $inventoryLevel }
    ) {
      status
      errors
    }
  }
`;

export const deleteDataFromProductParse = gql`
  mutation deleteDataFromProductParse(
    $productId: String
    $productName: String
    $date: Float!
  ) {
    deleteDataFromProductParse(
      productId: $productId
      productName: $productName
      date: $date
    ) {
      status
    }
  }
`;

export const addDataParse = gql`
  mutation addDataParse(
    $productName: String!
    $date: Float!
    $inventoryLevel: Int!
  ) {
    addDataParse(
      productName: $productName
      dataInput: { date: $date, inventoryLevel: $inventoryLevel }
    ) {
      status
      errors
    }
  }
`;
