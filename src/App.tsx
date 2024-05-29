import { Box, Flex, Spinner, Text } from '@chakra-ui/react'
import { NavBar } from './components/nav-bar'
import { ImageItem } from './components/image-item'
import { useAuth } from './providers'
import { useQuery } from '@tanstack/react-query'
import httpService from './services/http'

function App() {
  const { isAuthenticated } = useAuth()
  const { data, isLoading, error } = useQuery({
    queryKey: ['GET_ALL_USER_IMAGE'],
    queryFn: async () => httpService.getUserImages(),
    enabled: isAuthenticated,
    retry: 1,
    refetchOnWindowFocus: false,
  })

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
            {isLoading ? (
              <Flex alignItems={'center'} justifyContent={'center'} w={'full'}>
                <Spinner size={'xl'} />
              </Flex>
            ) : data?.length === 0 ? (
              <Flex alignItems={'center'} justifyContent={'center'} w={'full'}>
                <Text textAlign={'center'} fontSize={'xl'}>
                  You don't have any uploaded images.
                </Text>
              </Flex>
            ) : (
              data?.map(image => <ImageItem key={image.id} {...image} />)
            )}
          </>
        ) : (
          <Flex
            alignItems={'center'}
            justifyContent={'center'}
            w={'full'}
            direction={'column'}
          >
            <Text textAlign={'center'} fontSize={'xl'}>
              Welcome to the <b>PICTURES</b> 👋
            </Text>
            <Text textAlign={'center'} fontSize={'xl'}>
              Please <b>SIGN IN</b> or <b>SIGN UP</b>
            </Text>
          </Flex>
        )}
      </Flex>
    </Box>
  )
}

export default App
