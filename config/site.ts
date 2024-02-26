export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Kurypto Wallet",
	description: "Demo web3 wallet",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
    {
      label: "Wallet",
      href: "/wallet",
    },
	],
	navMenuItems: [
		{
			label: "Wallet",
			href: "/wallet",
		},
	],
};
