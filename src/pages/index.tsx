import HomeHero from "@/components/home/hero";
import SectionTopSell from "@/components/home/section/TopSell";
import MainLayout from "@/components/layouts/MainLayout";
import { Box } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Sales App | Home</title>
      </Head>

      <MainLayout>
        <Box py={8}>
          <HomeHero />
        </Box>
        <SectionTopSell />
      </MainLayout>
    </>
  )
}