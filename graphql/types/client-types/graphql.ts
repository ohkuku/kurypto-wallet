/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createWallet: Wallet;
  importWallet: Wallet;
  selectNetwork: SupportedNetwork;
  selectWallet: Wallet;
};


export type MutationImportWalletArgs = {
  privateKey: Scalars['String']['input'];
};


export type MutationSelectNetworkArgs = {
  network: SupportedNetwork;
};


export type MutationSelectWalletArgs = {
  walletAddress: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllWallets: Array<Wallet>;
  getCurrentNetwork: SupportedNetwork;
  getCurrentWallet?: Maybe<Wallet>;
  getSupportedNetworks: Array<SupportedNetwork>;
  getTokenBalance: TokenBalance;
  getTokenDetails: TokenDetails;
};


export type QueryGetTokenBalanceArgs = {
  tokenAddress: Scalars['String']['input'];
  walletAddress: Scalars['String']['input'];
};


export type QueryGetTokenDetailsArgs = {
  tokenAddress: Scalars['String']['input'];
};

export enum SupportedNetwork {
  Ethereum = 'Ethereum',
  Optimism = 'Optimism'
}

export type TokenBalance = {
  __typename?: 'TokenBalance';
  balance: Scalars['String']['output'];
};

export type TokenDetails = {
  __typename?: 'TokenDetails';
  decimals: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
};

export type Wallet = {
  __typename?: 'Wallet';
  address: Scalars['String']['output'];
  privateKey: Scalars['String']['output'];
};

export type CreateWalletMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateWalletMutation = { __typename?: 'Mutation', createWallet: { __typename?: 'Wallet', address: string, privateKey: string } };

export type ImportWalletMutationVariables = Exact<{
  privateKey: Scalars['String']['input'];
}>;


export type ImportWalletMutation = { __typename?: 'Mutation', importWallet: { __typename?: 'Wallet', address: string, privateKey: string } };

export type SelectWalletMutationVariables = Exact<{
  walletAddress: Scalars['String']['input'];
}>;


export type SelectWalletMutation = { __typename?: 'Mutation', selectWallet: { __typename?: 'Wallet', address: string, privateKey: string } };

export type SelectNetworkMutationVariables = Exact<{
  network: SupportedNetwork;
}>;


export type SelectNetworkMutation = { __typename?: 'Mutation', selectNetwork: SupportedNetwork };

export type GetCurrentWalletQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentWalletQuery = { __typename?: 'Query', getCurrentWallet?: { __typename?: 'Wallet', address: string, privateKey: string } | null };

export type GetAllWalletsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllWalletsQuery = { __typename?: 'Query', getAllWallets: Array<{ __typename?: 'Wallet', address: string, privateKey: string }> };

export type GetSupportedNetworksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSupportedNetworksQuery = { __typename?: 'Query', getSupportedNetworks: Array<SupportedNetwork> };

export type GetCurrentNetworkQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentNetworkQuery = { __typename?: 'Query', getCurrentNetwork: SupportedNetwork };

export type GetTokenDetailsQueryVariables = Exact<{
  tokenAddress: Scalars['String']['input'];
}>;


export type GetTokenDetailsQuery = { __typename?: 'Query', getTokenDetails: { __typename?: 'TokenDetails', name: string, symbol: string, decimals: number } };

export type GetTokenBalanceQueryVariables = Exact<{
  walletAddress: Scalars['String']['input'];
  tokenAddress: Scalars['String']['input'];
}>;


export type GetTokenBalanceQuery = { __typename?: 'Query', getTokenBalance: { __typename?: 'TokenBalance', balance: string } };


export const CreateWalletDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateWallet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWallet"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"client"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"privateKey"}}]}}]}}]} as unknown as DocumentNode<CreateWalletMutation, CreateWalletMutationVariables>;
export const ImportWalletDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ImportWallet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"privateKey"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"importWallet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"privateKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"privateKey"}}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"client"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"privateKey"}}]}}]}}]} as unknown as DocumentNode<ImportWalletMutation, ImportWalletMutationVariables>;
export const SelectWalletDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SelectWallet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"walletAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"selectWallet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"walletAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"walletAddress"}}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"client"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"privateKey"}}]}}]}}]} as unknown as DocumentNode<SelectWalletMutation, SelectWalletMutationVariables>;
export const SelectNetworkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SelectNetwork"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"network"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SupportedNetwork"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"selectNetwork"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"network"},"value":{"kind":"Variable","name":{"kind":"Name","value":"network"}}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"client"}}]}]}}]} as unknown as DocumentNode<SelectNetworkMutation, SelectNetworkMutationVariables>;
export const GetCurrentWalletDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentWallet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentWallet"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"client"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"privateKey"}}]}}]}}]} as unknown as DocumentNode<GetCurrentWalletQuery, GetCurrentWalletQueryVariables>;
export const GetAllWalletsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllWallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllWallets"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"client"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"privateKey"}}]}}]}}]} as unknown as DocumentNode<GetAllWalletsQuery, GetAllWalletsQueryVariables>;
export const GetSupportedNetworksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSupportedNetworks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSupportedNetworks"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"client"}}]}]}}]} as unknown as DocumentNode<GetSupportedNetworksQuery, GetSupportedNetworksQueryVariables>;
export const GetCurrentNetworkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentNetwork"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentNetwork"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"client"}}]}]}}]} as unknown as DocumentNode<GetCurrentNetworkQuery, GetCurrentNetworkQueryVariables>;
export const GetTokenDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTokenDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tokenAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTokenDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tokenAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tokenAddress"}}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"client"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}}]}}]}}]} as unknown as DocumentNode<GetTokenDetailsQuery, GetTokenDetailsQueryVariables>;
export const GetTokenBalanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTokenBalance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"walletAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tokenAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTokenBalance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"walletAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"walletAddress"}}},{"kind":"Argument","name":{"kind":"Name","value":"tokenAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tokenAddress"}}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"client"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}}]}}]} as unknown as DocumentNode<GetTokenBalanceQuery, GetTokenBalanceQueryVariables>;