import { useEffect, useState } from 'react'

export interface OpenSeaAsset {
  contractAddress: string
  tokenId: string
  imageUrl: string
}

export const useAllNftsFromOpenSea = (account: string | null | undefined) => {
  const [nfts, setNfts] = useState<OpenSeaAsset[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    const fetchData = async () => {
      if (!account) return
      if (!cancelled) setLoading(true)
      try {
        let offset = 0
        const pageSize = 50
        const nfts: OpenSeaAsset[] = []
        while (1) {
          const response = await fetch(
            `https://rinkeby-api.opensea.io/api/v1/assets?owner=${account}&order_direction=desc&offset=${offset}&limit=${pageSize}`
          )
          if (!response.ok) {
            console.error('error fetching all nfts from opensea')
            break
          }
          const json = await response.json()
          nfts.push(
            ...json.assets.map((asset: any) => ({
              imageUrl: asset.image_url,
              tokenId: asset.token_id,
              contractAddress: asset.asset_contract.address,
            }))
          )
          if (json.assets.length < pageSize) break
          offset += 50
        }
        if (!cancelled) setNfts(nfts)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchData()
    return () => {
      cancelled = true
    }
  }, [account])

  return { nfts, loading }
}
