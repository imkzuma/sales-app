import { FC, ReactNode, useEffect, useState } from "react";
import { MoonIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Flex, Icon, Image, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Stack, Text, useColorMode } from "@chakra-ui/react";
import axios from "axios";
import { FaSun } from "react-icons/fa";
import { BsBellFill } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { RxExit } from "react-icons/rx";

const MenuAvatar: React.FC<{ children: ReactNode }> = ({ children, ...rest }) => {
  return (
    <Flex
      align={'center'}
      gap={5}
      w={'full'}
      p={3}
      color={'gray.500'}
      _hover={{
        bg: "blue.50",
        rounded: 'md',
        color: 'gray.900',
        transition: '.2s ease'
      }}
      transition={'.2s ease'}
      cursor={'pointer'}
      {...rest}
    >
      {children}
    </Flex>
  )
}

const NavbarAvatar: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Menu>
      <MenuButton as={Avatar}
        size={'sm'}
        name={'User'}
        src="https://franchisematch.com/wp-content/uploads/2015/02/john-doe.jpg"
        cursor={'pointer'}
      />
      <MenuList px={7} py={5} w={'sm'} shadow={'xl'} rounded={'lg'}>
        <Stack>
          <Flex
            align={'center'}
            gap={5}
          >
            <Avatar
              size={'md'}
              name={'User'}
              src="https://franchisematch.com/wp-content/uploads/2015/02/john-doe.jpg"
            />
            <Stack spacing={-1}>
              <Text fontWeight={'bold'}>John Doe</Text>
              <Text fontSize={'sm'} mt={-1} color={'gray.500'}>
                Sales
              </Text>
            </Stack>
          </Flex>
          <MenuDivider />
          <Stack spacing={0}>
            <MenuAvatar>
              <Icon as={AiOutlineSetting} fontSize={'xl'} />
              <Text fontSize={'sm'}>
                Manage Accounts
              </Text>
            </MenuAvatar>
            <Box onClick={toggleColorMode}>
              <MenuAvatar>
                {colorMode === "light" ? (
                  <>
                    <Icon as={MoonIcon} fontSize={'xl'} />
                    <Text fontSize={'sm'}>
                      Dark Mode
                    </Text>
                  </>
                ) : (
                  <>
                    <Icon as={FaSun} fontSize={'xl'} />
                    <Text fontSize={'sm'}>
                      Light Mode
                    </Text>
                  </>
                )}
              </MenuAvatar>
            </Box>
          </Stack>

          <MenuDivider />
          <Flex
            align={'center'}
            gap={5}
            w={'full'}
            p={3}
            color={'gray.500'}
            _hover={{
              bg: "blue.50",
              rounded: 'md',
              color: 'gray.900',
              transition: '.2s ease'
            }}
            transition={'.2s ease'}
          >
            <Icon as={RxExit} fontSize={'xl'} />
            <Text fontSize={'sm'}>
              Sign Out
            </Text>
          </Flex>
        </Stack>
      </MenuList>
    </Menu >
  )
}

const Notification: FC = () => {
  const [data, setData] = useState<any>();
  useEffect(() => {
    axios.get("https://dummyjson.com/posts?limit=5")
      .then(response => {
        setData(response.data.posts);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        console.log('finally');
      });

  }, []);

  return (
    <Menu isLazy>
      <MenuButton
        as={Button}
        variant={'ghost'}
        rounded={'full'}
        p={0}
      >
        <Icon as={BsBellFill} />
      </MenuButton>
      <MenuList>
        <MenuGroup title="Notifications">
          {data?.map((item: any, index: number) => {
            return (
              <MenuItem key={index}>
                <Flex align={'start'} gap={2}>
                  <Avatar name="johndoe" size={'xs'} />
                  <Stack spacing={-1}>
                    <Text fontSize={'sm'}>
                      {item.title}
                    </Text>
                    <Text fontSize={'xs'} color={'gray.500'}>
                      Just now
                    </Text>
                  </Stack>
                </Flex>
              </MenuItem>
            )
          })}
        </MenuGroup>
      </MenuList>
    </Menu >
  )
}

export default function DashboardNavbar({ isOpen, onClose, onOpen }: { isOpen: boolean, onClose: () => void, onOpen: () => void }) {
  return (
    <Flex as="nav"
      justify={'space-between'}
      align={'center'}
      px={{ base: 2, lg: 0 }}
    >
      <Flex as="header"
        align={'center'}
        py={4}
        px={0}
      >
        <Button
          display={{ base: 'block', lg: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          variant={'unstyled'}
        >
          <HamburgerIcon />
        </Button>
        <Box
          w={{ base: 24, lg: 36 }}
        >
          <Image
            src="https://magnumsolusion.co.id/img/logo%202021.svg"
            alt="magnum"
            objectFit={'cover'}
          />
        </Box>
      </Flex>

      <Flex as="section"
        gap={7}
        align={'center'}
        pe={2}
      >
        <Notification />
        <NavbarAvatar />
      </Flex>
    </Flex >
  )
}