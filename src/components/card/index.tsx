import { transparentize } from 'polished'
import { Card as RebassCard } from 'rebass'
import styled from 'styled-components'

export const Card = styled(RebassCard)<{
  clickable?: boolean
  backgroundColor?: string
  onClick?: () => void
  disabled?: boolean
}>`
  padding: 52px 82px;
  width: 664px;
  height: 272px;
  background: ${(props) => props.theme.background};
  box-shadow: 0px 13px 80px rgba(50, 47, 82, 0.1);
  border-radius: 40px;
  border: solid 1px ${(props) => transparentize(0.5, props.theme.border)};
`
