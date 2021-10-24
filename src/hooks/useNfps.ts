import { useEffect, useState } from 'react'
import { gql } from 'graphql-request'
import { subgraphClient } from '../constants'

export interface Nfp {
  uri: string
  id: number
}

interface QueryResult {
  owner: {
    ownedTokens: {
      uri: string
      id: string
    }[]
  }
}

const QUERY = gql`
  query getNfps($user: ID!) {
    owner(id: $user) {
      ownedTokens {
        uri
        id
      }
    }
  }
`

export function useNfps(account: string | null | undefined): {
  loading: boolean
  nfps: Nfp[]
} {
  const [nfps, setNfps] = useState<Nfp[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    const fetchData = async () => {
      if (!account) return
      if (!cancelled) setLoading(true)
      try {
        const result = await subgraphClient.request<QueryResult>(QUERY, { user: account.toLowerCase() })
        setNfps(
          result.owner?.ownedTokens?.map((ownedToken) => ({ uri: ownedToken.uri, id: parseInt(ownedToken.id) })) || []
        )
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchData()
    return () => {
      cancelled = true
    }
  }, [account])

  return { loading, nfps }
}
