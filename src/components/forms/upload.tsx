import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Spinner,
  Text,
  InputGroup,
  Textarea,
} from '@chakra-ui/react'
import { FC, useRef, useState } from 'react'
import { UploadImageDto } from '../../types'

interface SignInProps {
  onSubmit: (data: UploadImageDto) => void
  isPending: boolean
  error: Error | null
}

export const Upload: FC<SignInProps> = ({ onSubmit, isPending, error }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleClick = () => inputRef.current?.click()

  const handleSubmit = () => {
    if (name === '' || description === '' || !inputRef.current?.files?.[0])
      return
    const file = inputRef.current.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    try {
      reader.onload = async () => {
        const imageBase64 = reader.result?.toString().split(',')[1]
        const fileType = file.type
        if (imageBase64) {
          onSubmit({ name, description, imageData: { imageBase64, fileType } })
          setName('')
          setDescription('')
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  console.log('error: ', error)

  return (
    <Flex>
      <Stack spacing={4} w={'full'}>
        <FormControl id='email' w={'100%'}>
          <FormLabel>Name</FormLabel>
          <Input
            type='name'
            value={name}
            placeholder='Image name'
            onChange={e => setName(e.target.value)}
          />
        </FormControl>
        <FormControl id='password'>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder='Image description'
            resize={'none'}
            value={description}
            rounded={8}
            onChange={e => setDescription(e.target.value)}
          />
        </FormControl>
        <Stack spacing={5} w={'full'}>
          <InputGroup onClick={handleClick} w={'full'}>
            <Input
              type={'file'}
              multiple={false}
              hidden
              bg={'red'}
              accept='image/*'
              ref={inputRef}
            />
            <Stack w={'full'}>
              <Button w={'full'}>
                {inputRef.current?.files?.[0]
                  ? inputRef.current?.files?.[0].name
                  : 'Upload'}
              </Button>
              <Text fontSize={12} textAlign={'center'}>
                Max size 4Mb. Support extensions .png, .jpeg, .jpg
              </Text>
            </Stack>
          </InputGroup>
          <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? <Spinner /> : 'Send'}
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
