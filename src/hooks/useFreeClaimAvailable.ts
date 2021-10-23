import { useEffect, useState } from 'react'
import { useSingleCallResult } from '../state/multicall/hooks'
import { useActiveWeb3React } from './useActiveWeb3React'
import { useNfpGenesisContract } from './useContract'
import { useMinter } from './useMinter'

export function useFreeClaimAvailable(): { loading: boolean; freeClaimAvailable: boolean } {
  const { account } = useActiveWeb3React()

  const nfp = useNfpGenesisContract()
  const wrappedMintableResult = useSingleCallResult(nfp, 'mintable')
  const wrappedMintedResult = useSingleCallResult(nfp, 'minted')
  const { loading: loadingMinter, minter } = useMinter(account)

  const [freeClaimAvailable, setFreeClaimAvailable] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!minter || loadingMinter || wrappedMintableResult.loading || wrappedMintedResult.loading) {
      setLoading(true)
      setFreeClaimAvailable(false)
    } else if (wrappedMintableResult.error || wrappedMintedResult.error) {
      setLoading(false)
      setFreeClaimAvailable(false)
    } else {
      const mintable = wrappedMintableResult.result?.free
      const minted = wrappedMintedResult.result?.free
      setLoading(false)
      let available = minted < mintable
      if (!!account && minter?.free) {
        available = false
      }
      setFreeClaimAvailable(available)
    }
  }, [minter, account, loadingMinter, wrappedMintableResult, wrappedMintedResult])

  return { loading, freeClaimAvailable: freeClaimAvailable }
}
