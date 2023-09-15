import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { SearchIcon } from "@chakra-ui/icons";
import { Button, Flex, Icon, Image, Input, InputGroup, InputLeftElement, Stack, Td, Th, Tr } from "@chakra-ui/react";
import { AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";
import { BiFilter } from "react-icons/bi";

import { DashboardHeader, DashboardSubHeader } from "@/components/dashboard/header";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import TableComponent from "@/components/table";

const ManageUsers = () => {
  return (
    <Flex
      py={5}
      justify={'space-between'}
      align={'center'}
    >
      <DashboardSubHeader
        title="Manage Users"
        description="Create and manage users using this app."
      />
      <Button
        colorScheme="teal"
        gap={3}
      >
        <Icon as={AiOutlineUserAdd} />
        Add User
      </Button>
    </Flex>
  )
}

const SearchUsers = ({ setUsers }: any) => {
  const handleSearch = async (e: any) => {
    e.preventDefault();

    const { value } = e.target;

    const response = await axios.get(`https://dummyjson.com/users/search?q=${value}&limit=10`);
    const { data } = response;
    setUsers(data.users);
  }

  return (
    <Flex
      borderY={'1px'}
      borderColor={'gray.300'}
      py={3}
    >
      <InputGroup borderColor={'gray.300'}>
        <InputLeftElement py={6}>
          <SearchIcon />
        </InputLeftElement>
        <Input type="text" placeholder="Search products" w={'sm'} py={6} onChange={handleSearch} />
      </InputGroup>

      <Button
        variant={'outline'}
        borderColor={'gray.300'}
        colorScheme="teal"
        gap={1}
      >
        <Icon as={BiFilter} />
        Sort
      </Button>
    </Flex>
  )
}


export default function UsersPage() {
  const router = useRouter();

  const [users, setUsers] = useState<any>();
  const [skip, setSkip] = useState<number>(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/users?limit=10&skip=${skip}`);
        const { data } = response;
        setUsers(data.users);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUsers();

    return () => {
      setUsers(null);
    }
  }, [skip]);

  const handleViewUser = (id: number) => {
    router.push({
      pathname: "/dashboard/users/[id]",
      query: { id }
    });
  }

  return (
    <>
      <Head>
        <title>Sales App | Dashboard</title>
      </Head>

      <DashboardLayout>
        <Stack as="section" spacing={8}>
          <DashboardHeader
            icon={AiOutlineUser}
            title='Users'
            description='List of all users using this app.'
          />

          <Stack>
            <ManageUsers />
            <SearchUsers setUsers={setUsers} />

            <TableComponent
              header={["Picture", "Username", "FirstName", "LastName", "Email", "IP Address"]}
              page={skip}
              setPage={setSkip}
              pagination={users && true}
            >
              {users === null && (
                <Tr>
                  <Th py={10} colSpan={5} textAlign={'center'}>
                    No Data
                  </Th>
                </Tr>
              )}
              {users?.map((user: any, index: number) => {
                return (
                  <Tr key={index} cursor={'pointer'} onClick={() => handleViewUser(user.id)}>
                    <Td
                      w={'100px'} maxW={'100px'} minW={'100px'}
                      h={'100px'} maxH={'100px'} minH={'100px'}
                    >
                      <Image
                        src={user?.image}
                        alt={user?.username}
                        objectFit={'cover'}
                      />
                    </Td>
                    <Td>{user?.username}</Td>
                    <Td>{user?.firstName}</Td>
                    <Td>{user?.lastName}</Td>
                    <Td>{user?.email}</Td>
                    <Td>{user?.ip}</Td>
                  </Tr>
                )
              })}
            </TableComponent>
          </Stack>
        </Stack>
      </DashboardLayout>
    </>
  )
}