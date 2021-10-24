import { useState } from 'react'
import styled from 'styled-components'

const Inline = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 100%;
  border-radius: 50%;
  background-color: ${(props) => props.theme.border};
`

const Image = styled.img`
  width: 100%;
  padding-top: 100%;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
`

interface NfpImageProps {
  src: string
}

export default function NfpImage({ src, ...rest }: NfpImageProps) {
  const [error, setError] = useState(false)

  if (error) return <Inline />

  return (
    <Inline>
      <Image
        {...rest}
        alt=""
        src={src}
        onError={(event) => {
          setError(true)
          event.preventDefault()
        }}
      />
    </Inline>
  )
}
