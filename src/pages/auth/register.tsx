import Head from "next/head";
import AuthLayout from "@/components/layouts/AuthLayout";
import FormRegister from "@/components/auth/register/FormRegister";
import { Box, Image, Stack } from "@chakra-ui/react";

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Sales App | Register</title>
      </Head>

      <AuthLayout>
        <Stack
          spacing={10}
          align={'center'}
          w={'full'}
        >
          <FormRegister />
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