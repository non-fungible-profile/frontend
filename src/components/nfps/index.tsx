import { Box, Flex, Text } from 'rebass'
import { Nfp } from '../../hooks/useNfps'
import { Card } from '../card'
import Slider from 'react-slick'

interface NfpsProps {
  nfps: Nfp[]
}

export const Nfps = ({ nfps }: NfpsProps) => {
  return nfps.length === 0 ? null : (
    <Card padding="36px 48px">
      <Slider dots speed={500} slidesToShow={1} slidesToScroll={1}>
        {nfps.map((nfp, index) => {
          return (
            <div key={index}>
              <Flex flexDirection="column">
                <Box mb="24px">
                  <img width="100%" src={nfp.uri} />
                </Box>
                <Text>Genesis profolio {nfp.id}</Text>
              </Flex>
            </div>
          )
        })}
      </Slider>
    </Card>
  )
}
