import {gql} from "@apollo/client";

export const walletSchema = gql`
    type Wallet {
        address: String!
        privateKey: String!
    }

    enum SupportedNetwork {
        Ethereum,
        Optimism,
    }

    type TokenDetails {
        name: String!
        symbol: String!
        decimals: Int!
    }

    type TokenBalance {
        balance: String!
    }

    type Query {
        getAllWallets: [Wallet!]!
        getCurrentWallet: Wallet!

        getSupportedNetworks: [SupportedNetwork!]!
        getCurrentNetwork: SupportedNetwork!

        getTokenDetails(tokenAddress: String!): TokenDetails!
        getTokenBalance(walletAddress: String!, tokenAddress: String!): TokenBalance!
    }

    type Mutation {
        createWallet: Wallet!
        importWallet(privateKey: String!): Wallet!

        selectNetwork(network: SupportedNetwork!): SupportedNetwork!
        selectWallet(walletAddress: String!): Wallet!
    }

`;
