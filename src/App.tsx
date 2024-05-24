import { Box, Flex } from '@chakra-ui/react'
import { NavBar } from './components/nav-bar'
import { ImageItem } from './components/image-item'

function App() {
  return (
    <Box>
      <NavBar />
      <Flex
        bg='gray.200'
        px={10}
        py={10}
        wrap={'wrap'}
        gap={5}
        alignItems={'center'}
      >
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
      </Flex>
    </Box>
  )
}

export default App
