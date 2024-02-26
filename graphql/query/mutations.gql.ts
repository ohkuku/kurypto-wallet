import { gql } from '@apollo/client';

export const CREATE_WALLET = gql`
  mutation CreateWallet {
    createWallet @client {
      address
      privateKey
    }
  }
`;

export const IMPORT_WALLET = gql`
  mutation ImportWallet($privateKey: String!) {
    importWallet(privateKey: $privateKey) @client {
      address
      privateKey
    }
  }
`;

export const SELECT_WALLET = gql`
  mutation SelectWallet($walletAddress: String!) {
    selectWallet(walletAddress: $walletAddress) @client {
      address
      privateKey
    }
  }
`;

export const SELECT_NETWORK = gql`
  mutation SelectNetwork($network: SupportedNetwork!) {
    selectNetwork(network: $network) @client
  }
`;
