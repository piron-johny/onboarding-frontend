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
import { SignIn, SignUp, Upload } from '../forms'
import { useAuth } from '../../providers'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import httpService from '../../services/http'
import { CreateUserDto, UploadImageDto } from '../../types'

export const NavBar = () => {
  const queryClient = useQueryClient()
  const { login, logout, isAuthenticated } = useAuth()
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
  const {
    isOpen: isOpenUpload,
    onOpen: onOpenUpload,
    onClose: onCloseUpload,
  } = useDisclosure()
  const {
    mutate: signUp,
    isPending: isPendingSignUp,
    error: errorSignUp,
  } = useMutation({
    mutationFn: async (user: CreateUserDto) => httpService.signUp(user),
    mutationKey: ['SIGN_UP'],
    onSuccess(data) {
      onCloseSignUp()
      login(data.token)
    },
  })
  const {
    mutate: signIn,
    isPending: isPendingSignIn,
    error: errorSignIn,
  } = useMutation({
    mutationFn: async (user: CreateUserDto) => httpService.signIn(user),
    mutationKey: ['SIGN_IN'],
    onSuccess(data) {
      onCloseSignIn()
      login(data.token)
    },
  })
  const {
    mutate: upload,
    isPending: isPendingUpload,
    error: errorUpload,
  } = useMutation({
    mutationFn: async (data: UploadImageDto) => httpService.upload(data),
    mutationKey: ['UPLOAD'],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['GET_ALL_USER_IMAGE'] })
      onCloseUpload()
    },
  })

  const onPressLoginLink = () => {
    onCloseSignUp()
    setTimeout(onOpenSignIn, 300)
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      <Box>
        <Flex
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 8 }}
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

          {isAuthenticated ? (
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={'flex-end'}
              direction={'row'}
              spacing={6}
            >
              <Button
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'blue.400'}
                _hover={{
                  bg: 'blue.300',
                }}
                onClick={onOpenUpload}
              >
                Upload
              </Button>
              <Button
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                variant={'link'}
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </Stack>
          ) : (
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={'flex-end'}
              direction={'row'}
              spacing={6}
            >
              <Button
                fontSize={'sm'}
                fontWeight={600}
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
                bg={'blue.400'}
                _hover={{
                  bg: 'blue.300',
                }}
                onClick={onOpenSignUp}
              >
                Sign Up
              </Button>
            </Stack>
          )}
        </Flex>
      </Box>

      <ModalWindow
        isOpen={isOpenSignIn}
        onClose={onCloseSignIn}
        title={'Sign In'}
      >
        <SignIn
          onSubmit={signIn}
          isPending={isPendingSignIn}
          error={errorSignIn}
        />
      </ModalWindow>
      <ModalWindow
        isOpen={isOpenSignUp}
        onClose={onCloseSignUp}
        title={'Sign Up'}
      >
        <SignUp
          onLogin={onPressLoginLink}
          onSubmit={signUp}
          isPending={isPendingSignUp}
          error={errorSignUp}
        />
      </ModalWindow>
      <ModalWindow
        isOpen={isOpenUpload}
        onClose={onCloseUpload}
        title={'Sign Up'}
      >
        <Upload
          onSubmit={upload}
          isPending={isPendingUpload}
          error={errorUpload}
        />
      </ModalWindow>
    </>
  )
}
