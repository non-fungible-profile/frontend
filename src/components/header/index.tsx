import { ReactElement, useCallback, useState } from 'react'
import { Box, Flex } from 'rebass'
import styled from 'styled-components'
import { Button } from '../button'
import { UndecoratedInternalLink } from '../undecorated-link'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { IdentityBadge } from '../identity-badge'
import { WalletModal } from '../wallet-modal'
import { WalletConnectionPopover } from '../wallet-connection-popover'

const FlexContainer = styled(Flex)`
  position: fixed;
  top: 0;
  z-index: 4;
  background-color: ${(props) => props.theme.background};
  box-shadow: 0px 12px 12px 0px ${(props) => props.theme.background};
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
`

const WrongNetwork = styled.div`
  height: 28px;
  background-color: ${(props) => props.theme.negativeSurface};
  color: ${(props) => props.theme.negativeSurfaceContent};
  padding: 0 12px;
  border-radius: 14px;
  line-height: 24px;
  display: flex;
  align-items: center;
  font-size: 12px;
  text-transform: uppercase;
`

export const Header = (): ReactElement => {
  const { account } = useActiveWeb3React()
  const { error } = useWeb3React()

  const [showWalletConnectionPopover, setShowWalletConnectionPopover] = useState(false)
  const [walletModalOpen, setWalletModalOpen] = useState(false)

  const handleAccountClick = useCallback(() => {
    setWalletModalOpen(true)
  }, [])

  const handleWalletModalClose = useCallback(() => {
    setWalletModalOpen(false)
  }, [])

  const handleConnectWalletClick = useCallback(() => {
    setShowWalletConnectionPopover(true)
  }, [])

  const handleWalletConnectionPopoverHide = useCallback(() => {
    setShowWalletConnectionPopover(false)
  }, [])

  return (
    <>
      <WalletModal open={walletModalOpen} onDismiss={handleWalletModalClose} />
      <FlexContainer width="100%" height="70px" justifyContent="center" alignItems="center" px={['16px', '24px']}>
        <Flex width={['100%', '80%', '70%', '55%']} justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <Box>
              <UndecoratedInternalLink to="/"></UndecoratedInternalLink>
            </Box>
          </Flex>
          <Flex alignItems="center">
            <Box mr="20px">
              {error instanceof UnsupportedChainIdError ? (
                <WrongNetwork>Invalid network</WrongNetwork>
              ) : !!account ? (
                <IdentityBadge account={account} onClick={handleAccountClick} />
              ) : (
                <WalletConnectionPopover show={showWalletConnectionPopover} onHide={handleWalletConnectionPopoverHide}>
                  <Button primary small onClick={handleConnectWalletClick}>
                    Connect wallet
                  </Button>
                </WalletConnectionPopover>
              )}
            </Box>
          </Flex>
        </Flex>
      </FlexContainer>
    </>
  )
}
