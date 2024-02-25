'use client';

import * as React from 'react';
import {ApolloWrapper} from '@/lib/apollo-wrapper';

export interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({children}: ProvidersProps) {
    return (
        <ApolloWrapper>
            {children}
        </ApolloWrapper>

    );
}
