import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { ModalWindow } from '../modals'
import { SignIn, SignUp } from '../forms'

export const NavBar = () => {
  const {
    isOpen: isOpenSignIn,
    onOpen: onOpenSignIn,
    onClose: onCloseSignIn,
  } = useDisclosure()
  const {
    isOpen: isOpenSignUp,
    onOpen: onOpenSignUp,
    onClose: onCloseSignUp,
  } = useDisclosure()

  const onPressLoginLink = () => {
    onCloseSignUp()
    setTimeout(onOpenSignIn, 300)
  }

  return (
    <>
      <Box>
        <Flex
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}
        >
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}
              fontWeight={'700'}
            >
              PICTURES
            </Text>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}
          >
            <Button
              fontSize={'sm'}
              fontWeight={400}
              variant={'link'}
              onClick={onOpenSignIn}
            >
              Sign In
            </Button>
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'pink.400'}
              _hover={{
                bg: 'pink.300',
              }}
              onClick={onOpenSignUp}
            >
              Sign Up
            </Button>
          </Stack>
        </Flex>
      </Box>

      <ModalWindow
        isOpen={isOpenSignIn}
        onClose={onCloseSignIn}
        title={'Sign In'}
      >
        <SignIn />
      </ModalWindow>
      <ModalWindow
        isOpen={isOpenSignUp}
        onClose={onCloseSignUp}
        title={'Sign Up'}
      >
        <SignUp onLogin={onPressLoginLink} />
      </ModalWindow>
    </>
  )
}
