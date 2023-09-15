import Head from "next/head";
import { useRef, useState } from "react";
import axios from "axios";
import { Box, Button, Flex, FormControl, FormLabel, Image, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberInput, NumberInputField, Stack, Td, Text, Th, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { DashboardSubHeader } from "@/components/dashboard/header";
import { Rupiah } from "@/utils/price";
import TableComponent from "@/components/table";

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

const SearchProducts = ({ products, setProducts, setTotal, finalRef }: any) => {
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
          ref={finalRef}
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

const Payment = ({ isOpen, onClose, setProducts, total, setTotal, finalRef }: any) => {
  const toast = useToast();

  const [bayar, setBayar] = useState<number>(0);
  const [kembalian, setKembalian] = useState<number>(0);

  const initialRef = useRef(null);

  const handleEnterBayar = (e: any) => {
    if (e.key === 'Enter') {
      setKembalian((bayar / 15000) - total);

      if (bayar >= total) {
        return toast({
          title: "Sukses",
          description: "Pembayaran Sukses",
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true
        });
      }
    }
  }

  const handleDone = () => {
    setProducts([]);
    setTotal(0);
    setKembalian(0);
    setBayar(0);

    onClose();
  }

  const handleSubmitBayar = (e: any) => {
    e.preventDefault();

    setKembalian((bayar / 15000) - total);

    if (bayar >= total) {
      return toast({
        title: "Sukses",
        description: "Pembayaran Sukses",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true
      });
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
    >
      <ModalOverlay />
      <ModalContent borderRadius={'xl'}>
        <ModalHeader>
          Payment
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody as={Stack}
          spacing={5}
        >
          <Stack spacing={0}>
            <Text>
              Your Total is:
            </Text>
            <Text fontSize={'md'} fontWeight={'medium'}>
              {Rupiah.format(total * 15000)}
            </Text>
          </Stack>
          <FormControl>
            <FormLabel>Bayar</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <Text>
                  Rp
                </Text>
              </InputLeftElement>
              <Input
                type="number"
                onChange={(e) => setBayar(parseInt(e.target.value))}
                onKeyUp={handleEnterBayar}
                ref={initialRef}
              />
            </InputGroup>
          </FormControl>

          <Stack spacing={0}>
            <Text>
              Kembalian
            </Text>
            <Text fontSize={'md'} fontWeight={'medium'}>
              {Rupiah.format(kembalian * 15000)}
            </Text>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="red"
            variant='ghost'
            onClick={handleDone}
            mr={3}
            isDisabled={bayar < total || kembalian < 0}
          >
            Selesai
          </Button>
          <Button
            colorScheme="teal"
            onClick={handleSubmitBayar}
          >
            Bayar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal >
  )
}

export default function CashierPage() {
  const [products, setProducts] = useState<any>([]);
  const [total, setTotal] = useState<number>(0);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

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
        finalRef={finalRef}
      />

      <DashboardLayout>
        <ManageProducts />
        <SearchProducts
          products={products}
          setProducts={setProducts}
          setTotal={setTotal}
          finalRef={finalRef}
        />

        <Flex
          direction="column"
          minH={'65vh'}
          gap={10}
        >
          <Box
            flex={1}
          >
            <TableComponent
              header={['Image', 'Product', 'Price', 'Qty']}
              pagination={false}
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
                  <Tr key={index}>
                    <Td
                      w={'70px'} maxW={'70px'} minW={'70px'}
                      h={'70px'} maxH={'70px'} minH={'70px'}
                    >
                      <Image
                        src={product?.thumbnail}
                        alt={product?.name}
                        objectFit={'cover'}
                      />
                    </Td>
                    <Td>{product?.title}</Td>
                    <Td>{Rupiah.format(product?.price * 15000)}</Td>
                    <Td>{product?.qty}</Td>
                  </Tr>
                )
              })}
            </TableComponent>
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
                isDisabled={products.length === 0}
              >
                Bayar
              </Button>
            </Flex>
          </Box>
        </Flex>
      </DashboardLayout>
    </>
  )
}