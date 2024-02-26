import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createWallet: Wallet;
  importWallet: Wallet;
  selectNetwork: SupportedNetwork;
  selectWallet: Wallet;
};


export type MutationImportWalletArgs = {
  privateKey: Scalars['String']['input'];
};


export type MutationSelectNetworkArgs = {
  network: SupportedNetwork;
};


export type MutationSelectWalletArgs = {
  walletAddress: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllWallets: Array<Wallet>;
  getCurrentNetwork: SupportedNetwork;
  getCurrentWallet?: Maybe<Wallet>;
  getSupportedNetworks: Array<SupportedNetwork>;
  getTokenBalance: TokenBalance;
  getTokenDetails: TokenDetails;
};


export type QueryGetTokenBalanceArgs = {
  tokenAddress: Scalars['String']['input'];
  walletAddress: Scalars['String']['input'];
};


export type QueryGetTokenDetailsArgs = {
  tokenAddress: Scalars['String']['input'];
};

export enum SupportedNetwork {
  Ethereum = 'Ethereum',
  Optimism = 'Optimism'
}

export type TokenBalance = {
  __typename?: 'TokenBalance';
  balance: Scalars['String']['output'];
};

export type TokenDetails = {
  __typename?: 'TokenDetails';
  decimals: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
};

export type Wallet = {
  __typename?: 'Wallet';
  address: Scalars['String']['output'];
  privateKey: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  SupportedNetwork: SupportedNetwork;
  TokenBalance: ResolverTypeWrapper<TokenBalance>;
  TokenDetails: ResolverTypeWrapper<TokenDetails>;
  Wallet: ResolverTypeWrapper<Wallet>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  TokenBalance: TokenBalance;
  TokenDetails: TokenDetails;
  Wallet: Wallet;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createWallet?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType>;
  importWallet?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType, RequireFields<MutationImportWalletArgs, 'privateKey'>>;
  selectNetwork?: Resolver<ResolversTypes['SupportedNetwork'], ParentType, ContextType, RequireFields<MutationSelectNetworkArgs, 'network'>>;
  selectWallet?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType, RequireFields<MutationSelectWalletArgs, 'walletAddress'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllWallets?: Resolver<Array<ResolversTypes['Wallet']>, ParentType, ContextType>;
  getCurrentNetwork?: Resolver<ResolversTypes['SupportedNetwork'], ParentType, ContextType>;
  getCurrentWallet?: Resolver<Maybe<ResolversTypes['Wallet']>, ParentType, ContextType>;
  getSupportedNetworks?: Resolver<Array<ResolversTypes['SupportedNetwork']>, ParentType, ContextType>;
  getTokenBalance?: Resolver<ResolversTypes['TokenBalance'], ParentType, ContextType, RequireFields<QueryGetTokenBalanceArgs, 'tokenAddress' | 'walletAddress'>>;
  getTokenDetails?: Resolver<ResolversTypes['TokenDetails'], ParentType, ContextType, RequireFields<QueryGetTokenDetailsArgs, 'tokenAddress'>>;
};

export type TokenBalanceResolvers<ContextType = any, ParentType extends ResolversParentTypes['TokenBalance'] = ResolversParentTypes['TokenBalance']> = {
  balance?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokenDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['TokenDetails'] = ResolversParentTypes['TokenDetails']> = {
  decimals?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WalletResolvers<ContextType = any, ParentType extends ResolversParentTypes['Wallet'] = ResolversParentTypes['Wallet']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  privateKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  TokenBalance?: TokenBalanceResolvers<ContextType>;
  TokenDetails?: TokenDetailsResolvers<ContextType>;
  Wallet?: WalletResolvers<ContextType>;
};

