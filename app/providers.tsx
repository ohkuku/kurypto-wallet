'use client';

import * as React from 'react';
import { ApolloWrapper } from '@/graphql/apollo-wrapper';
import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { ThemeProvider } from 'next-themes';

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <ApolloWrapper>
      <NextUIProvider navigate={router.push}>
        <ThemeProvider {...themeProps}>{children}</ThemeProvider>
      </NextUIProvider>
    </ApolloWrapper>
  );
}
