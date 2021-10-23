import { useEffect, useState } from 'react'
import { useSingleCallResult } from '../state/multicall/hooks'
import { useNfpGenesisContract } from './useContract'

export function useMinted(): { loading: boolean; minted: number } {
  const nfp = useNfpGenesisContract()
  const wrappedMintedResult = useSingleCallResult(nfp, 'minted')

  const [minted, setMinted] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (wrappedMintedResult.loading) {
      setLoading(true)
      setMinted(0)
    } else if (wrappedMintedResult.error) {
      setLoading(false)
      setMinted(0)
    } else {
      setLoading(false)
      setMinted(
        wrappedMintedResult.result?.free.toNumber() +
          wrappedMintedResult.result?.paid.toNumber() +
          wrappedMintedResult.result?.whitelist.toNumber()
      )
    }
  }, [
    wrappedMintedResult.error,
    wrappedMintedResult.loading,
    wrappedMintedResult.result?.free,
    wrappedMintedResult.result?.paid,
    wrappedMintedResult.result?.whitelist,
  ])

  return { loading, minted }
}
