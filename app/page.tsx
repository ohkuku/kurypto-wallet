import React from 'react';
import { Button } from '@nextui-org/button';
import { title } from '@/components/primitives';
import NextLink from 'next/link';
import { siteConfig } from '@/config/site';

export default function Home() {
  const walletHref = siteConfig.navItems.find(
    (_) => _.label === 'Wallet'
  )?.href;

  if (!walletHref) throw Error('');

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className={title()}>🤡</h1>
      <Button radius="full">
        <NextLink href={walletHref}>Go check your wallet</NextLink>
      </Button>
    </section>
  );
}
