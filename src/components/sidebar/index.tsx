import { FC } from "react";
import { useRouter } from "next/router";
import { Box, Flex, Icon, Image, Stack, Text } from "@chakra-ui/react";
import { BiSolidHome, BiSolidInfoCircle } from "react-icons/bi";
import { PiComputerTowerFill } from "react-icons/pi";
import { MdCalendarViewDay } from "react-icons/md";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { RiFileEditFill, RiUserSettingsFill } from "react-icons/ri";
import { FaQuestionCircle } from "react-icons/fa";
import { PiComputerTowerBold } from 'react-icons/pi';
import { AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";

const linksDashboardGroup = [
  { href: '/dashboard', label: 'Dashboard Overview', icon: BiSolidHome },
  { href: '/dashboard/product-solutions', label: 'Products and Solutions', icon: PiComputerTowerFill },
];

const linksProductsGroup = [
  { href: '/dashboard/products', label: 'View Products', icon: MdCalendarViewDay },
  { href: '/dashboard/products/add', label: 'Add Products', icon: BsDatabaseFillAdd },
  { href: '#', label: 'Edit Products', icon: RiFileEditFill },
];

const linksSettingsGroup = [
  { href: '#', label: 'Profile', icon: RiUserSettingsFill },
  { href: '#', label: 'FAQ', icon: FaQuestionCircle },
  { href: '#', label: 'Help', icon: BiSolidInfoCircle },
];

const linkCashierGroup = [
  { href: '/dashboard/cashier', label: 'Cashier', icon: PiComputerTowerBold }
]

const linkUsersGroup = [
  { href: '/dashboard/users', label: 'View Users', icon: AiOutlineUser },
  { href: '/dashboard/users/add', label: 'Add Users', icon: AiOutlineUserAdd }
];

const SidebarLink: FC<{ href: string, label: string, icon: any }> = ({ href, label, icon }) => {
  const router = useRouter();

  return (
    <Flex
      align={'center'}
      gap={3}
      p={2}
      bg={router.pathname === href ? 'blue.100' : 'none'}
      color={router.pathname === href ? 'gray.900' : 'gray.500'}
      rounded={'md'}
      _hover={{
        bg: router.pathname !== href && 'blue.50',
        color: router.pathname !== href && 'gray.900'
      }}
      cursor={'pointer'}
      onClick={() => router.push({ pathname: href })}
    >
      <Icon as={icon} />
      <Text fontWeight={'medium'} fontSize={'sm'}>
        {label}
      </Text>
    </Flex>
  )
}

export default function Sidebar({ isOpen, ...rest }: { isOpen: boolean, [x: string]: any }) {
  return (
    <Box as="aside"
      {...rest}
    >
      <Stack
        spacing={9}
        pos={'sticky'}
        top={28}
      >
        <Stack>
          <Text fontSize={'xs'} textTransform={'uppercase'} color={'gray.500'} fontWeight={'medium'}>
            Dashboard
          </Text>
          <Stack spacing={1}>
            {linksDashboardGroup.map((link, index) => (
              <SidebarLink key={index} href={link.href} icon={link.icon} label={link.label} />
            ))}
          </Stack>
        </Stack>

        <Stack>
          <Text fontSize={'xs'} textTransform={'uppercase'} color={'gray.500'} fontWeight={'medium'}>
            Products
          </Text>
          <Stack spacing={1}>
            {linksProductsGroup.map((link, index) => (
              <SidebarLink key={index} href={link.href} icon={link.icon} label={link.label} />
            ))}
          </Stack>
        </Stack>

        <Stack>
          <Text fontSize={'xs'} textTransform={'uppercase'} color={'gray.500'} fontWeight={'medium'}>
            Users
          </Text>
          <Stack spacing={1}>
            {linkUsersGroup.map((link, index) => (
              <SidebarLink key={index} href={link.href} icon={link.icon} label={link.label} />
            ))}
          </Stack>
        </Stack>

        <Stack>
          <Text fontSize={'xs'} textTransform={'uppercase'} color={'gray.500'} fontWeight={'medium'}>
            Cashier
          </Text>
          <Stack spacing={1}>
            {linkCashierGroup.map((link, index) => (
              <SidebarLink key={index} href={link.href} icon={link.icon} label={link.label} />
            ))}
          </Stack>
        </Stack>

        <Stack>
          <Text fontSize={'xs'} textTransform={'uppercase'} color={'gray.500'} fontWeight={'medium'}>
            Settings
          </Text>
          <Stack spacing={1}>
            {linksSettingsGroup.map((link, index) => (
              <SidebarLink key={index} href={link.href} icon={link.icon} label={link.label} />
            ))}
          </Stack>
        </Stack>
      </Stack>

    </Box>
  )
}