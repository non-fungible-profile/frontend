import { useEffect, useState } from 'react'
import { useNfpGenesisContract } from './useContract'
import { useSingleCallResult } from '../state/multicall/hooks'
import { useMinter } from './useMinter'

export function useClaimableNfpAmount(account: string | null | undefined): {
  loading: boolean
  claimableAmount: number
} {
  const nfp = useNfpGenesisContract()
  const wrappedMintableResult = useSingleCallResult(nfp, 'mintable')
  const wrappedMintedResult = useSingleCallResult(nfp, 'minted')
  const { loading: loadingMinter, minter } = useMinter(account)

  const [claimableAmount, setClaimableAmount] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!minter || loadingMinter || wrappedMintableResult.loading || wrappedMintedResult.loading) {
      setLoading(true)
      setClaimableAmount(0)
    } else if (!account || wrappedMintableResult.error || wrappedMintedResult.error) {
      setLoading(false)
      setClaimableAmount(0)
    } else {
      setLoading(false)
      const mintable = wrappedMintableResult.result
      const minted = wrappedMintedResult.result
      if (!minter.free && minted?.free.toNumber() !== mintable?.free.toNumber()) {
        setClaimableAmount(1)
        return
      }
      console.log(minter)
      const paidMintable = mintable?.paid - minted?.paid
      if (minter.paid.toNumber() < 3) setClaimableAmount(Math.min(paidMintable, 3 - minter.paid.toNumber()))
    }
  }, [
    loadingMinter,
    minter,
    account,
    wrappedMintableResult.error,
    wrappedMintableResult.loading,
    wrappedMintableResult.result,
    wrappedMintedResult.error,
    wrappedMintedResult.loading,
    wrappedMintedResult.result,
  ])

  return { loading, claimableAmount }
}
