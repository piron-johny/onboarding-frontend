import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Text,
  Link,
  Spinner,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react'
import { FC, useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { CreateUserDto } from '../../types'

interface SignUpProps {
  onLogin: () => void
  onSubmit: (user: CreateUserDto) => void
  isPending: boolean
  error: Error | null
}

export const SignUp: FC<SignUpProps> = ({
  onLogin,
  onSubmit,
  isPending,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')

  const handleSubmit = () => {
    if (
      password1 === '' ||
      password2 === '' ||
      name === '' ||
      password1 !== password2
    )
      return

    onSubmit({ name, password: password1 })
    setName('')
    setPassword1('')
    setPassword2('')
  }

  return (
    <Flex>
      <Stack spacing={8} w={'full'}>
        <Stack spacing={4}>
          <FormControl id='name' w={'100%'} isInvalid={name === ''}>
            <FormLabel>Name</FormLabel>
            <Input
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={isPending}
            />
            {name === '' && (
              <FormErrorMessage>
                The name must be longer than 1 character.
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            id='password1'
            isRequired
            isInvalid={password1 !== password2}
          >
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password1}
                onChange={e => setPassword1(e.target.value)}
                disabled={isPending}
              />
              <InputRightElement h={'full'}>
                <Button
                  variant={'ghost'}
                  onClick={() => setShowPassword(showPassword => !showPassword)}
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {password1 !== password2 && (
              <FormErrorMessage>Password doesn't match.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            id='password2'
            isRequired
            isInvalid={password1 !== password2}
          >
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password2}
                onChange={e => setPassword2(e.target.value)}
                disabled={isPending}
              />
              <InputRightElement h={'full'}>
                <Button
                  variant={'ghost'}
                  onClick={() => setShowPassword(showPassword => !showPassword)}
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {password1 !== password2 && (
              <FormErrorMessage>Password doesn't match.</FormErrorMessage>
            )}
          </FormControl>
          <Stack spacing={10} pt={2}>
            <Button
              loadingText='Submitting'
              size='lg'
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={handleSubmit}
              disabled={isPending}
            >
              {isPending ? <Spinner /> : 'Sign up'}
            </Button>
          </Stack>
          <Stack pt={6}>
            <Text align={'center'}>
              Already a user?{' '}
              <Link as={'button'} color={'blue.400'} onClick={onLogin}>
                Login
              </Link>
            </Text>
          </Stack>
        </Stack>
        {error && <Text>{error.message}</Text>}
      </Stack>
    </Flex>
  )
}
