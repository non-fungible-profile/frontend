import { AbstractConnector } from '@web3-react/abstract-connector'
import { injected, walletConnect } from '../connectors'
import metamaskLogo from '../assets/metamask-logo.webp'
import walletConnectLogo from '../assets/wallet-connect-logo.png'

export interface WalletInfo {
  connector: AbstractConnector
  name: string
  icon: string
}

export const SUPPORTED_WALLETS: WalletInfo[] = [
  {
    connector: walletConnect,
    name: 'WalletConnect',
    icon: walletConnectLogo,
  },
]
if (window.ethereum) {
  SUPPORTED_WALLETS.push({
    connector: injected,
    name: 'MetaMask',
    icon: metamaskLogo,
  })
}

export const NETWORK_CONTEXT_NAME = 'NETWORK_CONTEXT'

export const MULTICALL_ADDRESS = '0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821'
export const NFP_ADDRESS = '0xB850169DB226994a23968a0f79290AA030553c03'
