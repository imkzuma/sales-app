import { Box, Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function AuthPage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Sales App | Auth</title>
      </Head>

      <Flex as="main"
        minH="100vh"
        w="full"
        align="center"
        justify="center"
      >
        <Stack as="section"
          w="full"
          align="center"
          spacing={5}
        >

          <Box
            w={{ base: 24 }}
          >
            <Image
              src="https://magnumsolusion.co.id/img/logo%202021.svg"
              alt="magnum"
              objectFit={'cover'}
            />
          </Box>

          <Stack as="header" align={'center'}>
            <Text as="h1"
              fontSize={'3xl'}
              fontWeight={'bold'}
              color={'gray.700'}
            >
              Magnum Solusion
            </Text>
            <Text as="p"
              w={{ base: 'full', md: 'md' }}
              textAlign={'center'}
              color={'gray.600'}
            >
              Login to your account to access the Sales App.
              Register if you don&apos;t have an account.
            </Text>
          </Stack>

          <Flex gap={3} py={3}>
            <Button
              colorScheme="teal"
              px={8}
              onClick={() => router.push('/auth/login')}
            >
              Login
            </Button>
            <Button
              variant="outline"
              colorScheme="teal"
              px={7}
              onClick={() => router.push('/auth/register')}
            >
              Register
            </Button>
          </Flex>
        </Stack>
      </Flex >
    </>
  )
}