import { Box, Flex, Spinner, Text, useToast } from '@chakra-ui/react'
import { NavBar } from './components/nav-bar'
import { ImageItem } from './components/image-item'
import { useAuth } from './providers'
import { useGetImages } from './hooks/queries'

function App() {
  const { isAuthenticated } = useAuth()
  const toast = useToast()
  const { data, isLoading, error } = useGetImages({
    isAuthenticated,
  })

  if (error) {
    toast({
      title: 'Something went wrong',
      description: error.message,
      status: 'error',
      duration: 2000,
    })
  }

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
            ) : (
              <>
                {data?.length === 0 ? (
                  <Flex
                    alignItems={'center'}
                    justifyContent={'center'}
                    w={'full'}
                  >
                    <Text textAlign={'center'} fontSize={'xl'}>
                      You don't have any uploaded images.
                    </Text>
                  </Flex>
                ) : (
                  data?.map(image => <ImageItem key={image.id} {...image} />)
                )}
              </>
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
