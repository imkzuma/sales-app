import Head from "next/head";
import FormLogin from "@/components/auth/login/FormLogin";
import AuthLayout from "@/components/layouts/AuthLayout";
import { Box, Image, Stack } from "@chakra-ui/react";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Sales App | Login</title>
      </Head>

      <AuthLayout>
        <Stack
          spacing={10}
          align={'center'}
          w={'full'}
        >
          <FormLogin />
          <Box
            w={{ base: 20 }}
          >
            <Image
              src="https://magnumsolusion.co.id/img/logo%202021.svg"
              alt="magnum"
              objectFit={'cover'}
            />
          </Box>
        </Stack>
      </AuthLayout>
    </>
  )
}