import { ReactElement, useEffect, useState } from 'react'
import { Box, Flex, Text } from 'rebass'
import { Button } from '../../components/button'
import { useFreeClaimAvailable } from '../../hooks/useFreeClaimAvailable'
import { useFreeClaimCallback } from '../../hooks/useFreeClaimCallback'
import { usePaidClaimCallback } from '../../hooks/usePaidClaimCallback'
import Loader from 'react-spinners/BounceLoader'
import { useTheme } from 'styled-components'
import { Card } from '../../components/card'
import { Select } from '../../components/select'
import { ProgressBar } from '../../components/progress-bar'
import { useClaimableNfpAmount } from '../../hooks/useClaimableNfpAmount'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { Decimal } from 'decimal.js-light'
import { useMinted } from '../../hooks/useMinted'

export function Home(): ReactElement {
  const theme = useTheme()
  const { account } = useActiveWeb3React()

  const { loading: loadingClaimableAmount, claimableAmount } = useClaimableNfpAmount(account)
  const { freeClaimAvailable: claimableForFree, loading: loadingClaimableForFree } = useFreeClaimAvailable()
  const freeClaimCallback = useFreeClaimCallback()
  const paidClaimCallback = usePaidClaimCallback(claimableAmount)
  const { loading: loadingMinted, minted: mintedAmount } = useMinted()

  const [options, setOptions] = useState<{ label: string; value: string }[]>([])
  const [selectedOption, setSelectedOption] = useState<{ label: string; value: string } | undefined>()

  console.log(loadingClaimableAmount, claimableAmount)
  useEffect(() => {
    if (!loadingClaimableAmount) {
      const options = new Array(claimableAmount).fill(null).map((_, index) => {
        const labelAndValue = (index + 1).toString()
        return { label: labelAndValue, value: labelAndValue }
      })
      setOptions(options)
      if (options.length > 0) {
        setSelectedOption(options[0])
      }
    }
  }, [claimableAmount, loadingClaimableAmount])

  return (
    <Flex width="100%" height="100%" justifyContent="center" alignItems="center">
      <Box>
        <Card>
          {loadingClaimableAmount || loadingClaimableForFree || loadingMinted ? (
            <Flex width="100%" height="100%" justifyContent="center" alignItems="center">
              <Box>
                <Loader color={theme.accent} />
              </Box>
            </Flex>
          ) : (
            <Flex flexDirection="column">
              <Flex justifyContent="space-evenly" alignItems="center" mb="32px">
                <Text fontSize="18px">Amount</Text>
                <Box>
                  <Select options={options} value={selectedOption} onChange={setSelectedOption} />
                </Box>
                <Button primary onClick={claimableForFree ? freeClaimCallback : paidClaimCallback}>
                  Claim for{' '}
                  {!claimableForFree && selectedOption ? new Decimal(selectedOption.value).times('0.07').toString() : 0}{' '}
                  ETH
                </Button>
              </Flex>
              <Box>
                <ProgressBar progress={mintedAmount / 1337} lowerBound={0} higherBound={1337} />
              </Box>
            </Flex>
          )}
        </Card>
      </Box>
    </Flex>
  )
}
