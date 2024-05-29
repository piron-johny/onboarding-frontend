import {
  Box,
  Center,
  Text,
  Stack,
  useColorModeValue,
  Img,
} from '@chakra-ui/react'
import { FC } from 'react'

interface ImageItemProps {
  id: string
  url: string
  name: string
  description: string
}

export const ImageItem: FC<ImageItemProps> = ({
  id,
  name,
  url,
  description,
}) => {
  return (
    <Center flexGrow={1} flexBasis={'250px'} position={'relative'}>
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
