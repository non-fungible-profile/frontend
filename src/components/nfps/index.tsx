import { Box, Flex, Text } from 'rebass'
import { Nfp } from '../../hooks/useNfps'
import { Card } from '../card'
import Slider from 'react-slick'
import { OpenSeaAsset } from '../../hooks/useAllNftsFromOpenSea'
import { Select } from '../select'
import { useCallback, useEffect, useState } from 'react'
import { useSetForegroundNFTCallback } from '../../hooks/useSetForegroundCallback'
import { Button } from '../button'
import { ChevronLeft, ChevronRight } from 'react-feather'
import NfpImage from '../NfpImage'

interface NfpsProps {
  nfps: Nfp[]
  openseaAssets: OpenSeaAsset[]
}

const Arrow = ({ left, onPrevious, onNext }: { left?: boolean; onPrevious?: () => void; onNext?: () => void }) => {
  return left ? <ChevronLeft onClick={onPrevious} /> : <ChevronRight onClick={onNext} />
}

export const Nfps = ({ nfps, openseaAssets }: NfpsProps) => {
  const [foregroundOptions, setForegroundOptions] = useState<{ label: string; value: string }[]>([])
  const [selectedForegroundOption, setSelectedForegroundOption] = useState<
    { label: string; value: string } | undefined
  >()
  const [selectedProfolioIndex, setSelectedProfolioIndex] = useState(0)

  const setForegroundNFTCallback = useSetForegroundNFTCallback(
    nfps[selectedProfolioIndex].id?.toString(),
    selectedForegroundOption ? JSON.parse(selectedForegroundOption.value).address : undefined,
    selectedForegroundOption ? JSON.parse(selectedForegroundOption.value).id : undefined
  )

  useEffect(() => {
    if (openseaAssets && openseaAssets.length > 0)
      setForegroundOptions(
        openseaAssets.map((asset) => ({
          label: `${asset.contractAddress} ${asset.tokenId}`,
          value: JSON.stringify({ address: asset.contractAddress, id: asset.tokenId }),
        }))
      )
  }, [openseaAssets])

  const handleNext = useCallback(() => {
    if (selectedProfolioIndex < nfps.length - 1) setSelectedProfolioIndex(selectedProfolioIndex + 1)
  }, [nfps.length, selectedProfolioIndex])

  const handlePrev = useCallback(() => {
    if (selectedProfolioIndex > 0) setSelectedProfolioIndex(selectedProfolioIndex - 1)
  }, [selectedProfolioIndex])

  return nfps.length === 0 ? null : (
    <Card padding="36px 48px">
      <Flex flexDirection="column">
        <Text fontSize="24px" fontWeight="700" mb="24px">
          My profolios
        </Text>
        <Slider
          dots
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          swipe={false}
          nextArrow={<Arrow onNext={handleNext} />}
          prevArrow={<Arrow left onPrevious={handlePrev} />}
        >
          {nfps.map((nfp, index) => {
            return (
              <div key={index}>
                <Flex flexDirection="column" pb="120px">
                  <Box mb="24px">
                    <NfpImage src={nfp.uri} />
                  </Box>
                  <Text mb="16px" fontWeight="700">
                    Genesis profolio {nfp.id}
                  </Text>
                  <Box mb="24px">
                    <Select
                      fullWidth
                      options={foregroundOptions}
                      value={selectedForegroundOption}
                      onChange={setSelectedForegroundOption}
                    />
                  </Box>
                  <Box>
                    <Button small primary medium onClick={setForegroundNFTCallback}>
                      Set foreground
                    </Button>
                  </Box>
                </Flex>
              </div>
            )
          })}
        </Slider>
      </Flex>
    </Card>
  )
}
