import Head from "next/head";
import { useState, useEffect } from "react";
import { Button, Flex, Icon, Input, InputGroup, InputLeftElement, Stack } from "@chakra-ui/react";
import { MdCalendarViewDay } from "react-icons/md";
import { SearchIcon } from "@chakra-ui/icons";
import { BiFilter } from "react-icons/bi";
import { BsDatabaseFillAdd } from "react-icons/bs";
import axios from "axios";

import { DashboardHeader, DashboardSubHeader } from "@/components/dashboard/header";
import DahboardLayout from "@/components/layouts/DashboardLayout";
import TableComponent from "@/components/table";

const ManageProducts = () => {
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

export default function DashboardPage() {
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

  return (
    <>
      <Head>
        <title>Sales App | Dashboard</title>
      </Head>

      <DahboardLayout>
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
              data={products}
              page={skip}
              setPage={setSkip}
            />
          </Stack>
        </Stack>
      </DahboardLayout>
    </>
  )
}