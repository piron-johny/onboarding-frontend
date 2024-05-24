import React, { PropsWithChildren } from 'react'
import AuthProvider from './auth-provider'
import { ChakraProvider } from '@chakra-ui/react'

const RootProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ChakraProvider>
      <AuthProvider>{children}</AuthProvider>
    </ChakraProvider>
  )
}

export default RootProvider
