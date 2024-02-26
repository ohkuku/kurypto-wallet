'use client';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import {
  GET_ALL_WALLETS,
  GET_CURRENT_NETWORK,
  GET_SUPPORTED_NETWORKS,
} from '@/graphql/query/queries.gql';
import {
  CreateWalletMutation,
  GetAllWalletsQuery,
  GetCurrentNetworkQuery,
  GetSupportedNetworksQuery,
  SelectNetworkMutation,
  SelectNetworkMutationVariables,
  SupportedNetwork,
} from '@/graphql/types/client-types/graphql';
import React from 'react';
import {
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { useMutation } from '@apollo/client';
import { CREATE_WALLET, SELECT_NETWORK } from '@/graphql/query/mutations.gql';
import { Button } from '@nextui-org/button';
import { useClipboard } from '@nextui-org/use-clipboard';

export default function WalletPage() {
  const { copy } = useClipboard();

  const { data: supportNetworksData } =
    useSuspenseQuery<GetSupportedNetworksQuery>(GET_SUPPORTED_NETWORKS);

  const { data: currentNetworkData, refetch: refetchCurrentNetwork } =
    useSuspenseQuery<GetCurrentNetworkQuery>(GET_CURRENT_NETWORK);

  const { data: allWalletsData, refetch: refetchAllWallets } =
    useSuspenseQuery<GetAllWalletsQuery>(GET_ALL_WALLETS);

  const [createWallet] = useMutation<CreateWalletMutation>(CREATE_WALLET, {
    onCompleted: refetchAllWallets,
  });

  const [selectNetwork] = useMutation<
    SelectNetworkMutation,
    SelectNetworkMutationVariables
  >(SELECT_NETWORK, {
    onCompleted: refetchCurrentNetwork,
  });

  const supportedNetworkDropdownSelectedKeys: SupportedNetwork[] = [];
  if (currentNetworkData?.getCurrentNetwork) {
    supportedNetworkDropdownSelectedKeys.push(
      currentNetworkData.getCurrentNetwork
    );
  }

  return (
    <>
      <div className="flex justify-between items-center w-[90%]">
        <Dropdown>
          <DropdownTrigger>
            <Button>
              {currentNetworkData?.getCurrentNetwork
                ? currentNetworkData.getCurrentNetwork
                : 'Choose network'}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Supported Networks"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={supportedNetworkDropdownSelectedKeys}
            onAction={(key) =>
              selectNetwork({ variables: { network: key as SupportedNetwork } })
            }
          >
            {supportNetworksData.getSupportedNetworks.map((network) => (
              <DropdownItem key={network}>{network}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Button color="primary" onClick={() => createWallet()}>
          Create Wallet
        </Button>
      </div>
      <div className="flex-grow overflow-y-auto">
        {allWalletsData.getAllWallets.map((wallet) => (
          <Card
            key={wallet.address}
            className="mx-auto my-4 w-full w-[90%]"
          >
            <CardBody className="flex flex-col gap-4">
              <p>Wallet Address:</p>
              <p className="p-2">{wallet.address}</p>
              <Button onClick={() => copy(wallet.privateKey)}>
                Copy Private Key
              </Button>
              <Button color="success">Open</Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
}
