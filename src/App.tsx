import { Box, Flex } from '@chakra-ui/react'
import { NavBar } from './components/nav-bar'
import { ImageItem } from './components/image-item'
import { useAuth } from './providers'

function App() {
  const { isAuthenticated } = useAuth()
  return (
    <Box>
      <NavBar />
      <Flex
        bg='gray.200'
        px={10}
        py={10}
        h={'100vh'}
        wrap={'wrap'}
        gap={5}
        alignItems={'center'}
      >
        {isAuthenticated ? (
          <>
            <ImageItem />
            <ImageItem />
            <ImageItem />
            <ImageItem />
            <ImageItem />
            <ImageItem />
            <ImageItem />
            <ImageItem />
            <ImageItem />
          </>
        ) : (
          <></>
        )}
      </Flex>
    </Box>
  )
}

export default App
