import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiSolidHome } from "react-icons/bi";
import { Box, Button, Divider, Flex, Stack, useToast } from "@chakra-ui/react";

import DahboardLayout from "@/components/layouts/DashboardLayout";
import StatsDashboard from "@/components/dashboard/stats";
import BarChartComponent from "@/components/chart/bar";
import LineChartComponent from "@/components/chart/line";
import { DashboardHeader, DashboardSubHeader } from "@/components/dashboard/header";
import ProductCard from "@/components/cards/ProductCard";
import axios from "axios";

const MostPopularProducts = () => {
  const [products, setProducts] = useState<any>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products?limit=3&skip=6");
        const { data } = response;
        setProducts(data.products);
      } catch (error) {
        //
      }
    }
    fetchProducts();

  }, []);
  return (
    <ProductCard
      title="Most Popular Products"
      description="List of popular products las month"
      data={products}
    />
  )
}

const BestSellers = () => {
  const [products, setProducts] = useState<any>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products?limit=3&skip=3");
        const { data } = response;
        setProducts(data.products);
      } catch (error) {
        //
      }
    }
    fetchProducts();

  }, []);
  return (
    <ProductCard
      title="Best Seller Products"
      description="List of best seller products last month"
      data={products}
    />
  )
}

export default function DashboardPage() {
  const toast = useToast();
  const router = useRouter();
  const { query } = router;

  const welcome = query.welcome === 'true' || query.welcome === '1';

  useEffect(() => {
    if (welcome) {
      toast({
        title: 'Welcome to Sales App',
        description: 'We hope you enjoy using our app.',
        status: 'info',
        duration: 5000,
        isClosable: true,
        position: "top"
      });
    }
  }, [toast, welcome]);

  return (
    <>
      <Head>
        <title>Sales App | Dashboard</title>
      </Head>

      <DahboardLayout>
        <Stack as="section" spacing={8}>
          <DashboardHeader
            icon={BiSolidHome}
            title='Dashboard Overview'
            description='Overview of your sales, deliveries, and more.'
          />

          <StatsDashboard />

          <Divider />

          <Stack>
            <DashboardSubHeader
              title="Sales and Orders Comparison"
              description="Comparison of sales and orders from this year."
            />
            <Box w={'full'} bg={'gray.100'} rounded={'lg'} p={3}>
              <BarChartComponent />
            </Box>
          </Stack>

          <Divider />

          <Stack>
            <DashboardSubHeader
              title="Visitors and Sales Difference"
              description="Comparison of visitors and sales from this year."
            />
            <Box w={'full'} bg={'gray.100'} rounded={'lg'} p={3}>
              <LineChartComponent />
            </Box>
          </Stack>

          <Divider />

          <Flex gap={5}>
            <Box w={'50%'}>
              <MostPopularProducts />
            </Box>
            <Box w={'50%'}>
              <BestSellers />
            </Box>
          </Flex>

          <Stack
            align={'start'}
            spacing={7}
            border={'1px'}
            borderColor={'gray.300'}
            rounded={'xl'}
            p={8}
          >
            <DashboardSubHeader
              title="Analytics"
              description="Analytics of your sales, orders, and more."
            />

            <Button
              variant={'ghost'}
              colorScheme={'teal'}
              size={'sm'}
              p={0}
            >
              View Analytics
            </Button>
          </Stack>

        </Stack>
      </DahboardLayout>
    </>
  )
}