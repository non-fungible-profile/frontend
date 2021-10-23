import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '@web3-react/network-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

const INFURA_PROJECT_ID = '0ebf4dd05d6740f482938b8a80860d13'

export const network = new NetworkConnector({
  urls: { 4: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}` },
  defaultChainId: 4,
})

export const injected = new InjectedConnector({
  supportedChainIds: [4],
})

export const walletConnect = new WalletConnectConnector({
  supportedChainIds: [4],
  rpc: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 15000,
})
