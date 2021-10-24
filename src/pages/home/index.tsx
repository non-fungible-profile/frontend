import { ReactElement, useEffect, useMemo, useState } from 'react'
import { Box, Flex, Text } from 'rebass'
import { Button } from '../../components/button'
import { useFreeClaimAvailable } from '../../hooks/useFreeClaimAvailable'
import { useFreeClaimCallback } from '../../hooks/useFreeClaimCallback'
import { usePaidClaimCallback } from '../../hooks/usePaidClaimCallback'
import BounceLoader from 'react-spinners/BounceLoader'
import styled, { useTheme } from 'styled-components'
import { Card } from '../../components/card'
import { Select } from '../../components/select'
import { ProgressBar } from '../../components/progress-bar'
import { useClaimableNfpAmount } from '../../hooks/useClaimableNfpAmount'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { Decimal } from 'decimal.js-light'
import { useMinted } from '../../hooks/useMinted'
import { Nfps } from '../../components/nfps'
import { useNfps } from '../../hooks/useNfps'
import { useAllNftsFromOpenSea } from '../../hooks/useAllNftsFromOpenSea'

const RootFlex = styled(Flex)`
  position: relative;
`

const RaisedBox = styled(Box)`
  z-index: 4;
`

const Loader = styled(BounceLoader)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export function Home(): ReactElement {
  const theme = useTheme()
  const { account } = useActiveWeb3React()

  const { loading: loadingClaimableAmount, claimableAmount } = useClaimableNfpAmount(account)
  const { freeClaimAvailable: claimableForFree, loading: loadingClaimableForFree } = useFreeClaimAvailable(account)
  const freeClaimCallback = useFreeClaimCallback()
  const { loading: loadingMinted, minted: mintedAmount } = useMinted()
  const { loading: loadingNfps, nfps } = useNfps(account)
  const { loading: loadingOpenseaAssets, nfts } = useAllNftsFromOpenSea(account)

  const [options, setOptions] = useState<{ label: string; value: string }[]>([])
  const [selectedOption, setSelectedOption] = useState<{ label: string; value: string } | undefined>()
  const claimedAmount = useMemo(() => (selectedOption ? parseInt(selectedOption.value) : 0), [selectedOption])
  const paidClaimCallback = usePaidClaimCallback(claimedAmount)

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
    <Flex width="100%" height="100%" flexDirection={['column-reverse', 'row']} justifyContent="center" mt="160px">
      {nfps.length > 0 && (
        <RaisedBox width={['100%', '70%', '60%', '40%']} flex="1" mr={['0px', '32px']} mt={['32px', '0px']}>
          <Nfps nfps={nfps} openseaAssets={nfts} />
        </RaisedBox>
      )}
      <RaisedBox width={nfps.length === 0 ? 'auto' : ['100%', '30%', '40%', '60%']}>
        <Card padding="40px 70px">
          {loadingNfps || loadingClaimableAmount || loadingClaimableForFree || loadingMinted || loadingOpenseaAssets ? (
            <RootFlex height="100%" justifyContent="center" alignItems="center">
              <Loader color={theme.accent} />
            </RootFlex>
          ) : (
            <Flex height="100%" flexDirection="column" justifyContent="center">
              <Text mb="24px" fontSize="24px" fontWeight="700">
                Mint a profolio
              </Text>
              {!account ? (
                <Text mb="32px">Connect a wallet to begin.</Text>
              ) : (
                <Flex
                  opacity={options.length === 0 ? 0.5 : 1}
                  flexDirection={['column', 'column', 'column', 'row']}
                  justifyContent="space-evenly"
                  alignItems="center"
                  mb="32px"
                >
                  <Text mr={['0px', '0px', '24px', '32px']} mb={['24px', '24px', '24px', '0px']} fontSize="18px">
                    Amount
                  </Text>
                  <Box mr={['0px', '0px', '24px', '32px']} mb={['24px', '24px', '24px', '0px']}>
                    <Select
                      options={options}
                      value={selectedOption}
                      disabled={options.length === 0}
                      onChange={setSelectedOption}
                    />
                  </Box>
                  <Button
                    disabled={options.length === 0}
                    px="40px"
                    primary
                    onClick={claimableForFree ? freeClaimCallback : paidClaimCallback}
                  >
                    Claim (
                    {!claimableForFree && selectedOption
                      ? new Decimal(selectedOption.value).times('0.07').toString()
                      : 0}{' '}
                    ETH)
                  </Button>
                </Flex>
              )}
              <Box>
                <ProgressBar progress={mintedAmount / 1337} lowerBound={0} higherBound={1337} />
              </Box>
            </Flex>
          )}
        </Card>
      </RaisedBox>
    </Flex>
  )
}
