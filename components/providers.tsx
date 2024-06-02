'use client'

import {
  RainbowKitProvider,
  Theme,
  getDefaultConfig,
  lightTheme
} from '@rainbow-me/rainbowkit'
import {
  metaMaskWallet,
  trustWallet,
  walletConnectWallet
} from '@rainbow-me/rainbowkit/wallets'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { merge } from 'lodash'
import { ReactNode } from 'react'


const queryClient = new QueryClient()

export const wagmiConfig = getDefaultConfig({
  appName: 'Test',
  projectId: 'test',
  wallets: [
    {
      groupName: 'Popular',
      wallets: [metaMaskWallet, trustWallet, walletConnectWallet]
    }
  ],
  // @ts-ignore
  chains: [{ ...eosEvmTestnet, fees: undefined }, sepolia]
})

const customRainbowKitTheme = merge(lightTheme(), {
  colors: {
    connectButtonBackground: '#fff',
    connectButtonInnerBackground: '#fff',
    connectButtonText: '#000'
  },
  radii: {
    actionButton: '9999px', // Custom radius for action buttons,
    connectButton: '9999px' // Custom radius for action buttons
  }
} as Theme)

export function Providers({ children }: {children: ReactNode}) {
  return (
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={wagmiConfig}>
            <RainbowKitProvider
              theme={customRainbowKitTheme}
              modalSize="compact"
              showRecentTransactions={true}
              appInfo={{
                appName: 'Test'
              }}
            >
                  {children}

            </RainbowKitProvider>
          </WagmiProvider>
        </QueryClientProvider>
  )
}
