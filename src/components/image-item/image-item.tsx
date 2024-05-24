import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Img,
} from '@chakra-ui/react'

export const ImageItem = () => {
  return (
    <Center flexGrow={1} flexBasis={'250px'}>
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
          <Img
            src={
              'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
            objectFit='cover'
            h='full'
            w='full'
          />
        </Box>
        <Stack>
          <Text
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'xl'}
            fontFamily={'body'}
            noOfLines={1}
            fontWeight={500}
          >
            Boost your conversion rate
          </Text>
          <Text color={'gray.500'} lineHeight={1.1} noOfLines={4}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore. nonumy eirmod
            tempor invidunt ut labore et dolore. nonumy eirmod tempor invidunt
            ut labore et dolore.
          </Text>
        </Stack>
      </Box>
    </Center>
  )
}
