import { Flex, Box, Text } from 'rebass'
import { ExternalLink } from '../undecorated-link'

export const Footer = () => {
  return (
    <Flex mb="40px" px={['16px']} alignItems="center" justifyContent="space-between">
      <Flex flexDirection={['column', 'row']} justifyContent={['center', 'auto']} alignItems={['flex-start', 'center']}>
        <Box mr="16px"></Box>
        <Box>
          <Text fontSize="12px">© {new Date().getFullYear()} DXdao</Text>
        </Box>
      </Flex>
      <Flex>
        <Box mr="16px">
          <ExternalLink href="https://discord.com/invite/4QXEJQkvHH">
            <Text fontSize="17px">Discord</Text>
          </ExternalLink>
        </Box>
        <Box>
          <ExternalLink href="https://daotalk.org/c/dx-dao/15">
            <Text fontSize="17px">Forum</Text>
          </ExternalLink>
        </Box>
      </Flex>
    </Flex>
  )
}
