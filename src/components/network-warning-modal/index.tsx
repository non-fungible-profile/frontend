import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Modal } from '../modal'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { Box, Flex, Text } from 'rebass'
import { Title } from '../title'

const OuterContainer = styled(Flex)`
  background: ${({ theme }) => theme.surface};
`

export const NetworkWarningModal = () => {
  const { chainId, account } = useActiveWeb3React()

  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(!!chainId && chainId !== 4)
  }, [account, chainId])

  const handleDismiss = useCallback(() => null, [])

  return (
    <Modal open={open} onDismiss={handleDismiss} maxHeight={90}>
      <OuterContainer flexDirection="column" p="20px">
        <Title mb="20px" fontSize="16px">
          Wrong network
        </Title>
        <Box>
          <Text mb="20px">
            You&apos;re currently on the wrong network to correctly visualize this page. Please manually switch to
            Ethereum mainnet in your connected wallet to continue.
          </Text>
        </Box>
      </OuterContainer>
    </Modal>
  )
}
