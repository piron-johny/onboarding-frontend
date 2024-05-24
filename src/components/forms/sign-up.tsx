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
} from '@chakra-ui/react'
import { FC, useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

interface SignUpProps {
  onLogin: () => void
}

export const SignUp: FC<SignUpProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Flex>
      <Stack spacing={8} w={'full'}>
        <Stack spacing={4}>
          <FormControl id='email' w={'100%'}>
            <FormLabel>Name</FormLabel>
            <Input type='name' />
          </FormControl>
          <FormControl id='password'>
            <FormLabel>Password</FormLabel>
            <Input type='password' />
          </FormControl>
          <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input type={showPassword ? 'text' : 'password'} />
              <InputRightElement h={'full'}>
                <Button
                  variant={'ghost'}
                  onClick={() => setShowPassword(showPassword => !showPassword)}
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
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
            >
              Sign up
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
      </Stack>
    </Flex>
  )
}
