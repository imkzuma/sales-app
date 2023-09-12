import Head from "next/head";
import { useState } from "react";
import { Box, Button, Flex, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import DahboardLayout from "@/components/layouts/DashboardLayout";
import { DashboardSubHeader } from "@/components/dashboard/header";
import axios from "axios";
import { Rupiah } from "@/utils/price";
import TableComponent from "@/components/table";
import TableNoPagination from "@/components/table/NoPagination";

const ManageProducts = () => {
  return (
    <Flex
      py={5}
      justify={'space-between'}
      align={'center'}
    >
      <DashboardSubHeader
        title="Cashier"
        description="Cashier page for sales transactions."
      />
    </Flex>
  )
}

const SearchProducts = ({ products, setProducts, setTotal }: any) => {
  const [barcode, setBarcode] = useState<string>('');

  const handleSubmit = async (e: any) => {
    const { value } = e.target;

    if (e.key === 'Enter' && value !== '') {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${value}?select=id,title,price,thumbnail`);
        const { data } = response;

        let qty = 1;

        if (products.find((product: any) => product.id === data.id)) {
          qty = products.find((product: any) => product.id === data.id).qty + 1;
        }
        setProducts((prevProducts: any) => [...prevProducts.filter((product: any) => product.id !== data.id), { ...data, qty }]);
        setTotal((prevTotal: number) => prevTotal + data.price);
        setBarcode('');
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleClear = () => {
    setProducts([]);
    setTotal(0);
  }

  return (
    <Flex
      borderY={'1px'}
      borderColor={'gray.300'}
      py={3}
      bg={'white'}
      gap={5}
      align={'center'}
    >
      <InputGroup borderColor={'gray.300'}>
        <InputLeftElement py={6}>
          <SearchIcon />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Input Barcode Product"
          value={barcode}
          w={'full'}
          py={6}
          onChange={(e) => setBarcode(e.target.value)}
          onKeyUp={handleSubmit}
        />
      </InputGroup>
      <Button
        variant={'outline'}
        colorScheme="red"
        onClick={handleClear}
        py={6}
      >
        Clear
      </Button>
    </Flex>
  )
}

const Payment = ({ isOpen, onClose, products, setProducts, total, setTotal }: any) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Payment
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          bayar
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="red"
            variant='ghost'
            onClick={onClose}
            mr={3}
          >
            Close
          </Button>
          <Button
            colorScheme="teal"
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default function CashierPage() {
  const [products, setProducts] = useState<any>([]);
  const [total, setTotal] = useState<number>(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Head>
        <title>Sales App | Dashboard</title>
      </Head>

      <Payment
        isOpen={isOpen}
        onClose={onClose}
        products={products}
        setProducts={setProducts}
        total={total}
        setTotal={setTotal}
      />

      <DahboardLayout>
        <ManageProducts />
        <SearchProducts
          products={products}
          setProducts={setProducts}
          setTotal={setTotal}
        />

        <Flex
          direction="column"
          minH={'65vh'}
          gap={10}
        >
          <Box
            flex={1}
          >
            <TableNoPagination
              data={products}
              header={['Image', 'Product', 'Price', 'Qty']}
            />
          </Box>
          <Box
            pos={'sticky'}
            bottom={0}
            py={5}
            w={'full'}
            bg={'white'}
          >
            <Flex
              justify={'space-between'}
              align={'center'}
              w={'full'}
              gap={8}
            >
              <Flex
                justify={'center'}
                align={'center'}
                w={'full'}
                gap={10}
                bg={'teal.100'}
                py={3} px={10}
                rounded={'xl'}
              >
                <Text>Total</Text>
                <Text>{Rupiah.format(total * 15000)}</Text>
              </Flex>

              <Button
                colorScheme="teal"
                onClick={onOpen}
              >
                Bayar
              </Button>
            </Flex>
          </Box>
        </Flex>
      </DahboardLayout>
    </>
  )
}