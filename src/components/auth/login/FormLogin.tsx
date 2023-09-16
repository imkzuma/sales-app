import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Divider, HStack, Stack, Text, VStack } from "@chakra-ui/react";

import FormPassword from "@/components/forms/password";
import FormText from "@/components/forms/text";
import AuthHeader from "@/components/auth/header";
import AuthGoogleButton from "@/components/auth/GoogleButton";

type FormsState = {
  email: string;
  password: string;
};

export default function FormLogin() {
  const router = useRouter();

  const [forms, setForms] = useState<FormsState>({
    email: "",
    password: "",
  });

  return (
    <Stack as="section"
      w={{ base: 'full', md: 'sm' }}
      spacing={7}
    >
      <AuthHeader
        title="Login"
        description="Don't have an account ?"
        href="/auth/register"
        link="Register"
      />

      <Stack as="form"
        spacing={7}
      >
        <VStack gap={2}>
          <FormText
            label="Input Email"
            value={forms.email}
            setValue={(value: string) => setForms({ ...forms, email: value })}
            type="email"
          />
          <FormPassword
            label="Input Password"
            value={forms.password}
            setValue={(value: string) => setForms({ ...forms, password: value })}
          />
        </VStack>

        <Button
          isDisabled={forms.email === '' || forms.password === ''}
          rounded={'xl'}
          colorScheme="teal"
          size={'lg'}
          onClick={() => router.push("/dashboard?welcome=true")}
        >
          Login
        </Button>
      </Stack>

      <Stack as="footer"
        spacing={6}
      >
        <HStack>
          <Divider bg={'gray.500'} h={'1px'} />
          <Text color={'gray.500'} whiteSpace="nowrap" px={2}>
            Or Login With
          </Text>
          <Divider bg={'gray.500'} h={'1px'} />
        </HStack>
        <AuthGoogleButton />
      </Stack>

    </Stack>
  )
}