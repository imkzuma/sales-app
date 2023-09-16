import { Box, Flex, Stack, Text } from "@chakra-ui/react";

export default function HomeHero() {
  return (
    <Flex
      pos="relative"
      justify={'center'}
      align={'center'}
      w={'full'}
      minH={'45vh'}
      py={8}
      backgroundImage={"url('home.jpg')"}
      backgroundSize={'cover'}
      backgroundPosition={'top'}
      rounded={'xl'}
    >
      <Box
        pos={'absolute'}
        bg={'blackAlpha.400'}
        w={'full'}
        h={'full'}
        rounded={'xl'}
        zIndex={0}
      />

      <Stack pos={'relative'}
        align={'center'}
        textAlign={'center'}
      >
        <Text
          fontSize={'5xl'}
          color={'white'}
          fontWeight={'semibold'}
        >
          Magnum Solusion
        </Text>
        <Text
          color={'gray.300'}
          w={'2xl'}
        >
          The company was founded around the early 2000s.
          Our business philosophy is to assure the highest quality product. work with enthusiasm to achieve total client satisfaction.
        </Text>
      </Stack>
    </Flex>
  )
}