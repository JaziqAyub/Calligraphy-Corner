import React from 'react'

import { IsAuthorised } from '../utils/IsAuthorised'


export const SecureProfile = () => {
    IsAuthorised() //THIS IS CALLED CUSTOM HOOK
  return (
    <div>
        <h1 style={{textAlign : "center", color : "green", marginTop : 250}}>This a Secure Page, this only opens after a scucesful login.</h1>
    </div>
  )
}
