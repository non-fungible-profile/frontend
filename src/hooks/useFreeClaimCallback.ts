import { useCallback } from 'react'
import { useTransactionAdder } from '../state/transactions/hooks'
import { useNfpGenesisContract } from './useContract'

export function useFreeClaimCallback(): () => Promise<void> {
  const nfp = useNfpGenesisContract(true)
  const addTransaction = useTransactionAdder()

  return useCallback(async () => {
    if (!nfp) return
    try {
      const tx = await nfp.freeMint()
      addTransaction(tx, { summary: 'Free claim' })
    } catch (error) {
      console.error('error performing free claim', error)
    }
  }, [addTransaction, nfp])
}
