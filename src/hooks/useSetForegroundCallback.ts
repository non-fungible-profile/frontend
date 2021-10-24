import { isAddress } from '@ethersproject/address'
import { useCallback } from 'react'
import { useTransactionAdder } from '../state/transactions/hooks'
import { useNfpGenesisContract } from './useContract'

export function useSetForegroundNFTCallback(
  tokenId?: string,
  erc721TokenAddress?: string,
  erc721TokenId?: string
): () => Promise<void> {
  const nfp = useNfpGenesisContract(true)
  const addTransaction = useTransactionAdder()

  return useCallback(async () => {
    if (!nfp || !tokenId || !erc721TokenAddress || !isAddress(erc721TokenAddress) || !erc721TokenId) return
    try {
      const tx = await nfp.setForegroundERC721(tokenId, erc721TokenAddress, erc721TokenId)
      addTransaction(tx, { summary: 'Set foreground NFT' })
    } catch (error) {
      console.error('error performing free claim', error)
    }
  }, [addTransaction, erc721TokenAddress, erc721TokenId, nfp, tokenId])
}
