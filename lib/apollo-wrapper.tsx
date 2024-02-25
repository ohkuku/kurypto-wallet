'use client';

import {
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    NextSSRApolloClient,
} from '@apollo/experimental-nextjs-app-support/ssr';
import {resolvers} from "@/gql/resolver";
import {walletSchema} from "@/gql/schema/wallet.schema";

function makeClient() {
    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        resolvers: resolvers as any,
        typeDefs: [
            walletSchema,
        ],
    });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    );
}
