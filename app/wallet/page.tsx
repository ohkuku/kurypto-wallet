'use client';

import { useLazyQuery } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import {
  GET_ALL_WALLETS,
  GET_CURRENT_NETWORK,
  GET_SUPPORTED_NETWORKS,
  GET_CURRENT_WALLET,
  GET_TOKEN_DETAILS,
  GET_TOKEN_BALANCE,
} from '@/graphql/query/queries.gql';
import {
  CreateWalletMutation,
  GetAllWalletsQuery,
  GetCurrentNetworkQuery,
  GetCurrentWalletQuery,
  GetCurrentWalletQueryVariables,
  GetSupportedNetworksQuery,
  GetTokenBalanceQuery,
  GetTokenBalanceQueryVariables,
  GetTokenDetailsQuery,
  GetTokenDetailsQueryVariables,
  ImportWalletMutation,
  ImportWalletMutationVariables,
  SelectNetworkMutation,
  SelectNetworkMutationVariables,
  SelectWalletMutation,
  SelectWalletMutationVariables,
  SupportedNetwork,
} from '@/graphql/types/client-types/graphql';
import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { useMutation } from '@apollo/client';
import {
  CREATE_WALLET,
  IMPORT_WALLET,
  SELECT_NETWORK,
  SELECT_WALLET,
} from '@/graphql/query/mutations.gql';
import { Button } from '@nextui-org/button';
import { useClipboard } from '@nextui-org/use-clipboard';
import { Input } from '@nextui-org/input';

export default function WalletPage() {
  const { copy } = useClipboard();
  const {
    isOpen: isWalletDetailDialogOpen,
    onOpen: onWalletDetailDialogOpen,
    onOpenChange: onWalletDetailDialogOpenChange,
  } = useDisclosure();
  const {
    isOpen: isImportWalletDialogOpen,
    onOpen: onImportWalletDialogOpen,
    onOpenChange: onImportWalletDialogOpenChange,
  } = useDisclosure();
  const [tokenAddress, setTokenAddress] = useState('');
  const [walletPrivateKey, setWalletPrivateKey] = useState('');

  const { data: supportNetworksData } =
    useSuspenseQuery<GetSupportedNetworksQuery>(GET_SUPPORTED_NETWORKS);

  const { data: currentNetworkData, refetch: refetchCurrentNetwork } =
    useSuspenseQuery<GetCurrentNetworkQuery>(GET_CURRENT_NETWORK);

  const { data: allWalletsData, refetch: refetchAllWallets } =
    useSuspenseQuery<GetAllWalletsQuery>(GET_ALL_WALLETS);

  const [queryCurrentWallet, { data: currentWalletData }] = useLazyQuery<
    GetCurrentWalletQuery,
    GetCurrentWalletQueryVariables
  >(GET_CURRENT_WALLET);

  const [queryTokenDetails, { data: tokenDetailsData }] = useLazyQuery<
    GetTokenDetailsQuery,
    GetTokenDetailsQueryVariables
  >(GET_TOKEN_DETAILS);

  const [queryTokenBalance, { data: tokenBalanceData }] = useLazyQuery<
    GetTokenBalanceQuery,
    GetTokenBalanceQueryVariables
  >(GET_TOKEN_BALANCE);

  const [createWallet] = useMutation<CreateWalletMutation>(CREATE_WALLET, {
    onCompleted: refetchAllWallets,
  });

  const [importWallet] = useMutation<
    ImportWalletMutation,
    ImportWalletMutationVariables
  >(IMPORT_WALLET, {
    onCompleted: refetchAllWallets,
  });

  const [selectNetwork] = useMutation<
    SelectNetworkMutation,
    SelectNetworkMutationVariables
  >(SELECT_NETWORK, {
    onCompleted: refetchCurrentNetwork,
  });

  const [selectWallet] = useMutation<
    SelectWalletMutation,
    SelectWalletMutationVariables
  >(SELECT_WALLET, {
    onCompleted: async () => {
      await queryCurrentWallet();
      await onWalletDetailDialogOpen();
    },
  });

  const supportedNetworkDropdownSelectedKeys: SupportedNetwork[] = [];
  if (currentNetworkData?.getCurrentNetwork) {
    supportedNetworkDropdownSelectedKeys.push(
      currentNetworkData.getCurrentNetwork
    );
  }

  return (
    <>
      <div className="flex justify-around items-center w-full">
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
        <Button color="danger" onClick={() => onImportWalletDialogOpen()}>
          Import Wallet
        </Button>
        <Button color="primary" onClick={() => createWallet()}>
          Create Wallet
        </Button>
      </div>
      <div className="flex-grow overflow-y-auto">
        {allWalletsData.getAllWallets.map((wallet) => (
          <Card key={wallet.address} className="mx-auto my-4 w-full w-[90%]">
            <CardBody className="flex flex-col gap-4">
              <p>Wallet Address:</p>
              <p className="p-2">{wallet.address}</p>
              <Button onClick={() => copy(wallet.privateKey)}>
                Copy Private Key
              </Button>
              <Button
                onClick={() =>
                  selectWallet({
                    variables: {
                      walletAddress: wallet.address,
                    },
                  })
                }
                color="success"
              >
                Open
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
      <Modal
        isOpen={isImportWalletDialogOpen}
        onOpenChange={onImportWalletDialogOpenChange}
      >
        <ModalContent>
          {(onImportWalletDialogClose) => {
            return (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Import Wallet
                </ModalHeader>
                <ModalBody className="pb-20">
                  <Input
                    isClearable
                    fullWidth
                    size="lg"
                    placeholder="Wallet Private Key"
                    value={walletPrivateKey}
                    onChange={(e) => setWalletPrivateKey(e.target.value)}
                  />
                  <Button
                    color="primary"
                    onClick={async () => {
                      await importWallet({
                        variables: {
                          privateKey: walletPrivateKey,
                        },
                      });
                      await onImportWalletDialogClose();
                    }}
                  >
                    Import
                  </Button>
                </ModalBody>
                <ModalFooter />
              </>
            );
          }}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isWalletDetailDialogOpen}
        onOpenChange={onWalletDetailDialogOpenChange}
      >
        <ModalContent>
          {(onWalletDetailDialogClose) => {
            if (!currentWalletData?.getCurrentWallet)
              onWalletDetailDialogClose();
            const currentWallet = currentWalletData!.getCurrentWallet!;
            return (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {`Wallet ${currentWallet.address.slice(0, 8)}`}
                </ModalHeader>
                <ModalBody className="pb-20">
                  <Input
                    isClearable
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Token Address"
                    value={tokenAddress}
                    onChange={(e) => setTokenAddress(e.target.value)}
                  />
                  <Button
                    color="primary"
                    onClick={() =>
                      Promise.all([
                        queryTokenBalance({
                          variables: {
                            tokenAddress: tokenAddress,
                            walletAddress: currentWallet.address,
                          },
                        }),
                        queryTokenDetails({
                          variables: {
                            tokenAddress: tokenAddress,
                          },
                        }),
                      ])
                    }
                  >
                    Check Token Details
                  </Button>
                  {tokenDetailsData && (
                    <div>
                      <p>Name: {tokenDetailsData.getTokenDetails.name}</p>
                      <p>Symbol: {tokenDetailsData.getTokenDetails.symbol}</p>
                      <p>
                        Decimals: {tokenDetailsData.getTokenDetails.decimals}
                      </p>
                    </div>
                  )}
                  {tokenBalanceData && (
                    <div>
                      <p>
                        Balance:{' '}
                        {BigInt(
                          tokenBalanceData.getTokenBalance.balance
                        ).toString()}
                      </p>
                    </div>
                  )}
                </ModalBody>
                <ModalFooter />
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
}
