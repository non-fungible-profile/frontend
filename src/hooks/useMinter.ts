import { BigNumber } from '@ethersproject/bignumber'
import { useEffect, useMemo, useState } from 'react'
import { useSingleCallResult } from '../state/multicall/hooks'
import { useNfpGenesisContract } from './useContract'

export interface Minter {
  free: boolean
  paid: BigNumber
  whitelist: boolean
}

export function useMinter(account: string | null | undefined): { loading: boolean; minter: Minter | undefined } {
  const nfp = useNfpGenesisContract()
  const minterCallParams = useMemo(() => (account ? [account] : undefined), [account])
  const wrappedMinterResult = useSingleCallResult(nfp, 'minter', minterCallParams)

  const [minter, setMinter] = useState<Minter | undefined>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (wrappedMinterResult.loading) {
      setLoading(true)
      setMinter(undefined)
    } else if (wrappedMinterResult.error) {
      setLoading(false)
      setMinter(undefined)
    } else {
      setLoading(false)
      setMinter({
        free: wrappedMinterResult.result?.free,
        paid: wrappedMinterResult.result?.paid,
        whitelist: wrappedMinterResult.result?.whitelist,
      })
    }
  }, [
    wrappedMinterResult.error,
    wrappedMinterResult.loading,
    wrappedMinterResult.result?.free,
    wrappedMinterResult.result?.paid,
    wrappedMinterResult.result?.whitelist,
  ])

  return { loading, minter }
}
