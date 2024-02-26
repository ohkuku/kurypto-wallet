/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreateWallet {\n    createWallet @client {\n      address\n      privateKey\n    }\n  }\n": types.CreateWalletDocument,
    "\n  mutation ImportWallet($privateKey: String!) {\n    importWallet(privateKey: $privateKey) @client {\n      address\n      privateKey\n    }\n  }\n": types.ImportWalletDocument,
    "\n  mutation SelectNetwork($network: SupportedNetwork!) {\n    selectNetwork(network: $network) @client\n  }\n": types.SelectNetworkDocument,
    "\n  query GetCurrentWallet {\n    getCurrentWallet @client {\n      address\n      privateKey\n    }\n  }\n": types.GetCurrentWalletDocument,
    "\n  query GetAllWallets {\n    getAllWallets @client {\n      address\n      privateKey\n    }\n  }\n": types.GetAllWalletsDocument,
    "\n  query GetSupportedNetworks {\n    getSupportedNetworks @client\n  }\n": types.GetSupportedNetworksDocument,
    "\n  query GetCurrentNetwork {\n    getCurrentNetwork @client\n  }\n": types.GetCurrentNetworkDocument,
    "\n  query GetTokenDetails($tokenAddress: String!) {\n    getTokenDetails(tokenAddress: $tokenAddress) @client {\n      name\n      symbol\n      decimals\n    }\n  }\n": types.GetTokenDetailsDocument,
    "\n  query GetTokenBalance($walletAddress: String!, $tokenAddress: String!) {\n    getTokenBalance(\n      walletAddress: $walletAddress\n      tokenAddress: $tokenAddress\n    ) @client {\n      balance\n    }\n  }\n": types.GetTokenBalanceDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateWallet {\n    createWallet @client {\n      address\n      privateKey\n    }\n  }\n"): (typeof documents)["\n  mutation CreateWallet {\n    createWallet @client {\n      address\n      privateKey\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ImportWallet($privateKey: String!) {\n    importWallet(privateKey: $privateKey) @client {\n      address\n      privateKey\n    }\n  }\n"): (typeof documents)["\n  mutation ImportWallet($privateKey: String!) {\n    importWallet(privateKey: $privateKey) @client {\n      address\n      privateKey\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SelectNetwork($network: SupportedNetwork!) {\n    selectNetwork(network: $network) @client\n  }\n"): (typeof documents)["\n  mutation SelectNetwork($network: SupportedNetwork!) {\n    selectNetwork(network: $network) @client\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCurrentWallet {\n    getCurrentWallet @client {\n      address\n      privateKey\n    }\n  }\n"): (typeof documents)["\n  query GetCurrentWallet {\n    getCurrentWallet @client {\n      address\n      privateKey\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllWallets {\n    getAllWallets @client {\n      address\n      privateKey\n    }\n  }\n"): (typeof documents)["\n  query GetAllWallets {\n    getAllWallets @client {\n      address\n      privateKey\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSupportedNetworks {\n    getSupportedNetworks @client\n  }\n"): (typeof documents)["\n  query GetSupportedNetworks {\n    getSupportedNetworks @client\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCurrentNetwork {\n    getCurrentNetwork @client\n  }\n"): (typeof documents)["\n  query GetCurrentNetwork {\n    getCurrentNetwork @client\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTokenDetails($tokenAddress: String!) {\n    getTokenDetails(tokenAddress: $tokenAddress) @client {\n      name\n      symbol\n      decimals\n    }\n  }\n"): (typeof documents)["\n  query GetTokenDetails($tokenAddress: String!) {\n    getTokenDetails(tokenAddress: $tokenAddress) @client {\n      name\n      symbol\n      decimals\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTokenBalance($walletAddress: String!, $tokenAddress: String!) {\n    getTokenBalance(\n      walletAddress: $walletAddress\n      tokenAddress: $tokenAddress\n    ) @client {\n      balance\n    }\n  }\n"): (typeof documents)["\n  query GetTokenBalance($walletAddress: String!, $tokenAddress: String!) {\n    getTokenBalance(\n      walletAddress: $walletAddress\n      tokenAddress: $tokenAddress\n    ) @client {\n      balance\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;