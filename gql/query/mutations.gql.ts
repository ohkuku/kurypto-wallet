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
