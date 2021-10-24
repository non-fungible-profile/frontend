import { getTheme } from '../../theme'
import { useIsDarkMode } from '../../state/user/hooks'
import { Footer } from '../../components/footer'
import { Header } from '../../components/header'
import { ToastContainer, Slide } from 'react-toastify'
import { Home } from '../home'
import { Flex, Box } from 'rebass'
import styled, { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../../theme'
import { useEffect } from 'react'
import useLocation from 'react-use/lib/useLocation'
import { TransactionsStateUpdater } from '../../state/transactions/updater'
import { NetworkWarningModal } from '../../components/network-warning-modal'
import illustrationImage from '../../assets/illustration.png'

const Illustration = styled.div`
  background-image: url(${illustrationImage});
  position: fixed;
  bottom: -100px;
  right: -400px;
  width: 1000px;
  height: 500px;
`

export function App() {
  const darkMode = useIsDarkMode()
  const theme = getTheme(darkMode)
  const location = useLocation()

  // resets scroll on body after every change of route
  useEffect(() => {
    document.getElementsByTagName('body')[0].scrollTo(0, 0)
  }, [location])

  return (
    <>
      <ThemeProvider theme={theme}>
        <TransactionsStateUpdater />
        <GlobalStyle />
        <Header />
        <Flex alignItems="center" flexDirection="column" height="100%">
          <Box flex="1" width={['90%', '80%', '70%', '55%']}>
            <Home />
          </Box>
          <Box width={['90%', '80%', '70%', '55%']}>
            <Footer />
          </Box>
        </Flex>
        <NetworkWarningModal />
        <Illustration />
      </ThemeProvider>
      <ToastContainer
        className="custom-toast-root"
        toastClassName="custom-toast-container"
        bodyClassName="custom-toast-body"
        position="top-right"
        closeButton={false}
        transition={Slide}
      />
    </>
  )
}
