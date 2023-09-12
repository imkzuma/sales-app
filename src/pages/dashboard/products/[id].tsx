import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, FormControl, FormLabel, Image, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";

import DahboardLayout from "@/components/layouts/DashboardLayout";
import SpinnerLoading from "@/components/loading/SpinnerLoading";
import { Rupiah } from "@/utils/price";

const BreadCrumb = ({ id }: { id: string }) => {
  const router = useRouter();
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink onClick={() => router.push("/dashboard")}>Dashboard</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink onClick={() => router.push("/dashboard/products")}>Products</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink>{id}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}

const DescriptionProduct = ({ data }: { data: any }) => {
  return (
    <Stack
      w={{ base: 'full', md: 'md' }}
      h={'fit-content'}
      spacing={7}
      border={'1px'}
      borderColor={'gray.300'}
      rounded={'xl'}
      p={7}
    >
      <Stack spacing={0}>
        <Text
          fontSize={'2xl'}
          fontWeight={'medium'}
        >
          {data?.title}
        </Text>
        <Text>
          {data?.brand}
        </Text>
      </Stack>

      <Flex align={'center'} justify={'space-between'}>
        <Stack spacing={0}>
          <Text fontSize={'sm'} color={'gray.500'}>Category</Text>
          <Text fontSize={'md'} fontWeight={'medium'} textTransform={'capitalize'}>{data?.category}</Text>
        </Stack>
        <Stack spacing={0}>
          <Text fontSize={'sm'} color={'gray.500'}>Discount</Text>
          <Text fontSize={'md'} fontWeight={'medium'}>{data?.discountPercentage}%</Text>
        </Stack>
        <Stack spacing={0}>
          <Text fontSize={'sm'} color={'gray.500'}>Stock</Text>
          <Text fontSize={'md'} fontWeight={'medium'}>{data?.stock}</Text>
        </Stack>
        <Stack spacing={0}>
          <Text fontSize={'sm'} color={'gray.500'}>Rating</Text>
          <Text fontSize={'md'} fontWeight={'medium'}>{data?.rating}</Text>
        </Stack>
      </Flex>

      <Stack>
        <Text fontSize={'sm'} color={'gray.500'}>
          Description
        </Text>
        <Text fontSize={'sm'}>
          {data?.description}
        </Text>
      </Stack>

      <Flex justify={'end'}>
        <Button
          size={'sm'}
          colorScheme="teal"
        >
          Edit Products
        </Button>
      </Flex>
    </Stack>
  )
}

const PriceProducts = ({ data }: { data: any }) => {
  const cancelRef = useRef(null);

  const [price, setPrice] = useState<number>(0);
  const [newPrice, setNewPrice] = useState<unknown>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const handlePriceChange = () => {
    setPrice(newPrice as number);
    onClose();

    return toast({
      title: "Price Changed.",
      description: "Price has been changed.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right"
    });
  }

  return (
    <Stack
      w={{ base: 'full', md: 'xs' }}
      h={'fit-content'}
      spacing={5}
      border={'1px'}
      borderColor={'gray.300'}
      rounded={'xl'}
    >
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent rounded={'2xl'}>
            <AlertDialogHeader>
              Edit Price
            </AlertDialogHeader>
            <AlertDialogBody>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <NumberInput defaultValue={price} onChange={(value) => setNewPrice(value)}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="red" variant={'ghost'} ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="teal" ml={3} onClick={handlePriceChange}>
                Save
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Stack
        spacing={5}
        textAlign={'center'}
        p={5}
      >
        <Stack spacing={0}>
          <Text fontSize={'md'}>
            Price
          </Text>
          <Text
            fontSize={'2xl'}
            fontWeight={'medium'}
          >
            {price !== 0 ? Rupiah.format(price) : Rupiah.format(data?.price * 15000)}
          </Text>
        </Stack>
        <Button
          rounded={'lg'}
          colorScheme="teal"
          size={'sm'}
          onClick={onOpen}
        >
          Edit Price
        </Button>
      </Stack>
    </Stack>
  )
}

const ThumbnailProduct = ({ data }: { data: any }) => {
  const cancelRef = useRef(null);

  const [image, setImage] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleViewImage = (image: string) => {
    setIsOpen(true);
    setImage(image);
  }

  const handleCloseImage = () => {
    setIsOpen(false);
    setImage('');
  }

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        onClose={handleCloseImage}
        leastDestructiveRef={cancelRef}
        size={'xl'}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogBody p={0}>
              <Image src={image} alt="immage" w={'full'} />
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Stack maxW={'xs'}>
        <Image
          src={data?.thumbnail}
          alt={data?.title}
          w={'xs'} maxW={'xs'} minW={'xs'}
          rounded={'lg'}
          cursor={'pointer'}
          onClick={() => handleViewImage(data?.thumbnail)}
        />
        <Flex gap={3} flexWrap={'wrap'} justify={'center'}>
          {data?.images.map((image: string, index: number) => {
            return (
              <Image key={index}
                src={image}
                alt={data.title}
                w={'90px'}
                cursor={'pointer'}
                onClick={() => handleViewImage(image)}
              />
            )
          })}
        </Flex>
      </Stack>
    </>
  )
}

export default function DashboardPage() {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!id) {
      router.push('/dashboard/products');
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        const { data } = response;

        setData(data);
      } catch (error) {
        router.push('/dashboard/products');
      } finally {
        setLoading(false);
      }
    }

    fetchData();

  }, [id, router]);

  if (loading) {
    return (
      <Flex justify={'center'} align={'center'} h={'100vh'}>
        <SpinnerLoading />
      </Flex>
    )
  }

  return (
    <>
      <Head>
        <title>Sales App | Dashboard</title>
      </Head>

      <DahboardLayout>
        <Stack as="section" spacing={8}>
          <BreadCrumb id={id as string} />

          <Flex gap={8}>
            <ThumbnailProduct data={data} />
            <DescriptionProduct data={data} />
            <PriceProducts data={data} />
          </Flex>
        </Stack>
      </DahboardLayout>
    </>
  )
}