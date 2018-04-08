import React from 'react'
import { Button } from 'rebass'

import { auth } from '../../../firebase/index'

const SignOutButton = () =>
  <Button
    type='button'
    onClick={auth.doSignOut}>
    Sign Out
  </Button>

export default SignOutButton
