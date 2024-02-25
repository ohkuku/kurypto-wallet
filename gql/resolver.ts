import {Resolvers} from "@/gql/resolver-types";
import {InMemoryCache} from "@apollo/client";
import {
    GetAllWalletsQuery,
    GetCurrentNetworkQuery,
    GetCurrentWalletQuery,
    GetTokenDetailsQuery,
    GetTokenDetailsQueryVariables,
    SupportedNetwork,
} from "@/gql/client-types/graphql";
import {GET_ALL_WALLETS, GET_CURRENT_NETWORK, GET_TOKEN_DETAILS, GET_WALLET_INFO} from "@/gql/query/queries.gql";
import {createWallet, getProvider, getTokenBalance, getTokenDetails, importWalletFromPrivateKey} from "@/sdk/wallet";
import {SupportedNetworks} from "@/sdk/supported-networks";

export const resolvers: Resolvers<{
    cache: InMemoryCache
}> = {
    Query: {
        getCurrentWallet: (_, __, {cache}) => {
            const queryResult = cache.readQuery<GetCurrentWalletQuery>({
                query: GET_WALLET_INFO,
            });
            if (!queryResult?.getCurrentWallet) throw new Error('Wallet is not found in cache');
            return queryResult.getCurrentWallet;
        },
        getAllWallets: (_, __, {cache}) => {
            const queryResult = cache.readQuery<GetAllWalletsQuery>({query: GET_ALL_WALLETS});
            return queryResult?.getAllWallets || [];
        },
        getSupportedNetworks: () => Object.values(SupportedNetwork),
        getCurrentNetwork: (_, __, {cache}) => {
            const queryResult = cache.readQuery<GetCurrentNetworkQuery>({
                query: GET_CURRENT_NETWORK,
            });

            let currentNetwork = queryResult?.getCurrentNetwork;
            if (currentNetwork) return currentNetwork;

            currentNetwork = Object.values(SupportedNetwork)[0];
            cache.writeQuery<GetCurrentNetworkQuery>({
                query: GET_CURRENT_NETWORK,
                data: {
                    getCurrentNetwork: currentNetwork,
                },
            });

            return currentNetwork;
        },
        getTokenDetails: async (_, {tokenAddress}, {cache}) => {
            const queryTokenDetailsResult = cache.readQuery<GetTokenDetailsQuery, GetTokenDetailsQueryVariables>({
                query: GET_TOKEN_DETAILS, variables: {
                    tokenAddress
                }
            });

            let tokenDetails = queryTokenDetailsResult?.getTokenDetails;
            if (tokenDetails) return tokenDetails;

            const queryCurrentNetworkResult = cache.readQuery<GetCurrentNetworkQuery>({
                query: GET_CURRENT_NETWORK,
            });
            if (!queryCurrentNetworkResult?.getCurrentNetwork) throw new Error("Please specify blockchain network");

            const provider = getProvider(queryCurrentNetworkResult.getCurrentNetwork as unknown as SupportedNetworks)
            tokenDetails = await getTokenDetails(tokenAddress, provider);

            cache.writeQuery<GetTokenDetailsQuery, GetTokenDetailsQueryVariables>({
                query: GET_TOKEN_DETAILS, variables: {
                    tokenAddress
                },
                data: {
                    getTokenDetails: tokenDetails,
                }
            });

            return tokenDetails;
        },
        getTokenBalance: async (_, {tokenAddress, walletAddress}, {cache}) => {
            const queryCurrentNetworkResult = cache.readQuery<GetCurrentNetworkQuery>({
                query: GET_CURRENT_NETWORK,
            });
            if (!queryCurrentNetworkResult?.getCurrentNetwork) throw new Error("Please specify blockchain network");

            const provider = getProvider(queryCurrentNetworkResult.getCurrentNetwork as unknown as SupportedNetworks);
            const balance = await getTokenBalance(tokenAddress, walletAddress, provider);
            return {
                balance: balance.balance.toString(),
            };
        },
    },
    Mutation: {
        createWallet: (_, __, {cache}) => {
            const wallet = createWallet();
            const existingWalletsQuery = cache.readQuery<GetAllWalletsQuery>({
                query: GET_ALL_WALLETS,
            });

            const existingWallets = existingWalletsQuery?.getAllWallets || [];
            const updatedWallets = [...existingWallets, wallet];

            cache.writeQuery<GetAllWalletsQuery>({
                query: GET_ALL_WALLETS,
                data: {getAllWallets: updatedWallets},
            });
            return wallet;
        },
        importWallet: (_, {privateKey}, {cache}) => {
            const wallet = importWalletFromPrivateKey(privateKey);
            const existingWalletsQuery = cache.readQuery<GetAllWalletsQuery>({
                query: GET_ALL_WALLETS,
            });

            const existingWallets = existingWalletsQuery?.getAllWallets || [];
            const updatedWallets = [...existingWallets, wallet];

            cache.writeQuery({
                query: GET_ALL_WALLETS,
                data: {wallets: updatedWallets},
            });

            return wallet;
        },
        selectNetwork: (_, {network}, {cache}) => {
            cache.writeQuery<GetCurrentNetworkQuery>({
                query: GET_CURRENT_NETWORK,
                data: {
                    getCurrentNetwork: network,
                },
            });
            return network;
        },
        selectWallet: (_, {walletAddress}, {cache}) => {
            const existingWalletsQuery = cache.readQuery<GetAllWalletsQuery>({
                query: GET_ALL_WALLETS,
            });

            const wallet = existingWalletsQuery?.getAllWallets.find(
                _ => _.address === walletAddress
            )

            if (!wallet) throw new Error('Wallet is not found in cache');

            cache.writeQuery<GetCurrentWalletQuery>({
                query: GET_WALLET_INFO,
                data: {getCurrentWallet: wallet},
            });

            return wallet;
        },
    },
};
