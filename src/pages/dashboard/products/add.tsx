import Head from "next/head";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button, Divider, Flex, FormControl, FormLabel, Input, NumberInput, NumberInputField, Select, Stack, Textarea, useNumberInput, useToast } from "@chakra-ui/react";
import { BsDatabaseFillAdd } from "react-icons/bs";

const StockStepper = () => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 0,
    });

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  return (
    <Flex gap={2}>
      <Button {...dec}>
        -
      </Button>
      <Input {...input} />
      <Button {...inc}>
        +
      </Button>
    </Flex>
  )
}

const FormInput = () => {
  const toast = useToast();

  const category = [
    { value: '1', label: 'Makanan' },
    { value: '2', label: 'Minuman' },
    { value: '3', label: 'Snack' },
    { value: '4', label: 'Smartphone' },
    { value: '5', label: 'Laptop' },
    { value: '6', label: 'Aksesoris' },
    { value: '7', label: 'Elektronik' },
    { value: '8', label: 'Fashion' },
    { value: '9', label: 'Olahraga' },
  ];

  const handleSubmit = () => {
    return toast({
      title: "Success",
      description: "Tambah product sukses",
      duration: 5000,
      isClosable: true,
      position: 'top-right',
      status: 'success'
    });
  }

  return (
    <Stack
      w={'xl'}
      spacing={5}
    >
      <FormControl>
        <FormLabel fontWeight={'normal'}>
          Gambar Product
        </FormLabel>
        <Input type="file" />
      </FormControl>
      <FormControl>
        <FormLabel fontWeight={'normal'}>
          Nama Product
        </FormLabel>
        <Input type="text" placeholder="Masukkan Nama Product" />
      </FormControl>
      <FormControl>
        <FormLabel fontWeight={'normal'}>
          Masukkan Category Product
        </FormLabel>
        <Select>
          {category.map((item, index) => (
            <option key={index} value={item.value}>{item.label}</option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel fontWeight={'normal'}>
          Description Product
        </FormLabel>
        <Textarea></Textarea>
      </FormControl>
      <Flex gap={5}>
        <FormControl>
          <FormLabel>Price</FormLabel>
          <NumberInput defaultValue={0}>
            <NumberInputField />
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={'normal'}>
            Stock
          </FormLabel>
          <StockStepper />
        </FormControl>
      </Flex>
      <Flex
        justify={'end'}
        align={'center'}
        gap={3}
      >
        <Button
          colorScheme="red"
          variant={'ghost'}
        >
          Cancel
        </Button>
        <Button
          colorScheme="teal"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Flex>
    </Stack>
  )
}

export default function AddProductsPage() {
  return (
    <>
      <Head>
        <title>Sales App | Dashboard</title>
      </Head>

      <DashboardLayout>
        <Stack as="section" spacing={8}>
          <DashboardHeader
            icon={BsDatabaseFillAdd}
            title='Add Products'
            description='Add your products and more.'
          />
          <Divider />
          <FormInput />
        </Stack>
      </DashboardLayout>
    </>
  )
}