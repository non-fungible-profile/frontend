import { useCallback } from 'react'
import { useTransactionAdder } from '../state/transactions/hooks'
import { useNfpGenesisContract } from './useContract'
import { parseEther } from '@ethersproject/units'
import Decimal from 'decimal.js-light'

export function usePaidClaimCallback(amount: number): () => Promise<void> {
  const nfp = useNfpGenesisContract(true)
  const addTransaction = useTransactionAdder()

  return useCallback(async () => {
    if (!nfp || amount > 3) return
    try {
      const tx = await nfp.paidMint(amount, {
        value: parseEther(new Decimal('0.07').times(amount).toString()).toString(),
      })
      addTransaction(tx, { summary: 'Paid claim (0.07 ETH)' })
    } catch (error) {
      console.error('error performing paid claim', error)
    }
  }, [addTransaction, amount, nfp])
}
