import React from 'react'
import { Flex, Text } from 'rebass'

const Wrapper = Flex.extend`
  height: 100vh;
  background-color: ${({theme}) => theme.colors.primary};
  color: white;
  align-items: center;
  justify-content: center;
`

class Loading extends React.PureComponent {
  state = {
    message: ''
  }

  one = null
  two = null
  three = null

  _setTimeout = (message, delay) => setTimeout(() => this.setState({message}), delay)

  componentDidMount () {
    this.one = this._setTimeout('Loading...', 1000)
    this.two = this._setTimeout('Patience...', 5000)
    this.three = this._setTimeout('Patience is a virtue', 10000)
  }

  componentWillUnmount () {
    clearInterval(this.one)
    clearInterval(this.two)
    clearInterval(this.three)
  }

  render () {
    return (
      <Wrapper>
        {!!this.state.message && <Text>{this.state.message}</Text>}
      </Wrapper>
    )
  }
}

export default Loading
