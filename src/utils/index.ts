import { BigNumber } from '@ethersproject/bignumber'
import { getAddress } from '@ethersproject/address'

export function getExplorerLink(data: string, type: 'transaction' | 'token' | 'address' | 'block'): string {
  const prefix = 'https://rinkeby.etherscan.io'

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`
    }
    case 'token': {
      return `${prefix}/token/${data}`
    }
    case 'block': {
      return `${prefix}/block/${data}`
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`
    }
  }
}

export function shortenAddress(address: string, chars = 4): string {
  const parsed = getAddress(address)
  if (!parsed) throw Error(`Invalid 'address' parameter '${address}'.`)
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

export function addMarginToGasEstimation(gas: BigNumber): BigNumber {
  return gas.add(gas.mul(5).div(100))
}
