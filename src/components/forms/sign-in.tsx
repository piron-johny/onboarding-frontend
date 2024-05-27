import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Spinner,
  Text,
} from '@chakra-ui/react'
import { FC, useState } from 'react'
import { CreateUserDto } from '../../types'

interface SignInProps {
  onSubmit: (user: CreateUserDto) => void
  isPending: boolean
  error: Error | null
}

export const SignIn: FC<SignInProps> = ({ onSubmit, isPending, error }) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    if (name === '' || password === '') return

    onSubmit({ name, password })
    setName('')
    setPassword('')
  }
  return (
    <Flex>
      <Stack spacing={4} w={'full'}>
        <FormControl id='email' w={'100%'}>
          <FormLabel>Name</FormLabel>
          <Input
            type='name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </FormControl>
        <FormControl id='password'>
          <FormLabel>Password</FormLabel>
          <Input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormControl>
        <Stack spacing={10}>
          <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? <Spinner /> : 'Sign in'}
          </Button>
        </Stack>
        {error && (
          <Text color={'red.500'} textAlign={'center'}>
            {error.message}
          </Text>
        )}
      </Stack>
    </Flex>
  )
}
