import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, Flex, Icon, Image, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";

const topSelligProducts = [
  { id: 1, name: 'Iphone 12' },
  { id: 2, name: 'Iphone X' },
  { id: 3, name: 'ASUS ROG' },
  { id: 4, name: 'Lenovo Legion' },
  { id: 5, name: 'Macbook Pro' },
  { id: 6, name: 'Macbook Air' },
] as { id: number, name: string }[];

export default function MainNavbar() {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack as="nav"
      pos={'sticky'}
      top={0}
      w={'full'}
      bg={'white'}
      px={10}
      py={3}
      borderBottom={'1px'}
      borderColor={'gray.200'}
      zIndex={9999}
    >
      <Flex
        align={'center'}
        justify={'space-between'}
        gap={10}
      >
        <Box
          w={{ base: 32 }}
        >
          <Image
            src="https://magnumsolusion.co.id/img/logo%202021.svg"
            alt="magnum"
            objectFit={'cover'}
          />
        </Box>

        <InputGroup borderColor={'gray.300'}>
          <InputLeftElement py={6}>
            <SearchIcon />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search products"
            w={'full'}
            py={6}
            rounded={'xl'}
            _focus={{
              borderColor: 'teal.500'
            }}
          />
        </InputGroup>

        <Menu>
          <MenuButton as={Button}
            variant={'ghost'}
            p={1}
            w={'fit-content'}
            h={'fit-content'}
          >
            <Icon as={AiOutlineShoppingCart} fontSize={'xl'} />
          </MenuButton>
          <MenuList>
            <MenuItem>cart</MenuItem>
          </MenuList>
        </Menu>

        <Divider orientation="vertical" h={8} />

        <Flex gap={3}>
          <Button
            colorScheme="teal"
            size={'sm'}
            onClick={() => router.push('/auth/login')}
          >
            Login
          </Button>
          <Button
            variant={'outline'}
            colorScheme="teal"
            size={'sm'}
            onClick={() => router.push('/auth/register')}
          >
            Register
          </Button>
        </Flex>

      </Flex>

      <Flex justify={'space-between'} align={'center'}>
        <Flex
          gap={5}
          ps={'8.3rem'}
        >
          {topSelligProducts.map((product) => (
            <Button key={product.id}
              variant={'unstyled'}
              fontSize={'sm'}
              color={'gray.500'}
              fontWeight={'medium'}
              _hover={{
                color: 'teal.500'
              }}
            >
              {product.name}
            </Button>
          ))}
        </Flex>
        <Flex
          align={'center'}
          gap={3}
          cursor={'pointer'}
          onClick={onOpen}
        >
          <Icon as={MdOutlineLocationOn} />
          <Flex align='center' gap={1}>
            <Text
              fontSize={'sm'}
              color={'gray.600'}
            >
              Dikirim ke <Text as={'span'} color={'teal.500'} fontWeight={'semibold'}>Bali</Text>
            </Text>
            <ChevronDownIcon fontSize={'lg'} color={'teal.500'} />
          </Flex>
        </Flex>
      </Flex>
    </Stack>
  )
}