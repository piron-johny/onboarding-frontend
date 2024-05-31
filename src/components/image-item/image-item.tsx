import {
  Box,
  Center,
  Text,
  Stack,
  useColorModeValue,
  Img,
  Button,
  Spinner,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { FC } from 'react'
import { useRemoveImage } from '../../hooks/queries'
import { useQueryClient } from '@tanstack/react-query'
import { GET_ALL_USER_IMAGE } from '../../constants'

interface ImageItemProps {
  id: string
  url: string
  name: string
  imageKey: string
  description: string
}

export const ImageItem: FC<ImageItemProps> = ({
  id,
  name,
  url,
  imageKey,
  description,
}) => {
  const queryClient = useQueryClient()
  const { isPendingRemoveImage, removeImage } = useRemoveImage({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_USER_IMAGE] })
    },
  })

  return (
    <Center flexGrow={1} flexBasis={'250px'} position={'relative'}>
      <Button
        onClick={() => removeImage({ imageId: id, imageKey })}
        bg={'blue.400'}
        _hover={{
          bg: 'blue.300',
        }}
        color={'white'}
        w='fit-content'
        position={'absolute'}
        top={3}
        right={3}
        zIndex={2}
        px={2}
      >
        {isPendingRemoveImage ? <Spinner /> : <DeleteIcon w={5} h={5} />}
      </Button>
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        flexDir={'column'}
        boxShadow={'2xl'}
        rounded={'md'}
        p={5}
        overflow={'hidden'}
        border={'1px'}
        borderColor='gray.400'
        flexGrow={1}
      >
        <Box
          h={'150px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}
        >
          <Img src={url} objectFit='cover' h='full' w='full' loading='eager' />
        </Box>
        <Stack>
          <Text
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'xl'}
            fontFamily={'body'}
            noOfLines={1}
            fontWeight={500}
          >
            {name}
          </Text>
          <Text color={'gray.500'} lineHeight={1.1} noOfLines={4}>
            {description}
          </Text>
        </Stack>
      </Box>
    </Center>
  )
}
