import React from 'react'
import { Box, Card, Heading } from 'rebass'

const Wrapper = Box.extend`
  height: 100vh;
  width: 100vw;
  background-color: ${props => props.theme.colors.primary};
`

const Footer = Box.extend`
  color: white;
  text-align: center;
`

const PageWrapper = ({heading, children, footer}) =>
  <Wrapper pt={5}>
    <Heading textAlign='center' color='white'>{heading}</Heading>

    <Box w={[1, 400]} mx='auto'>
      <Card p={4} mt={5} mb={3}>
        {children}
      </Card>
    </Box>

    <Footer>
      {footer}
    </Footer>
  </Wrapper>

export { PageWrapper }