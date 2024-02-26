import { gql } from '@apollo/client';

export const GET_WALLET_INFO = gql`
  query GetCurrentWallet {
    getCurrentWallet @client {
      address
      privateKey
    }
  }
`;

export const GET_ALL_WALLETS = gql`
  query GetAllWallets {
    getAllWallets @client {
      address
      privateKey
    }
  }
`;

export const GET_SUPPORTED_NETWORKS = gql`
  query GetSupportedNetworks {
    getSupportedNetworks @client
  }
`;

export const GET_CURRENT_NETWORK = gql`
  query GetCurrentNetwork {
    getCurrentNetwork @client
  }
`;

export const GET_TOKEN_DETAILS = gql`
  query GetTokenDetails($tokenAddress: String!) {
    getTokenDetails(tokenAddress: $tokenAddress) @client {
      name
      symbol
      decimals
    }
  }
`;

export const GET_TOKEN_BALANCE = gql`
  query GetTokenBalance($walletAddress: String!, $tokenAddress: String!) {
    getTokenBalance(
      walletAddress: $walletAddress
      tokenAddress: $tokenAddress
    ) @client {
      balance
    }
  }
`;
