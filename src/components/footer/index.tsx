import { Flex, Box, Text } from 'rebass'
import styled from 'styled-components'

const ColoredText = styled(Text)`
  color: ${(props) => props.theme.contentSecondary};
`

export const Footer = () => {
  return (
    <Flex width="100%" my="40px" justifyContent="center" alignItems="center">
      <Box>
        <ColoredText fontSize="12px">DXDAO | ETHLISBON 2021</ColoredText>
      </Box>
    </Flex>
  )
}
