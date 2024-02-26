import { ethers } from 'ethers';
import { SupportedNetworks } from '@/sdk/supported-networks';
import erc20Abi from '@/sdk/erc20.abi.json';

interface TokenDetails {
  name: string;
  symbol: string;
  decimals: number;
}

interface TokenBalance {
  balance: ethers.BigNumberish;
}

export const createWallet = (): { address: string; privateKey: string } => {
  const wallet = ethers.Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
  };
};

export const importWalletFromPrivateKey = (
  privateKey: string
): { address: string; privateKey: string } => {
  const wallet = new ethers.Wallet(privateKey);
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
  };
};

export const getProvider = (network: SupportedNetworks) => {
  switch (network) {
    case SupportedNetworks.Ethereum:
      return ethers.getDefaultProvider();
    case SupportedNetworks.Optimism:
      return new ethers.JsonRpcProvider('https://mainnet.optimism.io');
    default:
      throw new Error(`Unsupported network: ${network}`);
  }
};

export const getTokenDetails = async (
  tokenAddress: string,
  provider: ethers.Provider
): Promise<TokenDetails> => {
  const contract = new ethers.Contract(tokenAddress, erc20Abi, provider);
  const name: string = await contract.name();
  const symbol: string = await contract.symbol();
  const decimals: number = await contract.decimals();

  return { name, symbol, decimals };
};

export const getTokenBalance = async (
  tokenAddress: string,
  userAddress: string,
  provider: ethers.Provider
): Promise<TokenBalance> => {
  const contract = new ethers.Contract(tokenAddress, erc20Abi, provider);
  const balance: ethers.BigNumberish = await contract.balanceOf(userAddress);

  return { balance };
};
