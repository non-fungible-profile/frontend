/// <reference types="react-scripts" />

interface Window {
  ethereum?: {
    isMetaMask?: true
    on?: (...args: any[]) => void
    removeListener?: (...args: any[]) => void
    request?: (args: EthereumProviderRequestArguments) => Promise<unknown>
  }
  web3?: {}
}
