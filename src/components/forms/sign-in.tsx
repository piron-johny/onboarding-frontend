import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
} from '@chakra-ui/react'

export const SignIn = () => {
  return (
    <Flex>
      <Stack spacing={4} w={'full'}>
        <FormControl id='email' w={'100%'}>
          <FormLabel>Name</FormLabel>
          <Input type='name' />
        </FormControl>
        <FormControl id='password'>
          <FormLabel>Password</FormLabel>
          <Input type='password' />
        </FormControl>
        <Stack spacing={10}>
          <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
          >
            Sign in
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}
