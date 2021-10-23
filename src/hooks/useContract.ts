import { Contract, ContractInterface } from '@ethersproject/contracts'
import { useMemo } from 'react'
import { MULTICALL_ADDRESS, NFP_ADDRESS } from '../constants'
import MULTICALL_ABI from '../constants/abis/multicall.json'
import NFP_ABI from '../constants/abis/nfp.json'
import { useActiveWeb3React } from './useActiveWeb3React'

export function useContract(
  address: string | undefined,
  abi: ContractInterface,
  withSignerIfPossible = false
): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !abi || !library) return null
    try {
      return new Contract(address, abi, withSignerIfPossible && account ? library.getSigner(account) : library)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, abi, library, withSignerIfPossible, account])
}

export function useNfpGenesisContract(withSignerIfPossible = false): Contract | null {
  return useContract(NFP_ADDRESS, NFP_ABI, withSignerIfPossible)
}

export function useMulticallContract(): Contract | null {
  return useContract(MULTICALL_ADDRESS, MULTICALL_ABI)
}
