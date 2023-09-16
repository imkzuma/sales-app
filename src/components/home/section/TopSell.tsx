import { Box, Flex, Grid, GridItem, Image, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react"

export default function SectionTopSell() {
  const [products, setProducts] = useState<any>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products?limit=6");
        const { data } = response;
        console.log(data);
        setProducts(data.products);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();

  }, []);

  return (
    <Stack>
      <Text>
        Top Selling Products
      </Text>
      <Grid
        gridTemplateColumns={'repeat(6,1fr)'}
        gap={3}
      >
        {products?.map((product: any) => (
          <GridItem key={product.id}
            colSpan={{ base: 6, md: 2, lg: 1 }}
            border={'1px'}
            borderColor={'gray.300'}
            rounded={'lg'}
            p={5}
          >
            <Box
              maxW={32} minW={32}
              maxH={32} minH={22}
            >
              <Image
                src={product.thumbnail}
                alt={product.title}
                objectFit={'cover'}
              />
            </Box>
            <Text>
              {product.title}
            </Text>
          </GridItem>
        ))}
      </Grid>
    </Stack >
  )
}