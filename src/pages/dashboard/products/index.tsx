import Head from "next/head";
import { useState, useEffect } from "react";
import { Badge, Button, Flex, Icon, Image, Input, InputGroup, InputLeftElement, Stack, Td, Th, Tr } from "@chakra-ui/react";
import { MdCalendarViewDay } from "react-icons/md";
import { SearchIcon } from "@chakra-ui/icons";
import { BiFilter } from "react-icons/bi";
import { BsDatabaseFillAdd } from "react-icons/bs";
import axios from "axios";

import { DashboardHeader, DashboardSubHeader } from "@/components/dashboard/header";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import TableComponent from "@/components/table";
import { useRouter } from "next/router";
import { Rupiah } from "@/utils/price";

const ManageProducts = () => {
  const router = useRouter();

  return (
    <Flex
      py={5}
      justify={'space-between'}
      align={'center'}
    >
      <DashboardSubHeader
        title="Manage Products"
        description="Create and manage your products."
      />
      <Button
        colorScheme="teal"
        gap={3}
        onClick={() => router.push('/dashboard/products/add')}
      >
        <Icon as={BsDatabaseFillAdd} />
        Add Product
      </Button>
    </Flex>
  )
}

const SearchProducts = ({ products, setProducts }: any) => {
  const handleSearch = async (e: any) => {
    e.preventDefault();

    const { value } = e.target;

    const response = await axios.get(`https://dummyjson.com/products/search?q=${value}&limit=10`);
    const { data } = response;
    setProducts(data.products);
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

export default function ProductsPage() {
  const router = useRouter();

  const [products, setProducts] = useState<any>();
  const [skip, setSkip] = useState<number>(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products?limit=10&skip=${skip}`);
        const { data } = response;
        setProducts(data.products);
      } catch (error) {
        setProducts(null);
      }
    }
    fetchProducts();

    return () => {
      setProducts(null);
    }

  }, [skip]);

  const handleViewProduct = async (id: number) => {
    router.push({
      pathname: '/dashboard/products/[id]',
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
            icon={MdCalendarViewDay}
            title='Products'
            description='List of your products and more.'
          />

          <Stack>
            <ManageProducts />
            <SearchProducts products={products} setProducts={setProducts} />

            <TableComponent
              header={["Thumbnail", "Name", "Brand", "Stock", "Price", "Rating"]}
              page={skip}
              setPage={setSkip}
              pagination={products && true}
            >
              {products === null && (
                <Tr>
                  <Th py={10} colSpan={5} textAlign={'center'}>
                    No Data
                  </Th>
                </Tr>
              )}
              {products?.map((product: any, index: number) => {
                return (
                  <Tr key={index} cursor={'pointer'} onClick={() => handleViewProduct(product?.id)}>
                    <Td
                      w={'100px'} maxW={'100px'} minW={'100px'}
                      h={'100px'} maxH={'100px'} minH={'100px'}
                    >
                      <Image
                        src={product?.thumbnail}
                        alt={product?.name}
                        objectFit={'cover'}
                      />
                    </Td>
                    <Td>{product?.title}</Td>
                    <Td>{product?.brand}</Td>
                    <Td>{product?.stock}</Td>
                    <Td>{Rupiah.format(product?.price * 15000)}</Td>
                    <Td>
                      <Badge colorScheme="yellow">
                        {product?.rating}
                      </Badge>
                    </Td>
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