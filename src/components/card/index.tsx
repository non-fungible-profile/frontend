import { Card as RebassCard } from 'rebass'
import styled from 'styled-components'

export const Card = styled(RebassCard)<{
  clickable?: boolean
  backgroundColor?: string
  onClick?: () => void
  disabled?: boolean
}>`
  padding: 64px 80px;
  width: 684px;
  height: 300px;
  background: ${(props) => props.theme.background};
  box-shadow: 0px 13px 80px rgba(50, 47, 82, 0.04);
  border-radius: 40px;
`
