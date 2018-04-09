import React from 'react'
import { Button } from 'rebass'

import { auth } from '../../../firebase/index'

const SignOutButton = ({...others}) =>
  <Button
    type='button'
    onClick={auth.signOut}
    {...others}>
    Sign Out
  </Button>

export default SignOutButton
