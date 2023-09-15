import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Divider, Flex, FormControl, FormLabel, Image, Input, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure, useToast } from "@chakra-ui/react";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import SpinnerLoading from "@/components/loading/SpinnerLoading";

const FormView = ({ type, label, value }: { type?: string, label: string, value: string | number }) => {
  return (
    <FormControl>
      <FormLabel fontWeight={'normal'} color={'gray.600'}>
        {label}
      </FormLabel>
      <Input
        type={type || 'text'}
        defaultValue={value}
        disabled
        _disabled={{ color: 'gray.800' }}
      />
    </FormControl>
  )
}

const BreadCrumb = ({ id }: { id: string }) => {
  const router = useRouter();
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink onClick={() => router.push("/dashboard")}>Dashboard</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink onClick={() => router.push("/dashboard/users")}>Users</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink>{id}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}

const Biodata = ({ user }: any) => {
  return (
    <Stack spacing={7} py={3}>
      <Flex gap={5}>
        <FormView label="Username" value={user?.username} />
        <FormView label="Email" value={user?.email} />
      </Flex>
      <Flex gap={5}>
        <FormView label="First Name" value={user?.firstName} />
        <FormView label="Midddle Name" value={user?.maidenName} />
        <FormView label="Last Name" value={user?.lastName} />
      </Flex>
      <Flex gap={5}>
        <FormView label="Phone" value={user?.phone} />
        <FormView label="Gender" value={user?.gender} />
        <FormView type="date" label="Birth Date" value={user?.birthDate} />
      </Flex>
      <Flex gap={5}>
        <FormView label="State" value={user?.address.state} />
        <FormView label="City" value={user?.address.city} />
        <FormView label="Address" value={user?.address.address} />
        <FormView label="Postal Code" value={user?.address.postalCode} />
      </Flex>
    </Stack>
  )
}

const BankAccount = ({ user }: any) => {
  return (
    <Stack spacing={7} py={3}>
      <FormView label="Card Number" value={user?.bank.cardNumber} />
      <FormView label="Card Type" value={user?.bank.cardType} />
      <FormView label="Currency" value={user?.bank.currency} />
    </Stack>
  )
}

const CompanyProfile = ({ user }: any) => {
  return (
    <Stack spacing={7} py={3}>
      <FormView label="Company Name" value={user?.company.name} />
      <FormView label="Company Department" value={user?.company.department} />
      <FormView label="Position" value={user?.company.title} />
    </Stack>
  )
}

const ApplicationSetting = ({ user }: any) => {
  return (
    <Stack spacing={7} py={3}>
      <FormView label="Domain" value={user?.domain} />
      <FormView label="Ip Address" value={user?.ip} />
      <FormView label="Mac Address" value={user?.macAddress} />
      <FormView label="User Agent" value={user?.userAgent} />
    </Stack>
  )
}

const ConfirmDisable = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const cancelRef = useRef(null);
  const toast = useToast();

  const handleDisable = () => {
    onClose();
    return toast({
      title: 'Success!',
      description: 'Disabled account success!',
      status: 'success',
      position: 'top-right',
      duration: 5000,
      isClosable: true
    });
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>
            Disable Account
          </AlertDialogHeader>
          <AlertDialogBody>
            Are u sure want to disable this account?
          </AlertDialogBody>
          <AlertDialogFooter gap={3}>
            <Button colorScheme="red" size={'sm'} variant={'ghost'} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="teal" size={'sm'} onClick={handleDisable}>
              Submit
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default function DetailUserPage() {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://dummyjson.com/users/${id}`);
        const { data } = response;
        setUser(data);
      } catch (error) {
        router.replace("/dashboard/users");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();

  }, [id, router]);

  if (loading) {
    return (
      <DashboardLayout>
        <Flex
          minH={'70vh'}
          justify={'center'}
          align={'center'}
        >
          <SpinnerLoading />
        </Flex>
      </DashboardLayout>
    )
  }

  return (
    <>
      <Head>
        <title>Sales App | Dashboard</title>
      </Head>

      <ConfirmDisable isOpen={isOpen} onClose={onClose} />

      <DashboardLayout>
        <Stack as="section" spacing={8}>
          <BreadCrumb id={id as string} />

          <Flex gap={10}>
            <Box
              maxW={'200px'} w={'200px'}
              h={'fit-content'}
              bg={'gray.100'}
              rounded={'xl'}
            >
              <Image
                src={user?.image}
                alt={user?.username}
                objectFit={'cover'}
              />
            </Box>
            <Stack w={'full'} spacing={5}>
              <Stack
                w={'full'}
                border={'1px'}
                borderColor={'gray.300'}
                rounded={'xl'}
                p={5}
                spacing={10}
              >
                <Tabs
                  isLazy
                  isFitted
                  variant={'enclosed'}
                  colorScheme="teal"
                >
                  <TabList>
                    <Tab>
                      Biodata
                    </Tab>
                    <Tab>
                      Bank Account
                    </Tab>
                    <Tab>
                      Company Profile
                    </Tab>
                    <Tab>
                      Application Settings
                    </Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel px={0}>
                      <Biodata user={user} />
                    </TabPanel>
                    <TabPanel px={0}>
                      <BankAccount user={user} />
                    </TabPanel>
                    <TabPanel px={0}>
                      <CompanyProfile user={user} />
                    </TabPanel>
                    <TabPanel px={0}>
                      <ApplicationSetting user={user} />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Stack>
              <Flex justify={'end'}>
                <Button
                  colorScheme="red"
                  w={'fit-content'}
                  onClick={onOpen}
                >
                  Disable Account
                </Button>
              </Flex>
            </Stack>

          </Flex>
        </Stack>
      </DashboardLayout>
    </>
  )
}