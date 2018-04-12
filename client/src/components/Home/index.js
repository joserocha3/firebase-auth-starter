import React from 'react'
import { Heading } from 'rebass'

import withAuthorization from '../Auth/Session/withAuthorization'

const HomePage = ({email}) =>
    <Heading is='h3'>Welcome, {email}</Heading>

export default withAuthorization()(HomePage)