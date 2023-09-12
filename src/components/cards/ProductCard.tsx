import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { DashboardSubHeader } from "../dashboard/header";
import { useRouter } from "next/router";

interface ProductCardProps {
  title: string;
  data: any;
  description: string;
};

export default function ProductCard({ title, description, data }: ProductCardProps) {
  const router = useRouter();

  const handleProductView = (id: string) => {
    router.push({
      pathname: "/dashboard/products/[id]",
      query: { id }
    })
  }

  return (
    <Box
      w={'full'}
      border={'1px'}
      borderColor={'gray.300'}
      rounded={'2xl'}
      px={7}
      py={4}
    >
      <Stack w={'full'} spacing={5}>
        <DashboardSubHeader title={title} description={description} />

        {data?.map((product: any, index: number) => (
          <Flex key={index}
            gap={4}
            borderBottom={'1px'}
            borderColor={'gray.200'}
            pb={3}
            cursor={'pointer'}
            onClick={() => handleProductView(product?.id)}
          >
            <Box
              minW={'200px'} maxW={'200px'}
              maxH={'140px'}
              bg={'gray.100'}
              rounded={'md'}
            >
              <Image
                src={product.thumbnail}
                alt={product.title}
                objectFit={'cover'}
                w={'full'}
                h={'140px'}
                rounded={'md'}
              />
            </Box>
            <Stack>
              <Text
                fontWeight={'medium'}
                fontSize={'md'}
              >
                {product.title}
              </Text>
              <Text fontSize={'sm'}>
                Price: ${product.price}
              </Text>
            </Stack>
          </Flex>
        ))}
      </Stack>
    </Box >
  )
}